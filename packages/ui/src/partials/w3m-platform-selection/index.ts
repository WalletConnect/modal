import { CoreUtil, OptionsCtrl, RouterCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-platform-selection')
export class W3mPlatformSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public isMobile = false
  @property() public isInjected = false
  @property() public isInjectedInstalled = false
  @property() public isDesktop = false
  @property() public isWeb = false
  @property() public isRetry = false

  // -- private ------------------------------------------------------ //
  private onMobile() {
    const isMobile = CoreUtil.isMobile()
    if (isMobile) {
      RouterCtrl.replace('MobileConnecting')
    } else {
      RouterCtrl.replace('MobileQrcodeConnecting')
    }
  }

  private onInjected() {
    if (this.isInjectedInstalled) {
      RouterCtrl.replace('InjectedConnecting')
    } else {
      RouterCtrl.replace('InstallWallet')
    }
  }

  private onDesktop() {
    RouterCtrl.replace('DesktopConnecting')
  }

  private onWeb() {
    RouterCtrl.replace('WebConnecting')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { isStandalone } = OptionsCtrl.state

    return html`
      <div>
        ${this.isRetry ? html`<slot></slot>` : null}
        ${this.isMobile
          ? html`<wcm-button
              .onClick=${this.onMobile}
              .iconLeft=${SvgUtil.MOBILE_ICON}
              variant="outline"
            >
              Mobile
            </wcm-button>`
          : null}
        ${this.isInjected && !isStandalone
          ? html`<wcm-button
              .onClick=${this.onInjected}
              .iconLeft=${SvgUtil.WALLET_ICON}
              variant="outline"
            >
              Browser
            </wcm-button>`
          : null}
        ${this.isDesktop
          ? html`<wcm-button
              .onClick=${this.onDesktop}
              .iconLeft=${SvgUtil.DESKTOP_ICON}
              variant="outline"
            >
              Desktop
            </wcm-button>`
          : null}
        ${this.isWeb
          ? html`<wcm-button
              .onClick=${this.onWeb}
              .iconLeft=${SvgUtil.GLOBE_ICON}
              variant="outline"
            >
              Web
            </wcm-button>`
          : null}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-platform-selection': W3mPlatformSelection
  }
}
