#!/bin/bash
set -e

APP_NAME=$(basename "${PWD}")

source "${HOME}/Websites/infrastructure/deploy/config.sh"
source "${HOME}/Websites/infrastructure/deploy/git.sh"
source "${HOME}/Websites/infrastructure/deploy/static.sh"
source ".env.production"

check_git_branch
check_git_changes
sed -i.bak "s|\"./admin\"|\".${VITE_BASE_PATH}\"|" package.json
build_static
deploy_static
sed -i.bak "s|\".${VITE_BASE_PATH}\"|\"./admin\"|" package.json
rm package.json.bak
printf "\e[0;32mDone.\n\e[0m"
