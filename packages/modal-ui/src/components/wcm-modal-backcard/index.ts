import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ModalCtrl, ThemeCtrl } from 'packages/modal-core'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-backcard')
export class WcmModalBackcard extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
  }

  // -- private ------------------------------------------------------ //

  private logoTemplate() {
    const customSrc = ThemeCtrl.state.themeVariables?.['--wcm-logo-image-url']

    if (customSrc) {
      return html`<img src=${customSrc} />`
    }

    return SvgUtil.WALLET_CONNECT_LOGO
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="wcm-toolbar-placeholder"></div>
      <div class="wcm-toolbar">
        ${this.logoTemplate()}
        <div>
          <button @click=${ModalCtrl.close}>${SvgUtil.CROSS_ICON}</button>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-backcard': WcmModalBackcard
  }
}
