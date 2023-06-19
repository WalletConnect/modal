import { AccountCtrl, ClientCtrl, ToastCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-account-view')
export class W3mAccountView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private async onDisconnect() {
    await ClientCtrl.client().disconnect()
  }

  private async onCopyAddress() {
    await navigator.clipboard.writeText(AccountCtrl.state.address ?? '')
    ToastCtrl.openToast('Address copied', 'success')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <wcm-modal-content>
        <div class="wcm-profile">
          <div class="wcm-info">
            <wcm-avatar size="medium"></wcm-avatar>
            <wcm-address-text variant="modal"></wcm-address-text>
          </div>
          <div class="wcm-connection-badge">
            <wcm-text variant="small-regular" color="secondary">Connected</wcm-text>
          </div>
        </div>
      </wcm-modal-content>

      <div class="wcm-balance">
        <wcm-balance></wcm-balance>
      </div>

      <wcm-modal-footer>
        <div class="wcm-footer">
          <wcm-account-network-button></wcm-account-network-button>

          <wcm-box-button
            label="Copy Address"
            .onClick=${this.onCopyAddress}
            .icon=${SvgUtil.ACCOUNT_COPY}
          ></wcm-box-button>

          <wcm-box-button
            label="Disconnect"
            .onClick=${this.onDisconnect}
            .icon=${SvgUtil.ACCOUNT_DISCONNECT}
          ></wcm-box-button>
        </div>
      </wcm-modal-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-account-view': W3mAccountView
  }
}
