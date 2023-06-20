import { ConfigCtrl, CoreUtil, RouterCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-help-view')
export class WcmHelpView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private readonly learnUrl = 'https://ethereum.org/en/wallets/'

  private onGet() {
    if (ConfigCtrl.state.enableExplorer) {
      RouterCtrl.push('GetWallet')
    } else {
      UiUtil.openWalletExplorerUrl()
    }
  }

  private onLearnMore() {
    CoreUtil.openHref(this.learnUrl, '_blank')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <wcm-modal-header title="What is a wallet?"></wcm-modal-header>
      <wcm-modal-content>
        <div class="wcm-info-container">
          <div class="wcm-images">
            ${SvgUtil.HELP_CHART_IMG} ${SvgUtil.HELP_PAINTING_IMG} ${SvgUtil.HELP_ETH_IMG}
          </div>
          <wcm-text variant="medium-regular">A home for your digital assets</wcm-text>
          <wcm-text variant="small-thin" color="secondary" class="wcm-info-text">
            A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs.
          </wcm-text>
        </div>

        <div class="wcm-info-container">
          <div class="wcm-images">
            ${SvgUtil.HELP_KEY_IMG} ${SvgUtil.HELP_USER_IMG} ${SvgUtil.HELP_LOCK_IMG}
          </div>
          <wcm-text variant="medium-regular">One login for all of web3</wcm-text>
          <wcm-text variant="small-thin" color="secondary" class="wcm-info-text">
            Log in to any app by connecting your wallet. Say goodbye to countless passwords!
          </wcm-text>
        </div>

        <div class="wcm-info-container">
          <div class="wcm-images">
            ${SvgUtil.HELP_COMPAS_IMG} ${SvgUtil.HELP_NOUN_IMG} ${SvgUtil.HELP_DAO_IMG}
          </div>
          <wcm-text variant="medium-regular">Your gateway to a new web</wcm-text>
          <wcm-text variant="small-thin" color="secondary" class="wcm-info-text">
            With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more.
          </wcm-text>
        </div>

        <div class="wcm-footer-actions">
          <wcm-button .onClick=${this.onGet.bind(this)} .iconLeft=${SvgUtil.WALLET_ICON}>
            Get a Wallet
          </wcm-button>
          <wcm-button
            .onClick=${this.onLearnMore.bind(this)}
            .iconRight=${SvgUtil.ARROW_UP_RIGHT_ICON}
          >
            Learn More
          </wcm-button>
        </div>
      </wcm-modal-content>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-help-view': WcmHelpView
  }
}
