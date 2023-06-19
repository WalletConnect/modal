import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-footer')
export class W3mModalFooter extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <footer>
        <slot></slot>
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-footer': W3mModalFooter
  }
}
