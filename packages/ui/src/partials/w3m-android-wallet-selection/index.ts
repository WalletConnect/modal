import { CoreUtil, ExplorerCtrl, RouterCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { TemplateUtil } from '../../utils/TemplateUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-android-wallet-selection')
export class W3mAndroidWalletSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private onGoToQrcode() {
    RouterCtrl.push('Qrcode')
  }

  private onGetWallet() {
    RouterCtrl.push('GetWallet')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { recomendedWallets } = ExplorerCtrl.state
    const wallets = [...recomendedWallets, ...recomendedWallets]
    const external = TemplateUtil.externalWalletsTemplate()
    const injected = TemplateUtil.installedInjectedWalletsTemplate()
    const isOther = [...injected, ...external].length > 0
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

      ${isOther
        ? html`
            <wcm-modal-footer>
              <div class="wcm-title">
                ${SvgUtil.WALLET_ICON}
                <wcm-text variant="small-regular" color="accent">Other</wcm-text>
              </div>

              <div class="wcm-grid">${injected} ${external}</div>
            </wcm-modal-footer>
          `
        : null}

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          ${`Choose WalletConnect to see supported apps on your device${
            isOther ? ', or select from other options' : ''
          }`}
        </wcm-text>

        <wcm-button
          variant="outline"
          .iconRight=${SvgUtil.ARROW_UP_RIGHT_ICON}
          .onClick=${() => this.onGetWallet()}
          >I don't have a wallet</wcm-button
        >
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-android-wallet-selection': W3mAndroidWalletSelection
  }
}
