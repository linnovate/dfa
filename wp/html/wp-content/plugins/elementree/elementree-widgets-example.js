
// Widgets list
window.widgets = {};
widgets["my_widget_name"] = (props) => `Hello ${props.value}!!!`;

// setup by function
// example: window.ElementreeWidgets("my_widget_name", el, {})
window.ElementreeWidgets = function (name, el, settings) {
  try {
    if (widgets[name]) {
      // render the widget
      // ...
      el.innerHTML = widgets[name](settings); // example
    } else {
      el.innerHTML = 'Block ' + "<strong>" + name + "</strong>" + ' is empty client component';
    }
  } catch (error) {
    el.innerHTML = 'Client component is broken.' + "<br/>" + error;
  }
}

// setup by custom-elements
// example: <elementree-widget name="my_widget_name" data-prop-1=""  data-prop-2="" ></elementree-widget>
class ElementreeElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    try {
      if (widgets[this.name]) {
        // render the widget
        this.innerHTML = widgets[this.name](this.dataset); // example
      } else {
        this.innerHTML = 'Block ' + "<strong>" + name + "</strong>" + ' is empty client component';
      }
    } catch (error) {
      this.innerHTML = 'Client component is broken.' + "<br/>" + error;
    }
  }
}
customElements.define('elementree-widget', ElementreeElement);
