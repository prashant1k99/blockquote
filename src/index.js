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
import alertIcon from './svg/alert.svg'
import infoIcon from './svg/info.svg'
import noticeIcon from './svg/notice.svg'
import warningIcon from './svg/warning.svg'
import ui from './ui'

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
  render() {
    return document.createElement('input');
  }

  save(blockContent) {
    return {
      url: blockContent.value
    }
  }
}

/**
   * @param {BlockQuoteData} data - previously saved data
   * @param {BlockQuoteConfig} config - user config for Tool
   * @param {object} api - Editor.js API
   */
// constructor = ({ data, config, api }) => {
//   this.api = api;

//   /**
//    * Tool's initial config
//    */
//   this.config = {
//     placeholder: config.placeholder || 'Let\' write...',
//     tools: config.tools || ['alert', 'info', 'warning', 'note']
//   };

//   /**
//    * Set saved state
//    */
//   this._data = {};
//   this.data = data;
// };