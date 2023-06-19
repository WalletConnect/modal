import { ConfigCtrl, OptionsCtrl, RouterCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { TemplateUtil } from '../../utils/TemplateUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-mobile-wallet-selection')
export class W3mMobileWalletSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private onQrcode() {
    RouterCtrl.push('Qrcode')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { isStandalone } = OptionsCtrl.state
    const { explorerExcludedWalletIds, enableExplorer } = ConfigCtrl.state
    const isExplorerWallets = explorerExcludedWalletIds !== 'ALL' && enableExplorer
    const manualTemplate = TemplateUtil.manualWalletsTemplate()
    const recomendedTemplate = TemplateUtil.recomendedWalletsTemplate()
    const externalTemplate = TemplateUtil.externalWalletsTemplate()
    const recentTemplate = TemplateUtil.recentWalletTemplate()
    const injectedWallets = TemplateUtil.installedInjectedWalletsTemplate()

    let templates = [recentTemplate, ...manualTemplate, ...recomendedTemplate]
    if (!isStandalone) {
      templates = [
        ...injectedWallets,
        recentTemplate,
        ...externalTemplate,
        ...manualTemplate,
        ...recomendedTemplate
      ]
    }
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
    'wcm-mobile-wallet-selection': W3mMobileWalletSelection
  }
}
