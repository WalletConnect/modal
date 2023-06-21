import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CoreUtil, RouterCtrl } from 'packages/modal-core'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-platform-selection')
export class WcmPlatformSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property({ type: Boolean }) public isMobile = false
  @property({ type: Boolean }) public isDesktop = false
  @property({ type: Boolean }) public isWeb = false
  @property({ type: Boolean }) public isRetry = false

  // -- private ------------------------------------------------------ //
  private onMobile() {
    const isMobile = CoreUtil.isMobile()
    if (isMobile) {
      RouterCtrl.replace('MobileConnecting')
    } else {
      RouterCtrl.replace('MobileQrcodeConnecting')
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
    'wcm-platform-selection': WcmPlatformSelection
  }
}
