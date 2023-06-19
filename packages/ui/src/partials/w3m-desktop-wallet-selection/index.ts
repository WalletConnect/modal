import { ConfigCtrl, OptionsCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { TemplateUtil } from '../../utils/TemplateUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-desktop-wallet-selection')
export class W3mDesktopWalletSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

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

    const isViewAll = templates.length > 4 || isExplorerWallets
    let wallets = []
    if (isViewAll) {
      wallets = templates.slice(0, 3)
    } else {
      wallets = templates
    }
    const isWallets = Boolean(wallets.length)

    return html`
      <wcm-modal-header
        .border=${true}
        title="Connect your wallet"
        .onAction=${UiUtil.handleUriCopy}
        .actionIcon=${SvgUtil.COPY_ICON}
      ></wcm-modal-header>

      <wcm-modal-content>
        <div class="wcm-mobile-title">
          <div class="wcm-subtitle">
            ${SvgUtil.MOBILE_ICON}
            <wcm-text variant="small-regular" color="accent">Mobile</wcm-text>
          </div>

          <div class="wcm-subtitle">
            ${SvgUtil.SCAN_ICON}
            <wcm-text variant="small-regular" color="secondary">Scan with your wallet</wcm-text>
          </div>
        </div>
        <wcm-walletconnect-qr></wcm-walletconnect-qr>
      </wcm-modal-content>

      ${isWallets
        ? html`
            <wcm-modal-footer>
              <div class="wcm-desktop-title">
                ${SvgUtil.DESKTOP_ICON}
                <wcm-text variant="small-regular" color="accent">Desktop</wcm-text>
              </div>

              <div class="wcm-grid">
                ${wallets}
                ${isViewAll
                  ? html`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>`
                  : null}
              </div>
            </wcm-modal-footer>
          `
        : null}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-desktop-wallet-selection': W3mDesktopWalletSelection
  }
}
