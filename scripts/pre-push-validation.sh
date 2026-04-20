#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/CustomerPortal/CustomerPortal/Igt.InstantsShowcase"
CLIENT_DIR="$APP_DIR/ClientApp"
SOLUTION_PATH="$APP_DIR/Igt.InstantsShowcase.sln"
PROJECT_PATH="$APP_DIR/Igt.InstantsShowcase.csproj"

fail() {
  echo "Validation failed: $1" >&2
  exit 1
}

step() {
  echo
  echo "==> $1"
}

step "Checking git branch"
CURRENT_BRANCH="$(git -C "$ROOT_DIR" rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" == "master" || "$CURRENT_BRANCH" == "main" ]]; then
  echo "Warning: running validation on '$CURRENT_BRANCH'. Ensure this branch is the one intended for deployment."
fi

step "Checking for uncommitted changes"
if [[ -n "$(git -C "$ROOT_DIR" status --short)" ]]; then
  echo "Warning: working tree has uncommitted changes. Validation will continue, but review the diff before pushing."
fi

step "Restoring .NET dependencies"
dotnet restore "$SOLUTION_PATH"

step "Building .NET project"
dotnet build "$PROJECT_PATH" -c Release --no-restore

step "Checking frontend dependencies"
if [[ ! -d "$CLIENT_DIR/node_modules" ]]; then
  echo "node_modules not found, running npm ci"
  (cd "$CLIENT_DIR" && npm ci)
fi

step "Running frontend lint"
(cd "$CLIENT_DIR" && npm run lint)

step "Running frontend tests"
EMPTY_TEST_FILES=()
while IFS= read -r test_file; do
  if ! grep -Eq '\b(test|it)[[:space:]]*\(' "$test_file"; then
    EMPTY_TEST_FILES+=("$test_file")
  fi
done < <(find "$CLIENT_DIR/src" -type f \( -name '*.test.js' -o -name '*.test.jsx' -o -name '*.test.ts' -o -name '*.test.tsx' \))

if [[ ${#EMPTY_TEST_FILES[@]} -gt 0 ]]; then
  printf 'Validation failed: the following test files do not contain any tests:\n' >&2
  printf '  %s\n' "${EMPTY_TEST_FILES[@]}" >&2
  exit 1
fi

(cd "$CLIENT_DIR" && npm test -- --watch=false --passWithNoTests)

step "Building frontend"
(cd "$CLIENT_DIR" && npm run build)

echo
echo "Pre-push validation completed successfully."
