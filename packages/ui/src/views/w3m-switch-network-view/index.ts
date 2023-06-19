import { ClientCtrl, CoreUtil, OptionsCtrl, RouterCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-switch-network-view')
export class W3mSwitchNetworkView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties -------------------------------------------- //
  @state() private isError = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.onSwitchNetwork()
  }

  // -- private ------------------------------------------------------ //

  private async onSwitchNetwork() {
    try {
      this.isError = false
      const chain = CoreUtil.getSwitchNetworkRouterData()
      await ClientCtrl.client().switchNetwork({ chainId: chain.id })
      OptionsCtrl.setSelectedChain(chain)
      RouterCtrl.reset('Account')
    } catch {
      this.isError = true
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { id, name } = CoreUtil.getSwitchNetworkRouterData()

    return html`
      <wcm-modal-header title=${`Connect to ${name}`}></wcm-modal-header>

      <wcm-modal-content>
        <wcm-network-waiting chainId=${id} label="Approve in your wallet" .isError=${this.isError}>
        </wcm-network-waiting>
      </wcm-modal-content>

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          Switch can be declined if chain is not supported by a wallet or previous request is still
          active
        </wcm-text>

        <wcm-button
          .onClick=${this.onSwitchNetwork.bind(this)}
          .disabled=${!this.isError}
          .iconRight=${SvgUtil.RETRY_ICON}
        >
          Try Again
        </wcm-button>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-switch-network-view': W3mSwitchNetworkView
  }
}
