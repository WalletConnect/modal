import { OptionsCtrl, WcConnectionCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
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
      const { pairingUri } = WcConnectionCtrl.state
      const { standaloneUri } = OptionsCtrl.state
      this.uri = standaloneUri ?? pairingUri
    }, 0)
    this.unwatchWcConnection = WcConnectionCtrl.subscribe(connection => {
      if (connection.pairingUri) {
        this.uri = connection.pairingUri
      }
    })
  }

  public disconnectedCallback() {
    this.unwatchWcConnection?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unwatchWcConnection?: () => void = undefined

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
              walletId=${this.walletId}
              imageId=${this.imageId}
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
