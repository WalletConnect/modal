import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { CoreUtil } from 'packages/modal-core'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-mobile-qr-connecting-view')
export class WcmMobileQrConnectingView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    const { name, id, image_id } = CoreUtil.getWalletRouterData()
    const { isDesktop, isWeb } = UiUtil.getCachedRouterWalletPlatforms()

    return html`
      <wcm-modal-header
        title=${name}
        .onAction=${UiUtil.handleUriCopy}
        .actionIcon=${SvgUtil.COPY_ICON}
      ></wcm-modal-header>

      <wcm-modal-content>
        <wcm-walletconnect-qr walletId=${id} imageId=${ifDefined(image_id)}></wcm-walletconnect-qr>
      </wcm-modal-content>

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          ${`Scan this QR Code with your phone's camera or inside ${name} app`}
        </wcm-text>

        <wcm-platform-selection .isDesktop=${isDesktop} .isWeb=${isWeb}> </wcm-platform-selection>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-mobile-qr-connecting-view': WcmMobileQrConnectingView
  }
}
