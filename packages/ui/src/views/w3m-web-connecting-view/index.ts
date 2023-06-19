import { CoreUtil, OptionsCtrl, WcConnectionCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-web-connecting-view')
export class W3mWebConnectingView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() public isError = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.openWebWallet()
    this.unwatchConnection = WcConnectionCtrl.subscribe(connection => {
      this.isError = connection.pairingError
    })
  }

  public disconnectedCallback() {
    this.unwatchConnection?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unwatchConnection?: () => void = undefined

  private onFormatAndRedirect(uri: string) {
    const { desktop, name } = CoreUtil.getWalletRouterData()
    const universalUrl = desktop?.universal

    if (universalUrl) {
      const href = CoreUtil.formatUniversalUrl(universalUrl, uri, name)
      CoreUtil.openHref(href, '_blank')
    }
  }

  private openWebWallet() {
    WcConnectionCtrl.setPairingError(false)
    const { standaloneUri } = OptionsCtrl.state
    const { pairingUri } = WcConnectionCtrl.state
    const routerData = CoreUtil.getWalletRouterData()
    UiUtil.setRecentWallet(routerData)
    if (standaloneUri) {
      this.onFormatAndRedirect(standaloneUri)
    } else {
      this.onFormatAndRedirect(pairingUri)
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { name, id, image_id } = CoreUtil.getWalletRouterData()
    const { isMobile, isInjected, isDesktop } = UiUtil.getCachedRouterWalletPlatforms()
    const isMobilePlatform = CoreUtil.isMobile()

    return html`
      <wcm-modal-header
        title=${name}
        .onAction=${UiUtil.handleUriCopy}
        .actionIcon=${SvgUtil.COPY_ICON}
      ></wcm-modal-header>

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
          ${`${name} web app has opened in a new tab. Go there, accept the connection, and come back`}
        </wcm-text>

        <wcm-platform-selection
          .isMobile=${isMobile}
          .isInjected=${isMobilePlatform ? false : isInjected}
          .isDesktop=${isMobilePlatform ? false : isDesktop}
          .isRetry=${true}
        >
          <wcm-button .onClick=${this.openWebWallet.bind(this)} .iconRight=${SvgUtil.RETRY_ICON}>
            Retry
          </wcm-button>
        </wcm-platform-selection>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-web-connecting-view': W3mWebConnectingView
  }
}
