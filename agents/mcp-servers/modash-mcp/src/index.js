#!/usr/bin/env node

/**
 * Modash MCP Server
 *
 * Exposes 7 tools from the Modash Influencer Discovery API to MCP-compatible
 * clients (OpenClaw agents via mcporter, Claude Code, etc.).
 *
 * Transport: stdio
 * Auth: Bearer token via MODASH_API_KEY env var
 * Base URL: https://api.modash.io/v1
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL = "https://api.modash.io/v1";
const API_KEY = process.env.MODASH_API_KEY;

if (!API_KEY) {
  console.error(
    "[modash-mcp] FATAL: MODASH_API_KEY environment variable is not set. " +
      "The server cannot authenticate with the Modash API without it."
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------

/**
 * Makes an authenticated request to the Modash API.
 * Returns { ok, status, data } on success or { ok, status, error } on failure.
 */
async function modashRequest(method, path, body = undefined) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const opts = { method, headers };
  if (body !== undefined) {
    opts.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, opts);
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: `Network error contacting Modash API: ${err.message}`,
    };
  }

  // Handle common HTTP errors with human-readable messages
  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    const messages = {
      401: "Authentication failed. The MODASH_API_KEY is invalid or expired.",
      403: "Access forbidden. Check your Modash plan and API permissions.",
      404: `Resource not found: ${path}`,
      422: `Validation error from Modash: ${errorBody}`,
      429: "Rate limit exceeded. Please wait at least 1 second before retrying. Modash allows ~1 request/second for AI endpoints.",
      500: "Modash API internal server error. Try again later.",
      502: "Modash API is temporarily unavailable (502). Try again later.",
      503: "Modash API is temporarily unavailable (503). Try again later.",
    };
    return {
      ok: false,
      status: res.status,
      error:
        messages[res.status] ||
        `Modash API returned HTTP ${res.status}: ${errorBody}`,
    };
  }

  const data = await res.json();
  return { ok: true, status: res.status, data };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatNumber(n) {
  if (n == null) return "N/A";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatPercent(n) {
  if (n == null) return "N/A";
  return `${(n * 100).toFixed(2)}%`;
}

function formatSearchResult(profile, platform) {
  const lines = [];
  const p = profile.profile || profile;
  lines.push(`@${p.username || p.handle || "unknown"} — ${p.fullname || p.nickname || ""}`);
  lines.push(`  Platform: ${platform}`);
  lines.push(`  Followers: ${formatNumber(p.followers)}`);
  lines.push(`  Engagement Rate: ${formatPercent(p.engagementRate || p.engagement_rate)}`);
  if (p.avgLikes != null) lines.push(`  Avg Likes: ${formatNumber(p.avgLikes)}`);
  if (p.avgComments != null) lines.push(`  Avg Comments: ${formatNumber(p.avgComments)}`);
  if (p.city || p.country) lines.push(`  Location: ${[p.city, p.country].filter(Boolean).join(", ")}`);
  if (p.isVerified) lines.push(`  Verified: Yes`);
  if (p.userId) lines.push(`  Modash ID: ${p.userId}`);
  return lines.join("\n");
}

function formatProfileReport(data, platform) {
  const p = data.profile || data;
  const lines = [];

  lines.push(`=== PROFILE REPORT: @${p.username || p.handle || "unknown"} (${platform}) ===`);
  lines.push("");
  lines.push(`Full Name: ${p.fullname || p.nickname || "N/A"}`);
  lines.push(`Followers: ${formatNumber(p.followers)}`);
  lines.push(`Following: ${formatNumber(p.following || p.followings)}`);
  lines.push(`Engagement Rate: ${formatPercent(p.engagementRate || p.engagement_rate)}`);
  lines.push(`Avg Likes: ${formatNumber(p.avgLikes)}`);
  lines.push(`Avg Comments: ${formatNumber(p.avgComments)}`);
  if (p.avgViews != null) lines.push(`Avg Views: ${formatNumber(p.avgViews)}`);
  if (p.isVerified) lines.push(`Verified: Yes`);

  // Audience demographics
  const audience = data.audience;
  if (audience) {
    lines.push("");
    lines.push("--- AUDIENCE ---");

    if (audience.genders) {
      lines.push("Gender:");
      for (const g of audience.genders) {
        lines.push(`  ${g.code}: ${formatPercent(g.weight)}`);
      }
    }

    if (audience.ages) {
      lines.push("Age Groups:");
      for (const a of audience.ages) {
        lines.push(`  ${a.code}: ${formatPercent(a.weight)}`);
      }
    }

    if (audience.geoCountries) {
      lines.push("Top Countries:");
      for (const c of audience.geoCountries.slice(0, 5)) {
        lines.push(`  ${c.name || c.code}: ${formatPercent(c.weight)}`);
      }
    }

    if (audience.geoCities) {
      lines.push("Top Cities:");
      for (const c of audience.geoCities.slice(0, 5)) {
        lines.push(`  ${c.name}: ${formatPercent(c.weight)}`);
      }
    }

    if (audience.credibility != null) {
      lines.push(`Audience Credibility: ${formatPercent(audience.credibility)}`);
    }

    if (audience.notableFollowers && audience.notableFollowers.length > 0) {
      lines.push("Notable Followers:");
      for (const nf of audience.notableFollowers.slice(0, 5)) {
        lines.push(`  @${nf.username} (${formatNumber(nf.followers)} followers)`);
      }
    }
  }

  // Growth
  if (data.growth) {
    lines.push("");
    lines.push("--- GROWTH ---");
    if (data.growth.followers) {
      const g = data.growth.followers;
      if (g["30d"] != null) lines.push(`  30-day: ${g["30d"] >= 0 ? "+" : ""}${formatPercent(g["30d"])}`);
      if (g["90d"] != null) lines.push(`  90-day: ${g["90d"] >= 0 ? "+" : ""}${formatPercent(g["90d"])}`);
    }
  }

  // Brand safety
  if (data.brandSafety) {
    lines.push("");
    lines.push("--- BRAND SAFETY ---");
    const bs = data.brandSafety;
    if (bs.score != null) lines.push(`  Score: ${bs.score}/100`);
    if (bs.flags && bs.flags.length > 0) {
      lines.push(`  Flags: ${bs.flags.join(", ")}`);
    }
  }

  return lines.join("\n");
}

function formatAccountInfo(data) {
  const lines = [];
  lines.push("=== MODASH ACCOUNT INFO ===");
  lines.push("");

  if (data.credits != null) lines.push(`Credits Remaining: ${data.credits}`);
  if (data.creditsUsed != null) lines.push(`Credits Used: ${data.creditsUsed}`);
  if (data.plan) lines.push(`Plan: ${data.plan}`);
  if (data.rawRequests != null) lines.push(`Raw API Requests: ${data.rawRequests}`);
  if (data.rateLimit) {
    lines.push(`Rate Limit: ${data.rateLimit.limit} req/${data.rateLimit.period || "period"}`);
    lines.push(`Rate Remaining: ${data.rateLimit.remaining}`);
  }

  // Credit warning
  if (data.credits != null && data.credits <= 0) {
    lines.push("");
    lines.push(
      "WARNING: You have 0 credits remaining. Most Modash API calls " +
        "will fail until credits are replenished. Contact MNL to activate " +
        "or top-up the Modash plan."
    );
  } else if (data.credits != null && data.credits < 10) {
    lines.push("");
    lines.push(
      `LOW CREDITS WARNING: Only ${data.credits} credits remaining. ` +
        "Use them wisely — follow the credit optimization rules from the Modash Playbook."
    );
  }

  // Dump any extra fields the agent might find useful
  const knownKeys = new Set([
    "credits",
    "creditsUsed",
    "plan",
    "rawRequests",
    "rateLimit",
  ]);
  for (const [k, v] of Object.entries(data)) {
    if (!knownKeys.has(k)) {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }

  return lines.join("\n");
}

function formatLocations(data, query) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    // data might be nested
    const list = data?.locations || data?.data || data;
    if (!Array.isArray(list) || list.length === 0) {
      return `No locations found for query "${query}". Try a different spelling or a broader term (e.g., "Colombia" instead of "Bogota").`;
    }
    return formatLocationList(list, query);
  }
  return formatLocationList(data, query);
}

