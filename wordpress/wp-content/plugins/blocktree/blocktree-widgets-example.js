
// Register - widgets
window.widgets || (window.widgets = {});
widgets["my_widget_name"] = (props) => `Hello ${props.value}!!!`;

// Setup - function
// example: window.BlocktreeWidgets("my_widget_name", el, {})
window.BlocktreeWidgets = function (name, el, settings) {
  try {
    if (widgets[name]) {
      // render the widget
      el.innerHTML = widgets[name](settings); // example
    } else {
      el.innerHTML = 'Block ' + "<strong>" + name + "</strong>" + ' is empty client component';
    }
  } catch (error) {
    el.innerHTML = 'Client component is broken.' + "<br/>" + error;
  }
}

// Setup - customElements
// example: <blocktree-widget name="my_widget_name" data-prop-1=""  data-prop-2="" ></blocktree-widget>
class BlocktreeElement extends HTMLElement {
  //   constructor() {
  //     super();
  //   }
  connectedCallback() {
    const name = this.getAttribute("name")
    try {
      if (widgets[name]) {
        // render the widget
        this.innerHTML = widgets[name](settings); // example
      } else {
        this.innerHTML = `Block <strong>${name}</strong> is empty client component`;
      }
    } catch (error) {
      this.innerHTML = `Client component is broken. <br/> ${error}`;
    }
  }
}
customElements.define('blocktree-widget', BlocktreeElement);