import React, { useState } from "react";
import ReactDOM from 'react-dom';

// AddComponent instance;
let AddComponent: function;

// Create a provider for components to consume and subscribe to changes
export const BlocktreeProvider = (props) => {

  // components hook
  const [components, setComponents] = useState([]);

  // allow inset widgets outside of react component;
  AddComponent = (el, component, settings = {}) => {
    // create a portal component
    component = ReactDOM.createPortal(React.createElement(component, settings), el);
    // add to the hook state
    setComponents([...components, component]);
  }

  return components;

};

// Get AddComponent function
export default AddComponent;
export { AddComponent as AddComponent };