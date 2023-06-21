import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ModalCtrl } from 'packages/modal-core'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-backcard')
export class WcmModalBackcard extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="wcm-toolbar-placeholder"></div>
      <div class="wcm-toolbar">
        ${SvgUtil.WALLET_CONNECT_LOGO}
        <button @click=${ModalCtrl.close}>${SvgUtil.CROSS_ICON}</button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-backcard': WcmModalBackcard
  }
}
