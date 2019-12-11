import { make } from './ui';
import alertIcon from './svg/alert.svg'
import infoIcon from './svg/info.svg'
import noticeIcon from './svg/notice.svg'
import warningIcon from './svg/warning.svg'

/**
 * Working with Block Tunes
 */
export default class Tunes {
  /**
   * @param {object} api - Editor API
   * @param {function} onChange - tune toggling callback
   */
  constructor({ api, onChange }) {
    this.api = api;
    this.onChange = onChange;
    this.buttons = [];
  }

  /**
   * Available Image tunes
   */
  static get tunes() {
    return [
      {
        name: 'notice',
        icon: noticeIcon,
        title: 'Notice'
      },
      {
        name: 'info',
        icon: infoIcon,
        title: 'Info'
      },
      {
        name: 'alert',
        icon: alertIcon,
        title: 'Alert'
      },
      {
        name: 'warning',
        icon: warningIcon,
        title: 'Warning'
      }
    ];
  }

  /**
   * Styles
   * @return {{wrapper: string, buttonBase: *, button: string, buttonActive: *}}
   */
  get CSS() {
    return {
      wrapper: '',
      buttonBase: this.api.styles.settingsButton,
      button: 'block-tool__tune',
      buttonActive: this.api.styles.settingsButtonActive
    };
  }

  /**
   * Makes buttons with tunes: add background, add border, stretch image
   * @param {ImageToolData} toolData
   * @return {Element}
   */
  render(toolData) {
    let wrapper = make('div', this.CSS.wrapper);

    this.buttons = [];

    Tunes.tunes.forEach(tune => {
      let el = make('div', [this.CSS.buttonBase, this.CSS.button], {
        innerHTML: tune.icon,
        title: tune.title
      });

      el.addEventListener('click', () => {
        this.tuneClicked(tune.name);
      });

      el.dataset.tune = tune.name;
      el.classList.toggle(this.CSS.buttonActive, toolData[tune.name]);

      this.buttons.push(el);

      wrapper.appendChild(el);
    });

    return wrapper;
  }

  /**
   * Clicks to one of the tunes
   * @param {string} tuneName - clicked tune name
   */
  tuneClicked(tuneName) {
    let button = this.buttons.find(el => el.dataset.tune === tuneName);
    button.classList.toggle(this.CSS.buttonActive, !button.classList.contains(this.CSS.buttonActive));
    this.onChange(tuneName);
  }
}