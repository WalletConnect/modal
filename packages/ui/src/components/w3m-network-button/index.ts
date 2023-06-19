import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-network-button')
export class W3mNetworkButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public onClick: () => void = () => null
  @property() public name = ''
  @property() public chainId = ''
  @property() public unsupported = false

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-unsupported': this.unsupported
    }

    return html`
      <button @click=${this.onClick} class=${classMap(classes)}>
        <wcm-network-image chainId=${this.chainId}></wcm-network-image>
        <wcm-text variant="xsmall-regular">${this.name}</wcm-text>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-network-button': W3mNetworkButton
  }
}
