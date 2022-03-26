#!/bin/bash
set -e

file=".env"
if [[ ! -f "${file}" ]]; then
	cp "${file}.example" "${file}"
	cp "${file}.example" "${file}.production"
	docker exec -it --user ubuntu web sh -c 'sed --in-place "s/.local/.com/" "/var/www/wardrobe-admin/.env.production"'
fi

if [[ ! -f "cypress.env.json" ]]; then
	cp "cypress.env.example.json" "cypress.env.json"
fi

yarn install
