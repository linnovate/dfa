# Makefile

LEDGER_PORT_A := 1000
LEDGER_PORT_B := 1001

CANTON_DOMAIN_PORT := 2000
CANTON_DOMAIN_URL := http://127.0.0.1:2000

NAVIGATOR_PORT_A := 4500
NAVIGATOR_PORT_B := 4501

JSON_API_PORT_A := 4000
JSON_API_PORT_B := 4001
JSON_API_URL_A := http://127.0.0.1:4000
JSON_API_URL_B := http://127.0.0.1:4001

LEDGER_ID := participant1

commands := "\
	\nMake commands: \
	\n (1) make daml_build \
	\n (-) make daml_start \
	\n (2) make canton_a \
	\n     make canton_b \
	\n (-) make navigator_a \
	\n     make navigator_b \
	\n (3) make json_api_a \
	\n (4) make json_api_b \
	\n (5) make ui_start \
	\n (-) make ui_build \
	\nEnvs:\
	\n   LEDGER_PORT_A: ${LEDGER_PORT_A} \
	\n   LEDGER_PORT_B: ${LEDGER_PORT_B} \
	\n   CANTON_DOMAIN_PORT: ${CANTON_DOMAIN_PORT} \
	\n   CANTON_DOMAIN_URL: ${CANTON_DOMAIN_URL} \
	\n   NAVIGATOR_PORT_A: ${NAVIGATOR_PORT_A} \
	\n   NAVIGATOR_PORT_B: ${NAVIGATOR_PORT_B} \
	\n   JSON_API_PORT_A: ${JSON_API_PORT_A} \
	\n   JSON_API_PORT_B: ${JSON_API_PORT_B} \
	\n   JSON_API_URL_A: ${JSON_API_URL_A} \
	\n   JSON_API_URL_B: ${JSON_API_URL_B} \
	\n   LEDGER_ID: ${LEDGER_ID} \
	\n"

default:
	echo ${commands}

##################################################################
  ############################## Daml ##############################
##################################################################

daml_build:
	docker run --rm -it \
	-w /data \
	-v ${PWD}/daml:/data \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml build"

daml_start:
	docker run --rm -it \
	-w /data \
	-v ${PWD}/daml:/data \
	-p ${JSON_API_PORT_A}:${JSON_API_PORT_A} \
	-p 7500:7500 \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml start \
			--start-navigator=true \
			--sandbox-option='--wall-clock-time' \
			--sandbox-option='--ledgerid=${LEDGER_ID_A}' \
			--json-api-port=${JSON_API_PORT_A} \
			--json-api-option='--address=0.0.0.0'"

##################################################################
  ############################# Canton #############################
##################################################################

canton_a:
	docker run --rm -it \
	--network host \
	-v ${PWD}/canton:/canton/app \
	-v ${PWD}/daml:/canton/daml \
	-e DOMAIN_PORT=${CANTON_DOMAIN_PORT} \
	-e LEDGER_PORT=${LEDGER_PORT_A} \
	-p ${CANTON_DOMAIN_PORT}:${CANTON_DOMAIN_PORT} \
	-p ${LEDGER_PORT_A}:${LEDGER_PORT_A} \
	digitalasset/canton-community:latest \
	--config /canton/app/canton.conf \
	--bootstrap /canton/app/init.canton

canton_b:
	docker run --rm -it \
	--network host \
	-v ${PWD}/canton:/canton/app \
	-v ${PWD}/daml:/canton/daml \
	-e DOMAIN_URL=${CANTON_DOMAIN_URL} \
	-e LEDGER_PORT=${LEDGER_PORT_B} \
	-p ${LEDGER_PORT_B}:${LEDGER_PORT_B} \
	digitalasset/canton-community:latest \
	--config /canton/app/canton_2.conf \
	--bootstrap /canton/app/init_2.canton

##################################################################
  ########################### Navigator ############################
##################################################################

navigator_a:
	docker run --rm -it \
	--network host \
	-p ${NAVIGATOR_PORT_A}:${NAVIGATOR_PORT_A} \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml ledger navigator \
			--host localhost \
			--port ${LEDGER_PORT_A} \
			--port ${NAVIGATOR_PORT_A}"

navigator_b:
	docker run --rm -it \
	--network host \
	-p ${NAVIGATOR_PORT_B}:${NAVIGATOR_PORT_B} \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml ledger navigator \
			--host localhost \
			--port ${LEDGER_PORT_B} \
			--port ${NAVIGATOR_PORT_B}"

##################################################################
  ############################ JsonApi #############################
##################################################################

json_api_a:
	docker run --rm -it \
    --network host \
	-p ${JSON_API_PORT_A}:${JSON_API_PORT_A} \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml json-api \
			--http-port ${JSON_API_PORT_A} \
			--ledger-port ${LEDGER_PORT_A} \
			--ledger-host localhost \
			--address 0.0.0.0 \
			--allow-insecure-tokens"

json_api_b:
	docker run --rm -it \
    --network host \
	-p ${JSON_API_PORT_B}:${JSON_API_PORT_B} \
	digitalasset/daml-sdk:1.18.0 \
	sh -c "daml json-api \
			--http-port ${JSON_API_PORT_B} \
			--ledger-port ${LEDGER_PORT_B} \
			--ledger-host localhost \
			--address 0.0.0.0 \
			--allow-insecure-tokens"

##################################################################
  ############################## UI ################################
##################################################################

ui_start:
	docker run --rm -it \
	-w /usr/src/app \
	-v ${PWD}/ui:/usr/src/app \
	-p 3000:3000 \
	-e JSON_API_URL=${JSON_API_URL_A} \
	node:alpine \
	sh -c "yarn install && yarn start"

ui_build:
	docker run --rm -it \
	-w /usr/src/app \
	-v ${PWD}/ui:/usr/src/app \
	-e JSON_API_URL=${JSON_API_URL_A} \
	node:alpine \
	sh -c "yarn install && yarn build"