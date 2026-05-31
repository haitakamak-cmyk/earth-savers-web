import { headers } from "next/headers";

function normalizeOrigin(raw: string | undefined | null): string | null {
  if (!raw?.trim()) return null;
  try {
    const trimmed = raw.trim().replace(/\/$/, "");
    const url = trimmed.includes("://")
      ? new URL(trimmed)
      : new URL(`https://${trimmed}`);
    return url.origin;
  } catch {
    return null;
  }
}

function collectAllowedOrigins(host: string | null): Set<string> {
  const origins = new Set<string>();

  const siteUrl = normalizeOrigin(process.env.SITE_URL);
  if (siteUrl) origins.add(siteUrl);

  const nextPublic = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (nextPublic) origins.add(nextPublic);

  // 本番では Host ヘッダー由来の origin を許可しない（CSRF 厳格化）
  if (process.env.NODE_ENV !== "production" && host) {
    const httpOrigin = normalizeOrigin(`http://${host}`);
    const httpsOrigin = normalizeOrigin(`https://${host}`);
    if (httpOrigin) origins.add(httpOrigin);
    if (httpsOrigin) origins.add(httpsOrigin);
  }

  return origins;
}

/**
 * Validates that the request is coming from the same origin.
 * This is a basic CSRF protection for API routes that perform side effects.
 */
export async function validateRequestOrigin() {
  const headerList = await headers();
  const origin = headerList.get("origin");
  const referer = headerList.get("referer");
  const host = headerList.get("host");

  if (!origin && !referer) {
    return false;
  }

  let requestOrigin: string | null = null;
  try {
    if (origin) {
      requestOrigin = new URL(origin).origin;
    } else if (referer) {
      requestOrigin = new URL(referer).origin;
    }
  } catch {
    return false;
  }

  if (!requestOrigin) {
    return false;
  }

  const allowedOrigins = collectAllowedOrigins(host);
  if (allowedOrigins.has(requestOrigin)) {
    return true;
  }

  // 本番では localhost 類似ドメイン（例: evil-localhost.com）を誤認しないよう、
  // 開発時のみホスト名を厳密比較して緩和する
  if (process.env.NODE_ENV === "development") {
    try {
      const u = new URL(requestOrigin);
      const h = u.hostname;
      if (h === "localhost" || h === "127.0.0.1" || h === "[::1]") {
        return true;
      }
    } catch {
      /* invalid URL */
    }
  }

  return false;
}
