import { CoreUtil, OptionsCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-mobile-connecting-view')
export class WcmMobileConnectingView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() public isError = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.openMobileApp()
  }

  // -- private ------------------------------------------------------ //

  private onFormatAndRedirect(uri: string, forceUniversalUrl = false) {
    const { mobile, name } = CoreUtil.getWalletRouterData()
    const nativeUrl = mobile?.native
    const universalUrl = mobile?.universal

    if (nativeUrl && !forceUniversalUrl) {
      const href = CoreUtil.formatNativeUrl(nativeUrl, uri, name)
      CoreUtil.openHref(href, '_self')
    } else if (universalUrl) {
      const href = CoreUtil.formatUniversalUrl(universalUrl, uri, name)
      CoreUtil.openHref(href, '_self')
    }
  }

  private openMobileApp(forceUniversalUrl = false) {
    const { walletConnectUri } = OptionsCtrl.state
    const routerData = CoreUtil.getWalletRouterData()
    UiUtil.setRecentWallet(routerData)
    if (walletConnectUri) {
      this.onFormatAndRedirect(walletConnectUri, forceUniversalUrl)
    }
  }

  private onGoToAppStore(downloadUrl?: string) {
    if (downloadUrl) {
      CoreUtil.openHref(downloadUrl, '_blank')
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { name, id, image_id, app, mobile } = CoreUtil.getWalletRouterData()
    const { isWeb } = UiUtil.getCachedRouterWalletPlatforms()
    const downloadUrl = app?.ios
    const universalUrl = mobile?.universal

    return html`
      <wcm-modal-header title=${name}></wcm-modal-header>

      <wcm-modal-content>
        <wcm-connector-waiting
          walletId=${id}
          imageId=${ifDefined(image_id)}
          label="Tap 'Open' to continue…"
          .isError=${this.isError}
        ></wcm-connector-waiting>
      </wcm-modal-content>

      <wcm-info-footer class="wcm-note">
        <wcm-platform-selection .isWeb=${isWeb} .isRetry=${true}>
          <wcm-button .onClick=${() => this.openMobileApp(false)} .iconRight=${SvgUtil.RETRY_ICON}>
            Retry
          </wcm-button>
        </wcm-platform-selection>

        ${universalUrl
          ? html`
              <wcm-text color="secondary" variant="small-thin">
                Still doesn't work?
                <span tabindex="0" @click=${() => this.openMobileApp(true)}>
                  Try this alternate link
                </span>
              </wcm-text>
            `
          : null}
      </wcm-info-footer>

      <wcm-info-footer class="wcm-app-store">
        <div>
          <wcm-wallet-image walletId=${id} imageId=${ifDefined(image_id)}></wcm-wallet-image>
          <wcm-text>${`Get ${name}`}</wcm-text>
        </div>
        <wcm-button
          .iconRight=${SvgUtil.ARROW_RIGHT_ICON}
          .onClick=${() => this.onGoToAppStore(downloadUrl)}
          variant="ghost"
        >
          App Store
        </wcm-button>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-mobile-connecting-view': WcmMobileConnectingView
  }
}