function formatLocationList(list, query) {
  const lines = [`Locations matching "${query}":\n`];
  for (const loc of list.slice(0, 20)) {
    const id = loc.id || loc.locationId || loc.location_id || "?";
    const name = loc.name || loc.title || "Unknown";
    const type = loc.type ? ` (${loc.type})` : "";
    const country = loc.country ? `, ${loc.country}` : "";
    lines.push(`  ID: ${id}  —  ${name}${country}${type}`);
  }
  lines.push("");
  lines.push(
    "Use the ID value as location_id or audience_location_id in search tools."
  );
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Build search request body
// ---------------------------------------------------------------------------

function buildSearchBody(params) {
  const body = {
    page: params.page ?? 0,
    num: params.num ?? 10,
    filter: {},
  };

  // Influencer filters
  const inf = {};
  if (params.followers_min != null || params.followers_max != null) {
    inf.followers = {};
    if (params.followers_min != null) inf.followers.min = params.followers_min;
    if (params.followers_max != null) inf.followers.max = params.followers_max;
  }
  if (params.engagement_rate_min != null) {
    inf.engagementRate = { min: params.engagement_rate_min / 100 }; // API expects 0-1
  }
  if (params.location_id) {
    inf.location = [{ id: params.location_id }];
  }
  if (params.keywords) {
    inf.keywords = params.keywords;
  }
  if (params.language) {
    inf.language = params.language;
  }
  if (params.has_contact_details != null) {
    inf.hasContactDetails = params.has_contact_details;
  }
  if (params.is_verified != null) {
    inf.isVerified = params.is_verified;
  }
  if (Object.keys(inf).length > 0) {
    body.filter.influencer = inf;
  }

  // Audience filters
  const aud = {};
  if (params.audience_location_id) {
    aud.location = [
      {
        id: params.audience_location_id,
        weight: params.audience_location_weight ?? 0.3,
      },
    ];
  }
  if (params.audience_gender) {
    aud.gender = {
      code: params.audience_gender,
      weight: params.audience_gender_weight ?? 0.5,
    };
  }
  if (params.audience_age_groups) {
    const groups = params.audience_age_groups
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
    if (groups.length > 0) {
      aud.age = groups.map((code) => ({ code }));
    }
  }
  if (Object.keys(aud).length > 0) {
    body.filter.audience = aud;
  }

  return body;
}

// ---------------------------------------------------------------------------
// MCP Server definition
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "modash",
  version: "1.0.0",
  description:
    "Modash Influencer Discovery API — search creators, pull profile reports, " +
    "find lookalikes, and manage credits for influencer marketing campaigns.",
});

