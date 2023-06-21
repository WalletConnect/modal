import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-spinner')
export class WcmSpinner extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <svg viewBox="0 0 50 50" width="24" height="24">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff" />
      </svg>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-spinner': WcmSpinner
  }
}
