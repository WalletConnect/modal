import { CoreUtil } from '@walletconnect/modal-core'
import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'

@customElement('wcm-connect-wallet-view')
export class WcmConnectWalletView extends LitElement {
  public static styles = [ThemeUtil.globalCss]

  // -- private ------------------------------------------------------ //
  private viewTemplate() {
    if (CoreUtil.isAndroid()) {
      return html`<wcm-android-wallet-selection></wcm-android-wallet-selection>`
    }

    if (CoreUtil.isMobile()) {
      return html`<wcm-mobile-wallet-selection></wcm-mobile-wallet-selection>`
    }

    return html`<wcm-desktop-wallet-selection></wcm-desktop-wallet-selection>`
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      ${this.viewTemplate()}
      <wcm-legal-notice></wcm-legal-notice>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-connect-wallet-view': WcmConnectWalletView
  }
}