// ---- Tool 1: modash_account_info ----

server.tool(
  "modash_account_info",
  "Check Modash account status: credits remaining, plan, rate limits. " +
    "ALWAYS call this first before using other tools to verify you have credits available.",
  {},
  async () => {
    const result = await modashRequest("GET", "/user/info");
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }
    return { content: [{ type: "text", text: formatAccountInfo(result.data) }] };
  }
);

// ---- Tool 2: modash_search_instagram ----

server.tool(
  "modash_search_instagram",
  "Search Instagram influencers by filters (followers, engagement, location, audience demographics, keywords in bio). " +
    "Costs 0.01 credits per result. Max 15 results per page. " +
    "Tip: Use modash_locations first to get location IDs. Colombia = 102803938.",
  {
    followers_min: z.number().optional().default(10000).describe("Minimum followers (default 10,000)"),
    followers_max: z.number().optional().default(500000).describe("Maximum followers (default 500,000)"),
    engagement_rate_min: z.number().optional().default(1).describe("Minimum engagement rate in percentage (e.g., 1 = 1%). Default 1%"),
    location_id: z.string().optional().describe("Modash location ID for influencer's location. Use modash_locations to find IDs. Colombia = 102803938"),
    audience_location_id: z.string().optional().describe("Modash location ID for audience location filter"),
    audience_location_weight: z.number().min(0).max(1).optional().describe("Minimum fraction of audience in that location (0-1, e.g., 0.3 = 30%)"),
    audience_gender: z.enum(["MALE", "FEMALE"]).optional().describe("Audience gender filter"),
    audience_gender_weight: z.number().min(0).max(1).optional().describe("Minimum fraction of audience of that gender (0-1)"),
    audience_age_groups: z.string().optional().describe('Audience age groups, comma-separated (e.g., "18-24,25-34")'),
    keywords: z.string().optional().describe("Keywords to find in influencer bio"),
    language: z.string().optional().describe("ISO language code (e.g., 'es' for Spanish)"),
    has_contact_details: z.boolean().optional().describe("Filter to influencers with public contact details"),
    is_verified: z.boolean().optional().describe("Filter to verified accounts only"),
    page: z.number().optional().default(0).describe("Page number (0-indexed)"),
    num: z.number().min(1).max(15).optional().default(10).describe("Results per page (max 15)"),
  },
  async (params) => {
    const body = buildSearchBody(params);
    const result = await modashRequest("POST", "/instagram/search", body);
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }

    const data = result.data;
    const profiles = data.lookalikes || data.profiles || data.data || [];
    const total = data.total ?? profiles.length;
    const lines = [`Instagram Search Results (${profiles.length} of ${total} total):\n`];

    if (profiles.length === 0) {
      lines.push("No influencers found matching your filters. Try broadening your criteria.");
    } else {
      for (const p of profiles) {
        lines.push(formatSearchResult(p, "Instagram"));
        lines.push("");
      }
      lines.push(`Cost: ~${(profiles.length * 0.01).toFixed(2)} credits`);
      if (total > (params.page + 1) * params.num) {
        lines.push(`More results available — request page ${params.page + 1}`);
      }
    }

    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

// ---- Tool 3: modash_search_tiktok ----

server.tool(
  "modash_search_tiktok",
  "Search TikTok influencers by filters (followers, engagement, location, audience demographics, keywords in bio). " +
    "Costs 0.01 credits per result. Max 15 results per page. " +
    "Tip: Use modash_locations with platform='tiktok' to get location IDs.",
  {
    followers_min: z.number().optional().default(10000).describe("Minimum followers (default 10,000)"),
    followers_max: z.number().optional().default(500000).describe("Maximum followers (default 500,000)"),
    engagement_rate_min: z.number().optional().default(1).describe("Minimum engagement rate in percentage (e.g., 1 = 1%). Default 1%"),
    location_id: z.string().optional().describe("Modash location ID for influencer's location. Use modash_locations to find IDs"),
    audience_location_id: z.string().optional().describe("Modash location ID for audience location filter"),
    audience_location_weight: z.number().min(0).max(1).optional().describe("Minimum fraction of audience in that location (0-1)"),
    audience_gender: z.enum(["MALE", "FEMALE"]).optional().describe("Audience gender filter"),
    audience_gender_weight: z.number().min(0).max(1).optional().describe("Minimum fraction of audience of that gender (0-1)"),
    audience_age_groups: z.string().optional().describe('Audience age groups, comma-separated (e.g., "18-24,25-34")'),
    keywords: z.string().optional().describe("Keywords to find in influencer bio"),
    language: z.string().optional().describe("ISO language code (e.g., 'es' for Spanish)"),
    has_contact_details: z.boolean().optional().describe("Filter to influencers with public contact details"),
    is_verified: z.boolean().optional().describe("Filter to verified accounts only"),
    page: z.number().optional().default(0).describe("Page number (0-indexed)"),
    num: z.number().min(1).max(15).optional().default(10).describe("Results per page (max 15)"),
  },
  async (params) => {
    const body = buildSearchBody(params);
    const result = await modashRequest("POST", "/tiktok/search", body);
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }

    const data = result.data;
    const profiles = data.lookalikes || data.profiles || data.data || [];
    const total = data.total ?? profiles.length;
    const lines = [`TikTok Search Results (${profiles.length} of ${total} total):\n`];

    if (profiles.length === 0) {
      lines.push("No influencers found matching your filters. Try broadening your criteria.");
    } else {
      for (const p of profiles) {
        lines.push(formatSearchResult(p, "TikTok"));
        lines.push("");
      }
      lines.push(`Cost: ~${(profiles.length * 0.01).toFixed(2)} credits`);
      if (total > (params.page + 1) * params.num) {
        lines.push(`More results available — request page ${params.page + 1}`);
      }
    }

    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

// ---- Tool 4: modash_profile_report ----

server.tool(
  "modash_profile_report",
  "Get a full profile report for a specific influencer: audience demographics, engagement, growth, brand safety. " +
    "Costs 1 credit. Use the Modash user ID from search results.",
  {
    platform: z.enum(["instagram", "tiktok", "youtube"]).describe("Platform: instagram, tiktok, or youtube"),
    user_id: z.string().describe("Modash user ID (from search results)"),
  },
  async ({ platform, user_id }) => {
    const result = await modashRequest("GET", `/${platform}/profile/${user_id}/report`);
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }
    return { content: [{ type: "text", text: formatProfileReport(result.data, platform) }] };
  }
);

// ---- Tool 5: modash_ai_text_search ----

server.tool(
  "modash_ai_text_search",
  "AI-powered natural language search for influencers. Describe who you're looking for in plain language " +
    '(e.g., "Colombian fitness mom lifestyle creator"). Costs 0.025 credits per profile. ' +
    "Rate limit: 1 request per second — do not call in rapid succession.",
  {
    platform: z.enum(["instagram", "tiktok", "youtube"]).describe("Platform to search"),
    query: z.string().describe('Natural language search query (e.g., "mama colombiana de lifestyle fitness")'),
    min_followers: z.number().optional().describe("Minimum followers filter"),
    max_followers: z.number().optional().describe("Maximum followers filter"),
  },
  async ({ platform, query, min_followers, max_followers }) => {
    const body = { query };
    if (min_followers != null) body.min_followers = min_followers;
    if (max_followers != null) body.max_followers = max_followers;

    const result = await modashRequest("POST", `/ai/${platform}/text-search`, body);
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }

    const data = result.data;
    const profiles = data.profiles || data.lookalikes || data.data || [];
    const lines = [`AI Text Search Results for "${query}" on ${platform} (${profiles.length} profiles):\n`];

    if (profiles.length === 0) {
      lines.push("No creators found. Try a different description or broader terms.");
    } else {
      for (const p of profiles) {
        lines.push(formatSearchResult(p, platform));
        lines.push("");
      }
      lines.push(`Estimated cost: ~${(profiles.length * 0.025).toFixed(3)} credits`);
    }

    lines.push("");
    lines.push("NOTE: AI search is rate-limited to 1 request/second. Wait before calling again.");

    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

// ---- Tool 6: modash_lookalikes ----

server.tool(
  "modash_lookalikes",
  "Find influencers similar to a given creator. Provide a Modash user ID and get back lookalike profiles. " +
    "Costs 0.025 credits per profile returned. Great for expanding a shortlist from a proven performer.",
  {
    platform: z.enum(["instagram", "tiktok", "youtube"]).describe("Platform of the source creator"),
    user_id: z.string().describe("Modash user ID of the creator to find lookalikes for"),
  },
  async ({ platform, user_id }) => {
    const result = await modashRequest("POST", `/ai/${platform}/lookalikes`, {
      user_id,
    });
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }

    const data = result.data;
    const profiles = data.profiles || data.lookalikes || data.data || [];
    const lines = [`Lookalike Profiles for ${user_id} on ${platform} (${profiles.length} results):\n`];

    if (profiles.length === 0) {
      lines.push("No lookalike profiles found for this creator.");
    } else {
      for (const p of profiles) {
        lines.push(formatSearchResult(p, platform));
        lines.push("");
      }
      lines.push(`Estimated cost: ~${(profiles.length * 0.025).toFixed(3)} credits`);
    }

    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

// ---- Tool 7: modash_locations ----

server.tool(
  "modash_locations",
  "Look up Modash location IDs by city or country name. These IDs are required for location-based search filters. " +
    "This tool is FREE (0 credits). Always use this before searching by location. " +
    "Hint: Colombia's Instagram location ID is 102803938.",
  {
    platform: z.enum(["instagram", "tiktok", "youtube"]).describe("Platform to get locations for"),
    query: z.string().describe('City or country name to search (e.g., "Colombia", "Bogota", "Cali")'),
  },
  async ({ platform, query }) => {
    const encodedQuery = encodeURIComponent(query);
    const result = await modashRequest(
      "GET",
      `/${platform}/locations?query=${encodedQuery}`
    );
    if (!result.ok) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
    }
    return { content: [{ type: "text", text: formatLocations(result.data, query) }] };
  }
);

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Server is now running and listening on stdio.
  // Log to stderr so it doesn't interfere with the MCP protocol on stdout.
  console.error("[modash-mcp] Server started successfully. Listening on stdio.");
}

main().catch((err) => {
  console.error("[modash-mcp] Fatal error:", err);
  process.exit(1);
});
