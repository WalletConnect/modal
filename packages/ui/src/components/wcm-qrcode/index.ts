import { ThemeCtrl } from '#core'
import { html, LitElement, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined'
import { QrCodeUtil } from '../../utils/QrCode'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-qrcode')
export class WcmQrCode extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public uri = ''
  @property({ type: Number }) public size = 0
  @property() public imageId?: string = undefined
  @property() public walletId?: string = undefined
  @property() public imageUrl?: string = undefined

  // -- private ------------------------------------------------------ //
  private svgTemplate() {
    const isLightMode = ThemeCtrl.state.themeMode === 'light'
    const size = isLightMode ? this.size : this.size - 18 * 2

    return svg`
      <svg height=${size} width=${size}>
        ${QrCodeUtil.generate(this.uri, size, size / 4)}
      </svg>
    `
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-dark': ThemeCtrl.state.themeMode === 'dark'
    }

    return html`
      <div style=${`width: ${this.size}px`} class=${classMap(classes)}>
        ${this.walletId || this.imageUrl
          ? html`
              <wcm-wallet-image
                walletId=${ifDefined(this.walletId)}
                imageId=${ifDefined(this.imageId)}
                imageUrl=${ifDefined(this.imageUrl)}
              ></wcm-wallet-image>
            `
          : SvgUtil.WALLET_CONNECT_ICON_COLORED}
        ${this.svgTemplate()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-qrcode': WcmQrCode
  }
}
