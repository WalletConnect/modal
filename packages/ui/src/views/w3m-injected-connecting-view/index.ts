import { ClientCtrl, CoreUtil } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-injected-connecting-view')
export class W3mInjectedConnectingView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() private isError = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.openInjectedApp()
  }

  // -- private ------------------------------------------------------ //
  private readonly connector = ClientCtrl.client().getConnectorById('injected')

  private async openInjectedApp() {
    const { ready } = this.connector
    if (ready) {
      this.isError = false
      await UiUtil.handleConnectorConnection('injected', () => {
        this.isError = true
      })
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { name, id, image_id } = CoreUtil.getWalletRouterData()
    const { isMobile, isDesktop, isWeb } = UiUtil.getCachedRouterWalletPlatforms()

    return html`
      <wcm-modal-header title=${name}></wcm-modal-header>

      <wcm-modal-content>
        <wcm-connector-waiting
          walletId=${id}
          imageId=${image_id}
          label=${`Continue in ${name}...`}
          .isError=${this.isError}
        ></wcm-connector-waiting>
      </wcm-modal-content>

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          Connection can be declined if multiple wallets are installed or previous request is still
          active
        </wcm-text>

        <wcm-platform-selection
          .isMobile=${isMobile}
          .isDesktop=${isDesktop}
          .isWeb=${isWeb}
          .isRetry=${true}
        >
          <wcm-button
            .onClick=${this.openInjectedApp.bind(this)}
            .disabled=${!this.isError}
            .iconRight=${SvgUtil.RETRY_ICON}
          >
            Retry
          </wcm-button>
        </wcm-platform-selection>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-injected-connecting-view': W3mInjectedConnectingView
  }
}
