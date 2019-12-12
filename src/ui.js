export default class Ui {
  /**
   * @param {object} api - Editor.js API
   * @param {ImageConfig} config - user config
   */
  constructor({ api, config }) {
    this.api = api;
    this.config = config;
    this.nodes = {
      wrapper: make('div', [this.CSS.baseClass, this.CSS.wrapper]),
      blockContainer: make('div', [this.CSS.blockContainer]),
    };
  }
  /**
   * CSS classes
   * @constructor
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      /**
       * Tool's classes
       */
      wrapper: 'blockquote',
      blockContainer: 'block-tool'
    };
  };

  /**
   * @param {BlockQuoteData} data
   * @return {HTMLDivElement}
   */
  render(data) {
    let value = ''
    if (data.value) value = data.value;
    let input = make('textarea', 'content', {
      placeholder: data.config,
      value: value
    })
    let by = make('input', 'by-field', {
      placeholder: 'by...',
      value: value
    })
    const wrapper = make('div', 'blockquote--quote')
    wrapper.appendChild(input);
    wrapper.appendChild(by);
    if (this.value) {
      () => {
        input.css('height', input.get(0).scrollHeight + 'px');
      }
    }
    input.oninput = () => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    }
    return wrapper;
  }

  /**
   * Apply visual representation of activated tune
   * @param {string} tuneName - one of available tunes {@link Tunes.tunes}
   * @param {boolean} status - true for enable, false for disable
   */
  applyTune(tuneName, status) {
    this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${tuneName}`, status);
  }
}

/**
 * Helper for making Elements with attributes
 *
 * @param  {string} tagName           - new Element tag name
 * @param  {array|string} classNames  - list or name of CSS class
 * @param  {Object} attributes        - any attributes
 * @return {Element}
 */
export const make = (tagName, classNames = null, attributes = {}) => {
  let el = document.createElement(tagName);
  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }
  for (let attrName in attributes) {
    el[attrName] = attributes[attrName];
  }
  return el;
};