import { ExplorerCtrl, RouterCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { DataUtil } from '../../utils/DataUtil'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-view-all-wallets-button')
export class WcmViewAllWalletsButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  private onClick() {
    RouterCtrl.push('WalletExplorer')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { recomendedWallets } = ExplorerCtrl.state
    const manualWallets = DataUtil.manualWallets()
    const reversedWallets = [...recomendedWallets, ...manualWallets].reverse().slice(0, 4)

    return html`
      <button @click=${this.onClick}>
        <div class="wcm-icons">
          ${reversedWallets.map(wallet => {
            const explorerImg = UiUtil.getWalletIcon(wallet)
            if (explorerImg) {
              return html`<img src=${explorerImg} />`
            }
            const src = UiUtil.getWalletIcon({ id: wallet.id })

            return src ? html`<img src=${src} />` : SvgUtil.WALLET_PLACEHOLDER
          })}
          ${[...Array(4 - reversedWallets.length)].map(() => SvgUtil.WALLET_PLACEHOLDER)}
        </div>
        <wcm-text variant="xsmall-regular">View All</wcm-text>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-view-all-wallets-button': WcmViewAllWalletsButton
  }
}
