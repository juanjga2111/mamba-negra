#!/usr/bin/env node

/**
 * HypeAuditor CLI — wrapper para el agente Scout de Mamba Negra
 * Node 22+, sin dependencias externas.
 *
 * Uso:
 *   hypeauditor search <query>
 *   hypeauditor discover --platform ig --country co --niche "belleza" ...
 *   hypeauditor report <username> [--platform ig|tiktok|youtube] [--raw]
 *   hypeauditor credits
 */

import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

// --- Config ---

const API_BASE = 'https://hypeauditor.com/api/method';

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
  // Shape: result.media es dict keyed por post_id, cada item tiene
  // basic {id, code, caption, time_posted, type, preview_url, authors[]}
  // metrics {likes_count, comments_count, video_views_count, er, er_mark}
  // result.media_ids es nested (all/posts/reels/... x sort_order x performance window) —
  // no lo exponemos por ruido; nos enfocamos en los items de `media`.
  const mediaDict = data.result?.media || {};
  const entries = Object.entries(mediaDict);
  if (!entries.length) { console.log('Sin media para este perfil (requiere auditor.report previo para unlockear).'); return; }

  entries.sort((a, b) => (b[1].basic?.time_posted || 0) - (a[1].basic?.time_posted || 0));
  const slice = limit > 0 ? entries.slice(0, limit) : entries;

  // Contador por tipo
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

