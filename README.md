# Welcome to _Distrubuted Flight Approval_

## Usage

Before you can run the application, you need to install the
[Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) package manager for JavaScript and [Daml](https://docs.daml.com/getting-started/installation.html).

There are two steps to build the project.

First, we need to generate TypeScript code bindings for the compiled Daml model.

At the root of the repository, run:

```sh
daml build
daml codegen js .daml/dist/dfa-0.1.0.dar -o ui/daml.js
```

The latter command generates TypeScript packages in the `daml.js` directory.

Next, navigate to the `ui` directory and install the dependencies and build the app by running:

```sh
cd ui
npm i
npm run-script build
```

The last step is not absolutely necessary but useful to check that the app compiles.

To start the application, go back do the main directory and start a Daml ledger:

```sh
cd ..
daml start
```

And to start the UI server open a new terminal and from the _ui_ directory run:

```sh
npm start
```

When you see the message on the second terminal open the url shown.
