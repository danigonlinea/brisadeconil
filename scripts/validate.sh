#!/usr/bin/env bash
set -euo pipefail

FAST_MODE=false
if [[ "${1:-}" == "--fast" ]]; then
  FAST_MODE=true
fi

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

fail() {
  echo -e "${RED}FAIL: $*${NC}"
  exit 1
}

pass() {
  echo -e "${GREEN}PASS: $*${NC}"
}

warn() {
  echo -e "${YELLOW}WARN: $*${NC}"
}

echo "=== Validación de calidad ==="
if [[ "$FAST_MODE" == true ]]; then
  echo "Modo: rápido (type-check + anti-secretos)"
else
  echo "Modo: completo (type-check + build + anti-secretos)"
fi
echo ""

# 1) Type-check
echo "→ npx astro check"
if npx astro check; then
  pass "Type-check OK"
else
  fail "Type-check falló"
fi
echo ""

# 2) Build (skip en modo rápido)
if [[ "$FAST_MODE" == false ]]; then
  echo "→ npm run build"
  if npm run build; then
    pass "Build OK"
  else
    fail "Build falló"
  fi
  echo ""
else
  warn "Build omitido en modo rápido"
  echo ""
fi

# 3) Anti-secretos: buscar WEB3FORMS_ACCESS_KEY en código cliente
# Legítimo excluir:
#   - src/pages/api/        → server-only
#   - .github/              → CI config
#   - scripts/              → tooling
#   - node_modules/.git/dist → artefactos
#   - .env.example          → plantilla de ejemplo
#   - *.md                  → documentación
echo "→ grep anti-secretos (WEB3FORMS_ACCESS_KEY en código cliente)"
MATCHES=$(grep -r \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=dist \
  --exclude-dir=.github \
  --exclude-dir=scripts \
  --exclude-dir=src/pages/api \
  --exclude=".env.example" \
  --exclude="*.md" \
  -n "WEB3FORMS_ACCESS_KEY" \
  src/ public/ \
  *.mjs *.js *.ts *.tsx *.astro \
  2>/dev/null || true)

if [[ -n "$MATCHES" ]]; then
  echo -e "${RED}Se encontró WEB3FORMS_ACCESS_KEY en código cliente:${NC}"
  echo "$MATCHES"
  fail "Anti-secretos: detectado server-only key en código cliente"
else
  pass "Anti-secretos OK"
fi
echo ""

echo -e "${GREEN}=== Validación completada con éxito ==="
exit 0
