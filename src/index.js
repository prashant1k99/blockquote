/**
 * Image Tool for the Editor.js
 * @author Prashant Singh <prashantco111@gmail.com>
 * @license MIT
 * @see {@link https://github.com/prashant1k99/blockquote}
 *
 * To developers.
 * To simplify Tool structure, I split it in 3 parts:
 * 1) index.js - It contins main code which goes to EditorJs
 * 2) svg/ - It is the Folder which contins svg icons for the EditorJs
 * 3) index.css - The Styling for the Plugin is in this css file
 *
 * Tools config:
 *
 * blockquote: {
 *   class: BlockQuote,
 *   config: {
 *     placeholder: "Your Placeholder here",
 *   },
 * },
 */
/**
 * @typedef {object} BlockQuoteData
 * @description BlockQuote Tool's input and output data format
 * @property {string} caption — blockquote caption / byline
 */

// Standard imports for the file
import quoteIcon from './svg/quote.svg'
import './index.css'

/* *
 * @typedef {object} BlockQuoteConfig
 * @description Config supported by Tool
 * @property {string} placeholder - Set the placeholder for the tool
 */

export default class BlockQuote {
  /**
  * Get Tool toolbox settings
  * icon - Tool icon's SVG
  * title - title to show in toolbox
  *
  * @return {{icon: string, title: string}}
  */
  static get toolbox() {
    return {
      icon: quoteIcon,
      title: 'BlockQuote'
    };
  }

  /**
  * @param {BlockQuoteData} data - previously saved data
  * @param {BlockQuoteConfig} config - user config for Tool
  * @param {object} api - Editor.js API
  */
  constructor({ data, config, api }) {
    this.api = api;

    /**
     * Tool's initial config
     */
    this.config = {
      placeholder: config.placeholder || 'Let\' write...',
    };

    /**
     * Set saved state
     */
    this.data = {
      value: data.value || '',
      caption: data.caption || ''
    };
    this.wrapper = undefined;
  }

  render() {
    let textarea = make('textarea', 'textarea-content', {
      placeholder: this.config.placeholder,
      value: Object.keys(this.data).length !== 0 ? this.data.value : null
    })
    let by = make('input', 'by-field', {
      placeholder: 'by...',
      value: Object.keys(this.data).length !== 0 ? this.data.caption : null
    })
    const byWrapper = make('div', 'by-wrapper')
    byWrapper.appendChild(by);
    const wrapper = make('div', 'blockquote')
    wrapper.appendChild(textarea);
    wrapper.appendChild(byWrapper);
    if (this.value) {
      () => {
        textarea.css('height', textarea.get(0).scrollHeight + 'px');
      }
    }
    textarea.oninput = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
    return wrapper;
  }

  save(blockContent) {
    const value = blockContent.querySelector(`.textarea-content`);
    const caption = blockContent.querySelector(`.by-field`);

    return Object.assign(this.data, {
      caption: caption.value,
      value: value.value,
    });
  }

  validate(savedData) {
    if (!savedData.value.trim()) {
      return false;
    }
    return true;
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
const make = (tagName, classNames = null, attributes = {}) => {
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