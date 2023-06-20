import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-content')
export class WcmModalContent extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <main>
        <slot></slot>
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-content': WcmModalContent
  }
}
