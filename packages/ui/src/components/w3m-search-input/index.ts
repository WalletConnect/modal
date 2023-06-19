import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-search-input')
export class W3mSearchInput extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  @property() public onChange = () => null

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <input type="text" @input=${this.onChange} placeholder="Search wallets" />
      ${SvgUtil.SEARCH_ICON}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-search-input': W3mSearchInput
  }
}
