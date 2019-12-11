/**
 * Image Tool for the Editor.js
 * @author Prashant Singh <prashantco111@gmail.com>
 * @license MIT
 * @see {@link https://github.com/prashant1k99/blockquote}
 *
 * To developers.
 * To simplify Tool structure, I split it in 3 parts:
 * 1) index.js - It contins main code which goes to EditorJs
 * 2) ui.js - It handles dom manipulation
 * 3) svg/ - It is the Folder which contins svg icons for the EditorJs
 * 4) index.css - The Styling for the Plugin is in this css file
 *
 * Tools config:
 *
 * blockquote: {
 *   class: BlockQuote,
 *   config: {
 *     placeholder: "Your Placeholder here",
 *     tools: ['alert', 'info', 'warning', 'note']
 *   },
 * },
 */
/**
 * @typedef {object} BlockQuoteData
 * @description BlockQuote Tool's input and output data format
 * @property {string} caption — blockquote caption / byline
 * @property {boolean} alert - the alert box will be created
 * @property {boolean} info - the info box will be created
 * @property {boolean} warning - the warning box will be created
 * @property {boolean} note - the notice box will be created
 */

// Standard imports for the file
import quoteIcon from './svg/quote.svg'
import './index.css'
import Tunes from './tunes'

/**
 * @typedef {object} BlockQuoteConfig
 * @description Config supported by Tool
 * @property {string} placeholder - Set the placeholder for the tool
 * @property {array} tools - gets the tool allowed by the user
 * @property {string} tools.alert - allows the alert block setting
 * @property {string} tools.info - allows the info block setting
 * @property {string} tools.warning - allows the warning block setting
 * @property {string} tools.note - allows the note block setting
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
      tools: config.tools || ['alert', 'info', 'warning', 'note']
    };

    this.tunes = new Tunes({
      api,
      onChange: (tuneName) => this.tuneToggled(tuneName)
    });

    /**
     * Set saved state
     */
    this.data = data;
    this.wrapper = undefined;
  }

  renderSettings() {
    return this.tunes.render(this.data);
  }

  tuneToggled(tuneName) {
    // inverse tune state
    this.setTune(tuneName, !this._data[tuneName]);
  }

  render() {
    const wrapper = document.createElement('div');
    const input = document.createElement('textarea');
    wrapper.classList.add('blockquote');
    wrapper.appendChild(input);

    input.placeholder = this.config.placeholder;
    input.value = this.data && this.data.value ? this.data.value : '';
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

  save(blockContent) {
    const input = blockContent.querySelector('input');
    return {
      value: blockContent.value
    }
  }

  validate(savedData) {
    if (!savedData.value.trim()) {
      return false;
    }
    return true;
  }
}

