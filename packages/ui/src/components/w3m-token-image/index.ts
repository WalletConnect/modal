import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-token-image')
export class W3mTokenImage extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public symbol?: string = undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    const src = UiUtil.getTokenIcon(this.symbol ?? '')

    return src
      ? html`
          <div>
            <img src=${src} alt=${this.id} />
          </div>
        `
      : SvgUtil.TOKEN_PLACEHOLDER
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-token-image': W3mTokenImage
  }
}
