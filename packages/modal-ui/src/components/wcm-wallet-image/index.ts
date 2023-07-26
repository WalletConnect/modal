import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-wallet-image')
export class WcmWalletImage extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public walletId = ''

  @property() public imageId?: string = undefined

  @property() public imageUrl?: string = undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    const src = this.imageUrl?.length
      ? this.imageUrl
      : UiUtil.getWalletIcon({ id: this.walletId, image_id: this.imageId })

    return html`
      ${src.length
        ? html`
            <div>
              <img crossorigin="anonymous" src=${src} alt=${this.id} />
            </div>
          `
        : SvgUtil.WALLET_PLACEHOLDER}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-wallet-image': WcmWalletImage
  }
}
