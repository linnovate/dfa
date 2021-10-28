// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import { GlobalStateProvider } from "./contexts/GlobalState";
import { ElementreeProvider, AddComponent } from "./contexts/ElementreeProvider";
import DamlProvider from "./contexts/DamlProvider";


// Import - elementree widgets
import UserWidget from './components/UserWidget';
import AllRequests from './components/AllRequests';
import CreateRequest from './components/CreateRequest';
import MyApprovedRequests from './components/MyApprovedRequests';
import MyRequests from './components/MyRequests';
import RequestsForApproval from './components/RequestsForApproval';
import Users from './components/Users';
import ViewMap from './components/ViewMap';
import Graph from './components/Graph';

import App from './components/App';

const root = document.getElementById('root');

root && ReactDOM.render(<App />, root);


// Setup a general provider with a binding widgets list
ReactDOM.render(
  <GlobalStateProvider>
    <DamlProvider>
      <ElementreeProvider />
    </DamlProvider>
  </GlobalStateProvider>,
  document.createElement('div')
);


// Register - elementree widgets
const widgets = {
  UserWidget,
  CreateRequest,
  AllRequests,
  MyApprovedRequests,
  MyRequests,
  RequestsForApproval,
  Users,
  ViewMap,
  Graph,
};


// Setup function - elementree widgets
// example: window.ElementreeWidgets("my_widget_name", el, {})
window.ElementreeWidgets = function (name, el, settings) {
  try {
    if (widgets[name]) {
      // render the widget
      AddComponent(el, widgets[name], settings);
    } else {
      el.innerHTML = `Block <strong>${name}</strong> is empty client component`;
    }
  } catch (error) {
    el.innerHTML = `Client component is broken. <br/> ${error}`;
  }
}

// Setup customElements - elementree widgets
// example: <elementree-widget name="my_widget_name" data-prop-1=""  data-prop-2="" ></elementree-widget>
class ElementreeElement extends HTMLElement {
//   constructor() {
//     super();
//   }
  connectedCallback() {
    const name = this.getAttribute("name")
    try {
      if (widgets[name]) {
        // render the widget
        AddComponent(this, widgets[name], this.dataset);
      } else {
        this.innerHTML = `Block <strong>${name}</strong> is empty client component`;
      }
    } catch (error) {
      this.innerHTML = `Client component is broken. <br/> ${error}`;
    }
  }
}
customElements.define('elementree-widget', ElementreeElement);


// root && (root.innerHTML = `
// <elementree-widget name='Graph'></elementree-widget>
// `);