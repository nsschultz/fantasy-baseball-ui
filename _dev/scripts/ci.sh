#!/bin/bash
set -e
EXIT_CODE=0
docker compose -f _dev/docker-compose-ci.yaml -p fantasy-baseball-ui up --build --exit-code-from ui || EXIT_CODE=$?
docker compose -f _dev/docker-compose-ci.yaml -p fantasy-baseball-ui down
exit $EXIT_CODE