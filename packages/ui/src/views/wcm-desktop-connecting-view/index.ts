import { CoreUtil, OptionsCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-desktop-connecting-view')
export class WcmDesktopConnectingView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() public isError = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.openDesktopApp()
  }

  // -- private ------------------------------------------------------ //

  private onFormatAndRedirect(uri: string) {
    const { desktop, name } = CoreUtil.getWalletRouterData()
    const nativeUrl = desktop?.native

    if (nativeUrl) {
      const href = CoreUtil.formatNativeUrl(nativeUrl, uri, name)
      CoreUtil.openHref(href, '_self')
    }
  }

  private openDesktopApp() {
    const { walletConnectUri } = OptionsCtrl.state
    const routerData = CoreUtil.getWalletRouterData()
    UiUtil.setRecentWallet(routerData)
    if (walletConnectUri) {
      this.onFormatAndRedirect(walletConnectUri)
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { name, id, image_id } = CoreUtil.getWalletRouterData()
    const { isMobile, isWeb } = UiUtil.getCachedRouterWalletPlatforms()

    return html`
      <wcm-modal-header
        title=${name}
        .onAction=${UiUtil.handleUriCopy}
        .actionIcon=${SvgUtil.COPY_ICON}
      ></wcm-modal-header>

      <wcm-modal-content>
        <wcm-connector-waiting
          walletId=${id}
          imageId=${ifDefined(image_id)}
          label=${`Continue in ${name}...`}
          .isError=${this.isError}
        ></wcm-connector-waiting>
      </wcm-modal-content>

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          ${`Connection can continue loading if ${name} is not installed on your device`}
        </wcm-text>

        <wcm-platform-selection .isMobile=${isMobile} .isWeb=${isWeb} .isRetry=${true}>
          <wcm-button .onClick=${this.openDesktopApp.bind(this)} .iconRight=${SvgUtil.RETRY_ICON}>
            Retry
          </wcm-button>
        </wcm-platform-selection>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-desktop-connecting-view': WcmDesktopConnectingView
  }
}
