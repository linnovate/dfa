
// ========================= Bases ========================= //

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

// ======================= Providers ======================= //

import { GlobalStateProvider } from "./contexts/GlobalState";
import { BlocktreeProvider, AddComponent } from "./contexts/BlocktreeProvider";

// ====================== Components ======================= //

import UserWidget from './components/UserWidget';
import CreateRequest from './components/CreateRequest';
import AllRequests from './components/AllRequests';
import MyRequests from './components/MyRequests';
import MyApprovedRequests from './components/MyApprovedRequests';
import RequestsForApproval from './components/RequestsForApproval';
import RequestsGraph from './components/RequestsGraph';
import Parteis from './components/Parteis';
import CreateMember from './components/CreateMember';
import Members from './components/Members';

const widgets = {
  UserWidget,
  CreateRequest,
  AllRequests,
  MyRequests,
  MyApprovedRequests,
  RequestsForApproval,
  RequestsGraph,
  Parteis,
  CreateMember,
  Members,
};

// =================== Boocktree handler =================== //

window.BlocktreeWidgets = function (name, el, settings) {
  try {
    if (widgets[name]) {
      AddComponent(el, widgets[name], settings);
    } else {
      el.innerHTML = `Block <strong>${name}</strong> is empty client component`;
    }
  } catch (error) {
    el.innerHTML = `Client component is broken. <br/> ${error}`;
  }
}

class ElementreeElement extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name")
    try {
      if (widgets[name]) {
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

// ========================= Setup ========================= //

// setup as Blocktree
ReactDOM.render(
  <GlobalStateProvider>
    <BlocktreeProvider />
  </GlobalStateProvider>,
  document.createElement('div')
);

// ========================= Test ========================== //

const root = document.getElementById('root');

root && (root.innerHTML = `
  <elementree-widget name='UserWidget'></elementree-widget>

  <elementree-widget name='CreateMember'></elementree-widget>
  <elementree-widget name='Members'></elementree-widget>

  <elementree-widget name='CreateRequest'></elementree-widget>
  <elementree-widget name='MyRequests'></elementree-widget>

  <elementree-widget name='MyApprovedRequests'></elementree-widget>

  <elementree-widget name='RequestsForApproval'></elementree-widget>

  <elementree-widget name='RequestsGraph'></elementree-widget>

  <elementree-widget name='AllRequests'></elementree-widget>

  <elementree-widget name='Parteis'></elementree-widget>
`);
