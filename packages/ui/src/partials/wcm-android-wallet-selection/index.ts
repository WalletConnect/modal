import { CoreUtil, ExplorerCtrl, RouterCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-android-wallet-selection')
export class WcmAndroidWalletSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private onGoToQrcode() {
    RouterCtrl.push('Qrcode')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { recomendedWallets } = ExplorerCtrl.state
    const wallets = [...recomendedWallets, ...recomendedWallets]
    const recomendedCount = CoreUtil.RECOMMENDED_WALLET_AMOUNT * 2

    return html`
      <wcm-modal-header
        title="Connect your wallet"
        .onAction=${this.onGoToQrcode}
        .actionIcon=${SvgUtil.QRCODE_ICON}
      ></wcm-modal-header>

      <wcm-modal-content>
        <div class="wcm-title">
          ${SvgUtil.MOBILE_ICON}
          <wcm-text variant="small-regular" color="accent">WalletConnect</wcm-text>
        </div>

        <div class="wcm-slider">
          <div class="wcm-track">
            ${[...Array(recomendedCount)].map((_, index) => {
              const wallet = wallets[index % wallets.length]

              return wallet
                ? html`<wcm-wallet-image
                    walletId=${wallet.id}
                    imageId=${wallet.image_id}
                  ></wcm-wallet-image>`
                : SvgUtil.WALLET_PLACEHOLDER
            })}
          </div>
          <wcm-button-big @click=${UiUtil.handleAndroidLinking}>
            <wcm-text variant="medium-regular" color="inverse">Select Wallet</wcm-text>
          </wcm-button-big>
        </div>
      </wcm-modal-content>

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          Choose WalletConnect to see supported apps on your device
        </wcm-text>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-android-wallet-selection': WcmAndroidWalletSelection
  }
}