function formatReport(user) {
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
  console.log(`Nombre: ${u.full_name || '-'}`);
  console.log(`Seguidores: ${fmtNum(u.followers_count)} | Posts: ${u.posts_count || '-'}`);
  console.log(`ER: ${er.value || '-'}% (${er.title || '-'})`);
  console.log(`AQS: ${u.aqs || '-'}/100 (${u.aqs_name || '-'})`);
  console.log(`Ubicacion: ${u.blogger_geo?.country?.toUpperCase() || '-'} | Genero: ${u.blogger_gender || '-'}`);
  console.log(`Verificado: ${u.is_verified ? 'Si' : 'No'}`);

  // Brand Safety
  console.log(`\n--- Brand Safety ---`);
  console.log(`Score: ${bs.score ?? '-'} | Mark: ${bs.mark || '-'}`);
  if (bsFlags.length) {
    console.log(`FLAGS ACTIVOS: ${bsFlags.join(', ')}`);
  } else {
    console.log(`Sin flags (limpio en las 9 categorias)`);
  }

  // Demographics
  console.log(`\n--- Audiencia: Demografia ---`);
  for (const d of demo) {
    console.log(`${d.gender === 'F' ? 'Mujeres' : 'Hombres'}: ${d.value?.toFixed(1)}%`);
  }
  // Top age groups
  for (const g of demoByAge) {
    const gender = g.gender === 'female' ? 'Mujeres' : 'Hombres';
    const topAges = (g.by_age_group || [])
      .filter(a => a.value > 3)
      .sort((a, b) => b.value - a.value)
      .map(a => `${a.group.replace('age', '')}: ${a.value?.toFixed(1)}%`);
    if (topAges.length) console.log(`  ${gender} top: ${topAges.join(', ')}`);
  }

  // Geography
  console.log(`\n--- Audiencia: Geografia ---`);
  const countries = (geo.countries || []).slice(0, 5);
  for (const c of countries) {
    console.log(`  ${c.name}: ${c.value?.toFixed(1)}%`);
  }
  const cities = (geo.cities || []).slice(0, 5);
  if (cities.length) {
    console.log(`  Ciudades top: ${cities.map(c => `${c.name} ${c.value?.toFixed(1)}%`).join(', ')}`);
  }

  // Audience Quality
  console.log(`\n--- Calidad de Audiencia ---`);
  console.log(`Real: ${at.real?.toFixed(1) || '-'}% | Suspicious: ${at.susp?.toFixed(1) || '-'}% | Mass followers: ${at.mass?.toFixed(1) || '-'}% | Influencers: ${at.infs?.toFixed(1) || '-'}%`);
  if (u.audience_reachability) console.log(`Reachability: ${u.audience_reachability.value}% (${u.audience_reachability.title})`);
  if (u.audience_authenticity) console.log(`Authenticity: ${u.audience_authenticity.value}% (${u.audience_authenticity.title})`);

  // Sentiment
  console.log(`\n--- Sentiment ---`);
  const sentScore = u.audience_sentiments?.score;
  console.log(`Score: ${sentScore ?? '-'}/100`);
  for (const [k, v] of Object.entries(sent)) {
    console.log(`  ${k}: ${v.prc?.toFixed(1)}% (${v.count} comments)`);
  }

  // Pricing
  console.log(`\n--- Pricing Estimado ---`);
  if (prices.post_price) {
    console.log(`Post: $${fmtNum(prices.post_price_from)}-$${fmtNum(prices.post_price_to)} USD`);
    console.log(`Stories: $${fmtNum(prices.stories_price_from || 0)}-$${fmtNum(prices.stories_price_to || 0)} USD`);
    console.log(`CPM: $${prices.cpm?.toFixed(2) || '-'}`);
  } else {
    console.log('No disponible');
  }

  // Credits
  if (u.restTokens !== undefined) console.log(`\nCreditos restantes: ${u.restTokens}`);
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
  if (!username) { console.error('Uso: hypeauditor report <username> [--platform ig|tiktok|youtube] [--raw]'); process.exit(1); }

  const platform = opts.platform || 'ig';
  const raw = opts.raw !== undefined;

  let path;
  if (platform === 'tiktok') {
    path = `/auditor.tiktok/?channel=${encodeURIComponent(username)}`;
  } else if (platform === 'youtube') {
    path = `/auditor.youtube/?channel=${encodeURIComponent(username)}`;
  } else {
    path = `/auditor.report/?username=${encodeURIComponent(username)}&v=2`;
  }

  const data = await apiGet(path, creds);

  // Handle 202 (report generating)
  if (data.result?.report_state === 'NOT_READY') {
    const ttl = data.result?.retryTtl || 30;
    console.log(`Reporte generandose... Reintenta en ${ttl} segundos.`);
    console.log(`Comando: hypeauditor report ${username} --platform ${platform}`);
    return;
  }

  if (raw) {
    console.log(JSON.stringify(data.result, null, 2));
    return;
  }

  // Instagram and YouTube return user at result.user, TikTok at result.report
  const user = data.result?.user || data.result?.report?.basic || data.result;
  if (!user) { console.error('No se pudo extraer datos del reporte.'); return; }

  // Merge restTokens if available
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

async function cmdCredits(creds) {
  // Suggester is free and returns account info in some cases
  // Try a minimal search to check token validity
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
const creds = loadCredentials();

switch (cmd) {
  case 'search':
    await cmdSearch(rest, creds);
    break;
  case 'discover':
    await cmdDiscover(rest, creds);
    break;
  case 'report':
    await cmdReport(rest, creds);
    break;
  case 'media':
    await cmdMedia(rest, creds);
    break;
  case 'credits':
    await cmdCredits(creds);
    break;
  default:
    console.log(`HypeAuditor CLI — Mamba Negra

Uso:
  hypeauditor search <query>                     Buscar influencer por nombre (gratis)
  hypeauditor discover [--flags]                  Buscar por filtros (1 call/pagina)
  hypeauditor report <username> [--platform] [--raw]  Reporte completo (1 credito)
  hypeauditor media <username> [--limit N] [--raw]    Posts/reels cacheados (requiere report previo)
  hypeauditor credits                             Verificar conexion

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

Report flags:
  --platform ig|tiktok|youtube                    Plataforma (default: ig)
  --raw                                           Output JSON completo`);
}
