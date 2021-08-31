# Welcome to _Distrubuted Flight Approval_ (DFA)

## Overview
The DFA is intended to model collaberative / multi-partner-approval based workflows and make them accessible through the DAML UI and react components which are displayed and managed  with Wordpress and Elementor.

  ![low-DAML - Frame 1 (3)](https://user-images.githubusercontent.com/245027/131503257-e22a5175-8262-4145-b645-de7e4d28ce94.jpg)


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

## Uploading to damlhub
The dfa project has a test environment in damlhub - currently we need to upload the artifact files manually to damlhub
We build these artifacts in to the /target subdirectory

```
# building daml
daml build -o target/create-daml-app.dar

#building the ui
daml codegen js target/create-daml-app.dar -o ui/daml.js
cd ui && npm install && npm run-script build
zip -r ../target/create-daml-app-ui.zip build
```
Then go to damlhub and upload create-daml-app.dar and create-daml-app-ui.zip



