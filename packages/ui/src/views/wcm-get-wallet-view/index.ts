import { CoreUtil, ExplorerCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { DataUtil } from '../../utils/DataUtil'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-get-wallet-view')
export class WcmGetWalletView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private onGet(url: string) {
    CoreUtil.openHref(url, '_blank')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const recomendedWallets = ExplorerCtrl.state.recomendedWallets.slice(0, 5)
    const manualWallets = DataUtil.manualWallets().slice(0, 5)
    const isRecomendedWallets = recomendedWallets.length
    const isCustomWallets = manualWallets.length

    return html`
      <wcm-modal-header title="Get a wallet"></wcm-modal-header>
      <wcm-modal-content>
        ${isRecomendedWallets
          ? recomendedWallets.map(
              wallet =>
                html`
                  <div class="wcm-wallet-item">
                    <wcm-wallet-image walletId=${wallet.id} imageId=${wallet.image_id}>
                    </wcm-wallet-image>
                    <div class="wcm-wallet-content">
                      <wcm-text variant="medium-regular">${wallet.name}</wcm-text>
                      <wcm-button
                        .iconRight=${SvgUtil.ARROW_RIGHT_ICON}
                        .onClick=${() => this.onGet(wallet.homepage)}
                      >
                        Get
                      </wcm-button>
                    </div>
                  </div>
                `
            )
          : null}
        ${isCustomWallets
          ? manualWallets.map(
              wallet =>
                html`
                  <div class="wcm-wallet-item">
                    <wcm-wallet-image walletId=${wallet.id}></wcm-wallet-image>
                    <div class="wcm-wallet-content">
                      <wcm-text variant="medium-regular">${wallet.name}</wcm-text>
                      <wcm-button
                        .iconRight=${SvgUtil.ARROW_RIGHT_ICON}
                        .onClick=${() => this.onGet(wallet.links.universal)}
                      >
                        Get
                      </wcm-button>
                    </div>
                  </div>
                `
            )
          : null}
      </wcm-modal-content>

      <div class="wcm-footer-actions">
        <wcm-text variant="medium-regular">Not what you're looking for?</wcm-text>
        <wcm-text variant="small-thin" color="secondary" class="wcm-info-text">
          With hundreds of wallets out there, there's something for everyone
        </wcm-text>
        <wcm-button
          .onClick=${UiUtil.openWalletExplorerUrl}
          .iconRight=${SvgUtil.ARROW_UP_RIGHT_ICON}
        >
          Explore Wallets
        </wcm-button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-get-wallet-view': WcmGetWalletView
  }
}
