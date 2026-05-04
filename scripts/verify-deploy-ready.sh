#!/usr/bin/env bash
# 本番 `vercel deploy --prod` の前に実行する想定。
# - 作業ツリーがクリーンであること
# - 追跡ブランチが origin と一致していること（push 済み）
set -euo pipefail

cd "$(dirname "$0")/.."

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "verify-deploy-ready: このディレクトリは git リポジトリではありません。"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "verify-deploy-ready: 未コミットの変更があります。先に commit してください。"
  git status -sb
  exit 1
fi

current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$current_branch" != "main" ]]; then
  echo "verify-deploy-ready: ブランチが main ではありません（現在: $current_branch）。本番前に main にマージ・checkout してください。"
  exit 1
fi

upstream="$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || true)"
if [[ -z "$upstream" ]]; then
  echo "verify-deploy-ready: main に upstream（例: origin/main）が設定されていません。git push -u origin main を一度実行してください。"
  exit 1
fi

git fetch origin --quiet
local_sha="$(git rev-parse HEAD)"
remote_sha="$(git rev-parse "$upstream")"
if [[ "$local_sha" != "$remote_sha" ]]; then
  echo "verify-deploy-ready: ローカル main と $upstream が一致しません（push または pull が必要）。"
  echo "  local:  $local_sha"
  echo "  remote: $remote_sha"
  exit 1
fi

echo "verify-deploy-ready: OK（クリーン・main・$upstream と一致）"
