#!/bin/sh
. scripts/constants.sh

NPM_REGISTRY="$NPM_REGISTRY"

npm login --registry="$NPM_REGISTRY"
