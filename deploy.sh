#!/bin/bash
set -e

APP_NAME=$(basename "${PWD}")

source "${HOME}/Websites/infrastructure/deploy/config.sh"
source "${HOME}/Websites/infrastructure/deploy/git.sh"
source "${HOME}/Websites/infrastructure/deploy/static.sh"
source ".env.production"

check_git_branch
check_git_changes
sed -i.bak "s|\"./admin\"|\".${PUBLIC_URL}\"|" package.json
build_static
deploy_static
sed -i.bak "s|\".${PUBLIC_URL}\"|\"./admin\"|" package.json
rm package.json.bak
