import { ConfigCtrl, RouterCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { TemplateUtil } from '../../utils/TemplateUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-mobile-wallet-selection')
export class WcmMobileWalletSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private onQrcode() {
    RouterCtrl.push('Qrcode')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { explorerExcludedWalletIds, enableExplorer } = ConfigCtrl.state
    const isExplorerWallets = explorerExcludedWalletIds !== 'ALL' && enableExplorer
    const manualTemplate = TemplateUtil.manualWalletsTemplate()
    const recomendedTemplate = TemplateUtil.recomendedWalletsTemplate()
    const recentTemplate = TemplateUtil.recentWalletTemplate()
    let templates = [recentTemplate, ...manualTemplate, ...recomendedTemplate]
    templates = templates.filter(Boolean)

    const isViewAll = templates.length > 8 || isExplorerWallets
    let wallets = []
    if (isViewAll) {
      wallets = templates.slice(0, 7)
    } else {
      wallets = templates
    }

    const isWallets = Boolean(wallets.length)

    return html`
      <wcm-modal-header
        title="Connect your wallet"
        .onAction=${this.onQrcode}
        .actionIcon=${SvgUtil.QRCODE_ICON}
      ></wcm-modal-header>

      ${isWallets
        ? html`
            <wcm-modal-content>
              <div>
                ${wallets}
                ${isViewAll
                  ? html`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>`
                  : null}
              </div>
            </wcm-modal-content>
          `
        : null}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-mobile-wallet-selection': WcmMobileWalletSelection
  }
}
