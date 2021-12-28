#!/bin/bash
# build daml

case $1 in
	build)
		cd daml
		daml build
		daml codegen js .daml/dist/dfa-0.1.0.dar -o ../ui/daml.js
		# Build UI
		cd ui
		npm i
		npm run-script build
		;;

	start)
		echo `pwd`
		echo " starting daml"
		cd daml
		daml start &
		echo "starting dev server"
		cd ../ui && npm start
		;;

	hub)
		# building daml
		cd daml		
		daml build -o ../target/create-daml-app.dar

		#building the ui
		daml codegen js ../target/create-daml-app.dar -o ../ui/daml.js
		cd ../ui && npm install && npm run-script build
		zip -r ../target/create-daml-app-ui.zip build
		;;
	*)
		echo "No valid command sent - seeya!"
		;;
esac
