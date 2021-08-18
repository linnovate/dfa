# Welcome to _Distrubuted Flight Approval_

## Usage

Before you can run the application, you need to install the
[Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) package manager for JavaScript and [Daml](https://docs.daml.com/getting-started/installation.html).

There are two steps to build the project.

First, we need to generate TypeScript code bindings for the compiled Daml model.

At the root of the repository, run:

```sh
daml build
daml codegen js .daml/dist/create-daml-app-0.1.0.dar -o ui/daml.js
```

The latter command generates TypeScript packages in the `daml.js` directory.

Next, navigate to the `ui` directory and install the dependencies and build the app by running:

```sh
cd ui
npm i
npm run-script build
```

The last step is not absolutely necessary but useful to check that the app compiles.

To start the application, go back do the main directory, start a Daml ledger and start the UI server use:

```sh
cd ..
trap killgroup SIGINT # we use this to make sure we can stop the processes
killgroup(){
pkill -f npm
pkill -f daml
pkill -f node
}
daml start & (cd ui; npm start)
```

This should open a browser window with a login screen.

If it doesn't, you can manually point your browser to http://localhost:3000.
