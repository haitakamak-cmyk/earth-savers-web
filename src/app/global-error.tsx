"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <main className="mx-auto max-w-lg px-6 py-16 text-center">
          <h1 className="text-xl font-semibold">問題が発生しました</h1>
          <p className="mt-4 text-sm text-neutral-600">
            しばらくしてから再度お試しください。
          </p>
          <button
            type="button"
            className="mt-8 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
            onClick={() => reset()}
          >
            再試行
          </button>
        </main>
      </body>
    </html>
  );
}
