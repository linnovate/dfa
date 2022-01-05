# Makefile

LEDGER_ID := participant1
LEDGER_PORT := 1001
LEDGER_HOST := localhost
JSON_API_URL := http://localhost:7575
JSON_API_PORT := 7575

commands := "\
	\nMake commands: \
	\n (1) make daml_build \
	\n (2) make canton_service \
	\n (3) make daml_json_api_7575 \
	\n (4) make daml_json_api_7576 \
	\n (5) make ui_start \
	\n (-) make daml_start \
	\n (-) make ui_build \
	\nEnvs:\
	\n   LEDGER_ID: ${LEDGER_ID} \
	\n   LEDGER_PORT: ${LEDGER_PORT} \
	\n   LEDGER_HOST: ${LEDGER_HOST} \
	\n   JSON_API_URL: ${JSON_API_URL} \
	\n   JSON_API_PORT: ${JSON_API_PORT} \
	\n"

default:
	echo ${commands}

daml_build:
	docker run --rm -it \
	-w /data \
	-v ${PWD}/daml:/data \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml build"

canton_service:
	docker run --rm -it \
	-v ${PWD}/canton:/canton/app \
	-v ${PWD}/daml:/canton/daml \
	-p ${LEDGER_PORT}:${LEDGER_PORT} \
	-p 1002:1002 \
	digitalasset/canton-community:latest \
	--config /canton/app/canton.conf \
	--bootstrap /canton/app/init.canton

daml_json_api_7575:
	docker run --rm -it \
	-p ${JSON_API_PORT}:${JSON_API_PORT} \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml json-api \
			--ledger-port ${LEDGER_PORT} \
			--http-port ${JSON_API_PORT} \
			--address=0.0.0.0 \
			--ledger-host ${LEDGER_HOST} \
			--allow-insecure-tokens"

daml_json_api_7576:
	docker run --rm -it \
	-p 7576:7576 \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml json-api \
			--ledger-port 1002 \
			--http-port 7576 \
			--address 0.0.0.0 \
			--ledger-host ${LEDGER_HOST} \
			--allow-insecure-tokens"

daml_start:
	docker run --rm -it \
	-w /data \
	-v ${PWD}/daml:/data \
	-p ${JSON_API_PORT}:${JSON_API_PORT} \
	-p 7500:7500 \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml start \
			--start-navigator=true \
			--sandbox-option='--wall-clock-time' \
			--sandbox-option='--ledgerid=${LEDGER_ID}' \
			--json-api-port=${JSON_API_PORT} \
			--json-api-option='--address=0.0.0.0'"

ui_start:
	docker run --rm -it \
	-w /usr/src/app \
	-v ${PWD}/ui:/usr/src/app \
	-p 3000:3000 \
	-e LEDGER_ID=${LEDGER_ID} \
	-e JSON_API_URL=${JSON_API_URL} \
	node:alpine \
	sh -c "yarn install && yarn start"

ui_build:
	docker run --rm -it \
	-w /usr/src/app \
	-v ${PWD}/ui:/usr/src/app \
	-p 3000:3000 \
	-e LEDGER_ID=${LEDGER_ID} \
	-e JSON_API_URL=${JSON_API_URL} \
	node:alpine \
	sh -c "yarn install && yarn build"