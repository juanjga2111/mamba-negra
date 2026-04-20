#!/usr/bin/env node

/**
 * HypeAuditor CLI — wrapper para el agente Scout de Mamba Negra
 * Node 22+, sin dependencias externas.
 *
 * Uso:
 *   hypeauditor search <query>
 *   hypeauditor discover --platform ig --country co --niche "belleza" ...
 *   hypeauditor report <username> [--platform ig|tiktok|youtube] [--raw] [--cached] [--force]
 *   hypeauditor media <username> [--limit N] [--raw]
 *   hypeauditor network [--limit N] [--since YYYY-MM-DD]
 *   hypeauditor pdf <username> [--platform ig|tiktok|youtube|twitter|twitch|snapchat]
 *   hypeauditor cache stats
 *   hypeauditor cache prune [--days 90]
 *   hypeauditor cache clear <username> [--platform]
 *   hypeauditor credits
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

// --- Config ---

const API_BASE = 'https://hypeauditor.com/api/method';
const CACHE_DIR = join(homedir(), '.openclaw', 'hypeauditor-cache');
const CACHE_WARN_MB = 500;

function loadCredentials() {
  const envPath = join(homedir(), '.openclaw', '.env');
  try {
    const content = readFileSync(envPath, 'utf-8');
    const vars = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      vars[key] = val;
    }
    const id = vars.HYPEAUDITOR_ID;
    const token = vars.HYPEAUDITOR_TOKEN;
    if (!id || !token) {
      console.error('Error: HYPEAUDITOR_ID y HYPEAUDITOR_TOKEN deben estar en ~/.openclaw/.env');
      process.exit(1);
    }
    return { id, token };
  } catch {
    console.error('Error: No se pudo leer ~/.openclaw/.env');
    process.exit(1);
  }
}

async function apiGet(path, creds) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'X-Auth-Id': creds.id, 'X-Auth-Token': creds.token }
  });
  const data = await res.json();
  if (data.error) {
    console.error(`API Error [${data.error.code}]: ${data.error.description}`);
    process.exit(1);
  }
  return data;
}

async function apiPost(path, body, creds) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'X-Auth-Id': creds.id,
      'X-Auth-Token': creds.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.error) {
    console.error(`API Error [${data.error.code}]: ${data.error.description}`);
    process.exit(1);
  }
  return data;
}

// --- Cache ---

function normalizePlatform(p) {
  const map = { ig: 'instagram', tt: 'tiktok', yt: 'youtube', tw: 'twitter' };
  return map[p] || p || 'instagram';
}

function cachePath(platform, username) {
  const plat = normalizePlatform(platform);
  const safe = String(username).replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
  return join(CACHE_DIR, `${plat}-${safe}.json`);
}

function cacheWrite(platform, username, result) {
  try {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
    const payload = {
      _cached_at: new Date().toISOString(),
      _platform: normalizePlatform(platform),
      _username: username,
      result
    };
    writeFileSync(cachePath(platform, username), JSON.stringify(payload, null, 2), 'utf-8');
    checkCacheSize();
  } catch (e) {
    console.error(`Warning: cache write fallo (${e.message}). Continuo sin cachear.`);
  }
}

function cacheRead(platform, username) {
  const p = cachePath(platform, username);
  if (!existsSync(p)) return null;
  try {
    const payload = JSON.parse(readFileSync(p, 'utf-8'));
    return payload;
  } catch {
    return null;
  }
}

function cacheListFiles() {
  if (!existsSync(CACHE_DIR)) return [];
  return readdirSync(CACHE_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const full = join(CACHE_DIR, f);
      const st = statSync(full);
      return { name: f, path: full, size: st.size, mtime: st.mtime };
    });
}

function cacheSizeMB() {
  return cacheListFiles().reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
}

function checkCacheSize() {
  const mb = cacheSizeMB();
  if (mb > CACHE_WARN_MB) {
    console.error(`\n[aviso] Cache HypeAuditor: ${mb.toFixed(1)} MB (> ${CACHE_WARN_MB} MB). Considera ejecutar: hypeauditor cache prune --days 90`);
  }
}

// --- Formatters ---

function formatSearch(data) {
  const list = data.result?.list || [];
  if (!list.length) { console.log('Sin resultados.'); return; }

  for (const item of list) {
    const networks = (item.social_networks || [])
      .map(n => `${n.type}: @${n.username} (${fmtNum(n.subscribers_count)} seg, ER ${n.er || 0}%)`)
      .join('\n  ');
    console.log(`\n${item.title} ${item.is_verified ? '[VERIFICADO]' : ''}`);
    console.log(`  Principal: @${item.username} (${item.type}) — ${fmtNum(item.subscribers_count)} seguidores`);
    if (networks) console.log(`  Redes:\n  ${networks}`);
  }
  console.log(`\nTotal: ${list.length} resultados`);
}

function formatDiscover(data) {
  // Per docs (https://hypeauditor.readme.io/reference/post_discovery) la respuesta
  // usa `search_results` con items anidados {basic, metrics, features}. Antiguos
  // builds usaban `list` con shape flat — mantenemos fallback por compatibilidad.
  const list = data.result?.search_results || data.result?.list || [];
  if (!list.length) { console.log('Sin resultados para estos filtros.'); return; }

  console.log(`\n${'#'.padEnd(3)} ${'Username'.padEnd(25)} ${'Seguidores'.padEnd(12)} ${'ER%'.padEnd(8)} ${'Verificado'.padEnd(11)} País`);
  console.log('-'.repeat(75));

  list.forEach((item, i) => {
    const basic = item.basic || item;
    const metrics = item.metrics || item;
    const username = basic.username || basic.title || item.title || 'N/A';
    const subsRaw = metrics.subscribers_count?.value ?? metrics.subscribers_count ?? item.subscribers_count ?? 0;
    const erRaw = metrics.er?.value ?? metrics.er ?? item.er ?? 0;
    const subs = fmtNum(subsRaw);
    const er = Number(erRaw).toFixed(2);
    const verified = (basic.is_verified ?? item.is_verified) ? 'Si' : 'No';
    const geo = (basic.blogger_geo?.country ?? item.blogger_geo?.country ?? '-').toString().toUpperCase();
    console.log(`${String(i + 1).padEnd(3)} @${username.padEnd(24)} ${subs.padEnd(12)} ${er.padEnd(8)} ${verified.padEnd(11)} ${geo}`);
  });

  const queriesLeft = data.result?.queries_left;
  const currentPage = data.result?.current_page;
  const totalPages = data.result?.total_pages;
  if (queriesLeft !== undefined) console.log(`\nDiscovery calls restantes: ${queriesLeft}`);
  if (currentPage && totalPages) console.log(`Pagina ${currentPage} de ${totalPages}`);
  console.log(`Resultados en esta pagina: ${list.length}`);
}

function formatMedia(data, limit) {
  const mediaDict = data.result?.media || {};
  const entries = Object.entries(mediaDict);
  if (!entries.length) { console.log('Sin media para este perfil (requiere auditor.report previo para unlockear).'); return; }

  entries.sort((a, b) => (b[1].basic?.time_posted || 0) - (a[1].basic?.time_posted || 0));
  const slice = limit > 0 ? entries.slice(0, limit) : entries;

  const byType = {};
  for (const [, it] of entries) {
    const t = it.basic?.type || 'unknown';
    byType[t] = (byType[t] || 0) + 1;
  }
  const typeSummary = Object.entries(byType).map(([t, n]) => `${t}:${n}`).join(' | ');

  console.log(`\n=== MEDIA — ${entries.length} posts cacheados ===`);
  if (typeSummary) console.log(`Tipos: ${typeSummary}`);
  console.log('-'.repeat(90));

  for (const [, item] of slice) {
    const b = item.basic || {};
    const m = item.metrics || {};
    const date = b.time_posted ? new Date(b.time_posted * 1000).toISOString().slice(0, 10) : '-';
    const type = (b.type || '-').padEnd(9);
    const code = b.code || b.id || '-';
    const likes = m.likes_count ?? m.likes?.value ?? null;
    const comments = m.comments_count ?? m.comments?.value ?? null;
    const views = m.video_views_count ?? m.views_count ?? m.views?.value ?? null;
    const er = m.er?.value ?? m.er ?? null;
    const erMark = m.er_mark ? ` (${m.er_mark})` : '';
    const caption = (b.caption || '').replace(/\s+/g, ' ').slice(0, 90);
    console.log(`\n[${date}] ${type} ${code}`);
    const parts = [];
    if (likes !== null) parts.push(`Likes: ${fmtNum(likes)}`);
    if (comments !== null) parts.push(`Comments: ${fmtNum(comments)}`);
    if (views !== null && views > 0) parts.push(`Views: ${fmtNum(views)}`);
    if (er !== null) parts.push(`ER: ${Number(er).toFixed(2)}%${erMark}`);
    if (parts.length) console.log(`  ${parts.join(' | ')}`);
    if (caption) console.log(`  "${caption}${(b.caption || '').length > 90 ? '...' : ''}"`);
  }
  if (limit > 0 && entries.length > limit) {
    console.log(`\n... ${entries.length - limit} items mas. Usa --limit 0 para ver todos o --raw para JSON completo.`);
  }
}

function formatReport(user, cachedAt) {
  const u = user;
  const bs = u.brand_safety || {};
  const bsFlags = bs.items ? Object.entries(bs.items).filter(([, v]) => v.value).map(([k]) => k) : [];
  const demo = u.demography || [];
  const demoByAge = u.demography_by_age || [];
  const geo = u.audience_geography || {};
  const at = u.audience_type || {};
  const sent = u.audience_sentiments?.sentiments || {};
  const er = u.er || {};
  const prices = u.blogger_prices || {};

  console.log(`\n=== REPORTE: @${u.username} ===`);
  if (cachedAt) console.log(`[cache] Leido localmente. Generado: ${cachedAt}`);
  console.log(`Nombre: ${u.full_name || '-'}`);
  console.log(`Seguidores: ${fmtNum(u.followers_count)} | Posts: ${u.posts_count || '-'}`);
  console.log(`ER: ${er.value || '-'}% (${er.title || '-'})`);
  console.log(`AQS: ${u.aqs || '-'}/100 (${u.aqs_name || '-'})`);
  console.log(`Ubicacion: ${u.blogger_geo?.country?.toUpperCase() || '-'} | Genero: ${u.blogger_gender || '-'}`);
  console.log(`Verificado: ${u.is_verified ? 'Si' : 'No'}`);

  console.log(`\n--- Brand Safety ---`);
  console.log(`Score: ${bs.score ?? '-'} | Mark: ${bs.mark || '-'}`);
  if (bsFlags.length) {
    console.log(`FLAGS ACTIVOS: ${bsFlags.join(', ')}`);
  } else {
    console.log(`Sin flags (limpio en las 9 categorias)`);
  }

  console.log(`\n--- Audiencia: Demografia ---`);
  for (const d of demo) {
    console.log(`${d.gender === 'F' ? 'Mujeres' : 'Hombres'}: ${d.value?.toFixed(1)}%`);
  }
  for (const g of demoByAge) {
    const gender = g.gender === 'female' ? 'Mujeres' : 'Hombres';
    const topAges = (g.by_age_group || [])
      .filter(a => a.value > 3)
      .sort((a, b) => b.value - a.value)
      .map(a => `${a.group.replace('age', '')}: ${a.value?.toFixed(1)}%`);
    if (topAges.length) console.log(`  ${gender} top: ${topAges.join(', ')}`);
  }

  console.log(`\n--- Audiencia: Geografia ---`);
  const countries = (geo.countries || []).slice(0, 5);
  for (const c of countries) {
    console.log(`  ${c.name}: ${c.value?.toFixed(1)}%`);
  }
  const cities = (geo.cities || []).slice(0, 5);
  if (cities.length) {
    console.log(`  Ciudades top: ${cities.map(c => `${c.name} ${c.value?.toFixed(1)}%`).join(', ')}`);
  }

  console.log(`\n--- Calidad de Audiencia ---`);
  console.log(`Real: ${at.real?.toFixed(1) || '-'}% | Suspicious: ${at.susp?.toFixed(1) || '-'}% | Mass followers: ${at.mass?.toFixed(1) || '-'}% | Influencers: ${at.infs?.toFixed(1) || '-'}%`);
  if (u.audience_reachability) console.log(`Reachability: ${u.audience_reachability.value}% (${u.audience_reachability.title})`);
  if (u.audience_authenticity) console.log(`Authenticity: ${u.audience_authenticity.value}% (${u.audience_authenticity.title})`);

  console.log(`\n--- Sentiment ---`);
  const sentScore = u.audience_sentiments?.score;
  console.log(`Score: ${sentScore ?? '-'}/100`);
  for (const [k, v] of Object.entries(sent)) {
    console.log(`  ${k}: ${v.prc?.toFixed(1)}% (${v.count} comments)`);
  }

  console.log(`\n--- Pricing Estimado ---`);
  if (prices.post_price) {
    console.log(`Post: $${fmtNum(prices.post_price_from)}-$${fmtNum(prices.post_price_to)} USD`);
    console.log(`Stories: $${fmtNum(prices.stories_price_from || 0)}-$${fmtNum(prices.stories_price_to || 0)} USD`);
    console.log(`CPM: $${prices.cpm?.toFixed(2) || '-'}`);
  } else {
    console.log('No disponible');
  }

  if (u.restTokens !== undefined) console.log(`\nCreditos restantes: ${u.restTokens}`);
}

function formatNetwork(data) {
  const creators = data.result?.creators || [];
  if (!creators.length) { console.log('Tu network esta vacio.'); return; }

  console.log(`\n=== MY NETWORK — ${creators.length} creators ===`);
  console.log('-'.repeat(100));
  console.log(`${'#'.padEnd(3)} ${'Username'.padEnd(25)} ${'Nombre'.padEnd(30)} ${'Seguidores'.padEnd(12)} ${'Pais'.padEnd(6)} ${'Status'.padEnd(12)} Unlock`);
  console.log('-'.repeat(100));

  creators.forEach((c, i) => {
    const account = (c.accounts || [])[0] || {};
    const username = account.username || '-';
    const name = `${c.first_name || ''} ${c.last_name || ''}`.trim() || '-';
    const subs = fmtNum(account.subscribers_count);
    const country = c.country?.code || '-';
    const status = c.network_status?.name || '-';
    const unlockDate = account.report_unlock_date ? account.report_unlock_date.slice(0, 10) : '-';
    console.log(`${String(i + 1).padEnd(3)} @${username.padEnd(24)} ${name.slice(0, 28).padEnd(30)} ${subs.padEnd(12)} ${country.padEnd(6)} ${status.padEnd(12)} ${unlockDate}`);
  });

  if (data.result?.next_cursor) {
    console.log(`\nHay mas. Siguiente pagina con: --cursor "${data.result.next_cursor}"`);
  }
}

function fmtNum(n) {
  if (n === null || n === undefined) return '-';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

// --- Commands ---

async function cmdSearch(args, creds) {
  const query = args.join(' ');
  if (!query) { console.error('Uso: hypeauditor search <query>'); process.exit(1); }
  const data = await apiGet(`/auditor.suggester/?search=${encodeURIComponent(query)}`, creds);
  formatSearch(data);
}

async function cmdDiscover(args, creds) {
  const opts = parseFlags(args);
  const platform = opts.platform || 'instagram';
  const platformMap = { ig: 'instagram', tiktok: 'tiktok', youtube: 'youtube', twitter: 'twitter', twitch: 'twitch' };
  const body = { social_network: platformMap[platform] || platform };

  if (opts.niche) body.niche_search = opts.niche;
  if (opts.country) body.account_geo = { country: [opts.country] };
  if (opts.followers) {
    const [from, to] = opts.followers.split('-').map(Number);
    body.subscribers_count = {};
    if (from) body.subscribers_count.from = from;
    if (to) body.subscribers_count.to = to;
  }
  if (opts['er-min']) body.er = { from: Number(opts['er-min']) };
  if (opts.gender) body.audience_gender = { gender: opts.gender, prc: Number(opts['gender-prc'] || 50) };
  if (opts.age) {
    const [from, to] = opts.age.split('-');
    const groupMap = { '13': '13_17', '18': '18_24', '25': '25_34', '35': '35_44', '45': '45_54', '55': '55_64', '65': '65' };
    const groups = [];
    for (const [key, val] of Object.entries(groupMap)) {
      if (Number(key) >= Number(from) && Number(key) <= Number(to)) groups.push(val);
    }
    if (groups.length) body.audience_age = { groups, prc: Number(opts['age-prc'] || 30) };
  }
  if (opts['audience-country']) {
    body.audience_geo = {
      countries: [{ id: opts['audience-country'], prc: Number(opts['audience-prc'] || 20) }]
    };
  }
  if (opts['aqs-min']) body.aqs = { from: Number(opts['aqs-min']) };
  if (opts.sort) body.sort = { field: opts.sort, order: opts.order || 'desc' };
  body.page = Number(opts.page || 1);

  const data = await apiPost('/auditor.search/', body, creds);
  formatDiscover(data);
}

async function cmdReport(args, creds) {
  const opts = parseFlags(args);
  const username = opts._positional[0];
  if (!username) { console.error('Uso: hypeauditor report <username> [--platform ig|tiktok|youtube] [--raw] [--cached] [--force]'); process.exit(1); }

  const platform = opts.platform || 'ig';
  const raw = opts.raw !== undefined;
  const cachedOnly = opts.cached !== undefined;
  const force = opts.force !== undefined;

  // Cached-only mode: read local, never hit API
  if (cachedOnly) {
    const cached = cacheRead(platform, username);
    if (!cached) {
      console.error(`Sin cache local para @${username} (${normalizePlatform(platform)}). Ejecuta sin --cached para generar.`);
      process.exit(1);
    }
    if (raw) {
      console.log(JSON.stringify(cached.result, null, 2));
      return;
    }
    const user = cached.result?.user || cached.result?.report?.basic || cached.result;
    if (!user) { console.error('Cache corrupto: no se pudo extraer usuario.'); process.exit(1); }
    formatReport(user, cached._cached_at);
    return;
  }

  // Check cache first unless --force
  if (!force) {
    const cached = cacheRead(platform, username);
    if (cached) {
      const ageDays = (Date.now() - new Date(cached._cached_at).getTime()) / (1000 * 60 * 60 * 24);
      if (ageDays < 30) {
        if (raw) {
          console.log(JSON.stringify(cached.result, null, 2));
          return;
        }
        const user = cached.result?.user || cached.result?.report?.basic || cached.result;
        if (user) {
          formatReport(user, cached._cached_at);
          console.log(`\n[info] Cache de hace ${ageDays.toFixed(1)} dias. Usa --force para refrescar (1 credito).`);
          return;
        }
      }
    }
  }

  // Live API call
  let path;
  if (platform === 'tiktok') {
    path = `/auditor.tiktok/?channel=${encodeURIComponent(username)}`;
  } else if (platform === 'youtube') {
    path = `/auditor.youtube/?channel=${encodeURIComponent(username)}`;
  } else {
    path = `/auditor.report/?username=${encodeURIComponent(username)}&v=2`;
  }

  const data = await apiGet(path, creds);

  if (data.result?.report_state === 'NOT_READY') {
    const ttl = data.result?.retryTtl || 30;
    console.log(`Reporte generandose... Reintenta en ${ttl} segundos.`);
    console.log(`Comando: hypeauditor report ${username} --platform ${platform}`);
    return;
  }

  // Cache automatico tras call exitoso
  cacheWrite(platform, username, data.result);

  if (raw) {
    console.log(JSON.stringify(data.result, null, 2));
    return;
  }

  const user = data.result?.user || data.result?.report?.basic || data.result;
  if (!user) { console.error('No se pudo extraer datos del reporte.'); return; }
  if (data.result?.restTokens !== undefined) user.restTokens = data.result.restTokens;

  formatReport(user);
}

async function cmdMedia(args, creds) {
  const opts = parseFlags(args);
  const username = opts._positional[0];
  if (!username) { console.error('Uso: hypeauditor media <username> [--limit 10] [--raw]'); process.exit(1); }
  const raw = opts.raw !== undefined;
  const limit = opts.limit !== undefined ? Number(opts.limit) : 10;

  const data = await apiGet(`/auditor.reportMedia/?username=${encodeURIComponent(username)}`, creds);

  if (raw) {
    console.log(JSON.stringify(data.result, null, 2));
    return;
  }
  formatMedia(data, limit);
}

async function cmdNetwork(args, creds) {
  const opts = parseFlags(args);
  const limit = Number(opts.limit || 100);
  const parts = [`limit=${Math.min(limit, 100)}`];
  if (opts.since) parts.push(`report_unlocked_from=${encodeURIComponent(opts.since)}`);
  if (opts.until) parts.push(`report_unlocked_to=${encodeURIComponent(opts.until)}`);
  if (opts.cursor) parts.push(`cursor=${encodeURIComponent(opts.cursor)}`);

  const path = `/auditor.creators/?${parts.join('&')}`;
  const data = await apiGet(path, creds);

  if (opts.raw !== undefined) {
    console.log(JSON.stringify(data.result, null, 2));
    return;
  }
  formatNetwork(data);
}

async function cmdPdf(args, creds) {
  const opts = parseFlags(args);
  const username = opts._positional[0];
  if (!username) { console.error('Uso: hypeauditor pdf <username> [--platform ig|tiktok|youtube|twitter|twitch|snapchat]'); process.exit(1); }

  const platform = normalizePlatform(opts.platform || 'ig');
  const methodMap = {
    instagram: 'auditor.instagramPdf',
    tiktok: 'auditor.tiktokPdf',
    youtube: 'auditor.youtubePdf',
    twitter: 'auditor.twitterPdf',
    twitch: 'auditor.twitchPdf',
    snapchat: 'auditor.snapchatPdf'
  };
  const paramKey = platform === 'instagram' ? 'username' : 'channel';
  const method = methodMap[platform];
  if (!method) { console.error(`Platform no soportada: ${platform}`); process.exit(1); }

  const maxRetries = Number(opts['max-retries'] || 8);
  let attempt = 0;
  console.log(`Generando PDF ${platform} para @${username}...`);

  while (attempt < maxRetries) {
    const data = await apiGet(`/${method}/?${paramKey}=${encodeURIComponent(username)}`, creds);
    const url = data.result?.pdfUrl;
    const ttl = data.result?.retryTtl || 60;
    const tokens = data.result?.restTokens;

    if (url) {
      console.log(`\nPDF listo:`);
      console.log(url);
      if (tokens !== undefined) console.log(`Creditos restantes: ${tokens}`);
      return;
    }
    attempt++;
    if (attempt < maxRetries) {
      console.log(`[${attempt}/${maxRetries}] Procesando... espera ${ttl}s`);
      await new Promise(r => setTimeout(r, Math.min(ttl, 120) * 1000));
    }
  }
  console.error(`Timeout: PDF no genero tras ${maxRetries} reintentos. Vuelve a ejecutar el comando.`);
  process.exit(1);
}

function cmdCache(args) {
  const sub = args[0];
  const opts = parseFlags(args.slice(1));

  if (sub === 'stats' || !sub) {
    const files = cacheListFiles();
    const totalMB = cacheSizeMB();
    console.log(`\n=== CACHE HYPEAUDITOR ===`);
    console.log(`Directorio: ${CACHE_DIR}`);
    console.log(`Perfiles cacheados: ${files.length}`);
    console.log(`Tamano total: ${totalMB.toFixed(2)} MB`);
    if (files.length) {
      console.log(`\nMas recientes:`);
      files.sort((a, b) => b.mtime - a.mtime).slice(0, 10).forEach(f => {
        console.log(`  ${f.mtime.toISOString().slice(0, 10)}  ${(f.size / 1024).toFixed(0).padStart(5)} KB  ${f.name}`);
      });
    }
    return;
  }

  if (sub === 'prune') {
    const days = Number(opts.days || 90);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const files = cacheListFiles();
    const toDelete = files.filter(f => f.mtime.getTime() < cutoff);
    if (!toDelete.length) {
      console.log(`Sin archivos mas antiguos que ${days} dias. Nada que borrar.`);
      return;
    }
    console.log(`Borrando ${toDelete.length} archivos > ${days} dias:`);
    for (const f of toDelete) {
      unlinkSync(f.path);
      console.log(`  [x] ${f.name}`);
    }
    console.log(`Liberados: ${(toDelete.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB`);
    return;
  }

  if (sub === 'clear') {
    const username = opts._positional[0];
    if (!username) { console.error('Uso: hypeauditor cache clear <username> [--platform ig|tiktok|youtube]'); process.exit(1); }
    const platform = opts.platform || 'ig';
    const p = cachePath(platform, username);
    if (!existsSync(p)) { console.log(`Sin cache para @${username} (${normalizePlatform(platform)}).`); return; }
    unlinkSync(p);
    console.log(`Cache borrado: ${p}`);
    return;
  }

  console.error(`Subcomando desconocido: ${sub}. Opciones: stats, prune, clear`);
  process.exit(1);
}

async function cmdCredits(creds) {
  const data = await apiGet('/auditor.suggester/?search=test', creds);
  console.log('Token valido. Conexion exitosa.');
  console.log('Nota: Para ver creditos restantes, ejecuta un report — el campo restTokens aparece en la respuesta.');
}

// --- Arg parsing ---

function parseFlags(args) {
  const result = { _positional: [] };
  let i = 0;
  while (i < args.length) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result[key] = args[i + 1];
        i += 2;
      } else {
        result[key] = true;
        i++;
      }
    } else {
      result._positional.push(args[i]);
      i++;
    }
  }
  return result;
}

// --- Main ---

const [,, cmd, ...rest] = process.argv;

switch (cmd) {
  case 'search':
    await cmdSearch(rest, loadCredentials());
    break;
  case 'discover':
    await cmdDiscover(rest, loadCredentials());
    break;
  case 'report':
    await cmdReport(rest, loadCredentials());
    break;
  case 'media':
    await cmdMedia(rest, loadCredentials());
    break;
  case 'network':
    await cmdNetwork(rest, loadCredentials());
    break;
  case 'pdf':
    await cmdPdf(rest, loadCredentials());
    break;
  case 'cache':
    cmdCache(rest);
    break;
  case 'credits':
    await cmdCredits(loadCredentials());
    break;
  default:
    console.log(`HypeAuditor CLI — Mamba Negra

Uso:
  hypeauditor search <query>                                  Buscar por nombre (gratis)
  hypeauditor discover [--flags]                              Buscar por filtros (1 query/pagina)
  hypeauditor report <username> [--platform] [--raw]          Reporte completo (1 credito, cache 30d)
  hypeauditor report <username> --cached                      Relee del cache local (0 creditos)
  hypeauditor report <username> --force                       Fuerza llamada nueva a API (1 credito)
  hypeauditor media <username> [--limit N] [--raw]            Posts/reels (gratis post-unlock)
  hypeauditor network [--limit N] [--since YYYY-MM-DD]        My Network: perfiles desbloqueados (gratis)
  hypeauditor pdf <username> [--platform]                     PDF oficial HA (0 creditos si unlocked)
  hypeauditor cache stats                                     Resumen de cache local
  hypeauditor cache prune [--days 90]                         Borra cache antiguo
  hypeauditor cache clear <username> [--platform]             Borra cache de 1 perfil
  hypeauditor credits                                         Verificar conexion

Cache automatico:
  - Cada \`report\` exitoso se guarda en ~/.openclaw/hypeauditor-cache/
  - Reintentos del mismo perfil en < 30 dias leen del cache (0 creditos)
  - Umbral de aviso: 500 MB. Para regenerar manual: --force

Discover flags:
  --platform ig|tiktok|youtube|twitter|twitch     Plataforma (default: ig)
  --country co                                    Pais del influencer (ISO 2 letras)
  --niche "belleza colombia"                      Busqueda semantica por nicho
  --followers 10000-200000                        Rango de seguidores
  --er-min 2                                      ER minimo
  --gender female|male                            Genero de audiencia
  --gender-prc 50                                 % minimo del genero (default: 50)
  --age 18-34                                     Rango de edad de audiencia
  --age-prc 30                                    % minimo del rango (default: 30)
  --audience-country co                           Pais de la audiencia
  --audience-prc 20                               % minimo audiencia en pais (default: 20)
  --aqs-min 40                                    AQS minimo (calidad audiencia)
  --sort subscribers_count|er                     Campo de ordenamiento
  --order desc|asc                                Orden (default: desc)
  --page 1                                        Pagina de resultados

Network flags:
  --limit N                                       Max resultados (1-100, default: 100)
  --since YYYY-MM-DD                              Filtrar unlocks desde fecha
  --until YYYY-MM-DD                              Filtrar unlocks hasta fecha
  --cursor <next_cursor>                          Paginacion`);
}
