import { OptionsCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-walletconnect-qr')
export class WcmWalletConnectQr extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public walletId? = ''

  @property() public imageId? = ''

  @state() private uri? = ''

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    setTimeout(() => {
      const { walletConnectUri } = OptionsCtrl.state
      this.uri = walletConnectUri
    }, 0)
  }

  // -- private ------------------------------------------------------ //

  private get overlayEl(): HTMLDivElement {
    return UiUtil.getShadowRootElement(this, '.wcm-qr-container') as HTMLDivElement
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="wcm-qr-container">
        ${this.uri
          ? html`<wcm-qrcode
              size="${this.overlayEl.offsetWidth}"
              uri=${this.uri}
              walletId=${ifDefined(this.walletId)}
              imageId=${ifDefined(this.imageId)}
            ></wcm-qrcode>`
          : html`<wcm-spinner></wcm-spinner>`}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-walletconnect-qr': WcmWalletConnectQr
  }
}
