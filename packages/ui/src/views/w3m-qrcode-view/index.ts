import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'

@customElement('wcm-qrcode-view')
export class W3mQrcodeView extends LitElement {
  public static styles = [ThemeUtil.globalCss]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <wcm-modal-header
        title="Scan the code"
        .onAction=${UiUtil.handleUriCopy}
        .actionIcon=${SvgUtil.COPY_ICON}
      ></wcm-modal-header>

      <wcm-modal-content>
        <wcm-walletconnect-qr></wcm-walletconnect-qr>
      </wcm-modal-content>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-qrcode-view': W3mQrcodeView
  }
}
