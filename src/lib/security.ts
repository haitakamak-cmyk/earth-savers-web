import { headers } from "next/headers";

/**
 * Validates that the request is coming from the same origin.
 * This is a basic CSRF protection for API routes that perform side effects.
 */
export async function validateRequestOrigin() {
  const headerList = await headers();
  const origin = headerList.get("origin");
  const referer = headerList.get("referer");
  const host = headerList.get("host");

  const siteUrlHttp = process.env.SITE_URL || (host ? `http://${host}` : "");
  const siteUrlHttps = siteUrlHttp.replace(/^http:\/\//, "https://");

  if (!origin && !referer) {
    return false;
  }

  const requestOrigin = origin || (referer ? new URL(referer).origin : null);

  if (!requestOrigin) {
    return false;
  }

  const siteOk =
    (siteUrlHttp.length > 0 && requestOrigin.startsWith(siteUrlHttp)) ||
    (siteUrlHttps.length > 0 && requestOrigin.startsWith(siteUrlHttps));

  if (siteOk) {
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
