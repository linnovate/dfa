/**
 * @file
 */

(function ($) {

  Array.from(document.querySelectorAll('[data-blocktree]:not(.is-loading)')).forEach(el => {

    // disable this element
    el.style.display = "none";
    el.classList.add('is-loading');

    // create new wrapper
    const wrapper = document.createElement("div");
    el.parentNode.insertBefore(wrapper, el);

    // load the data
    let settings;
    try {
      settings = JSON.parse(el.value || '{}');
    } catch (e) {
      alert("Blocktree - load data error.\n" + e);
    }

    // run the handler
    const handler = window[el.dataset.handlerKey];
    const componentName = el.dataset.componentName;
    handler(componentName, wrapper, settings);

  })

}())