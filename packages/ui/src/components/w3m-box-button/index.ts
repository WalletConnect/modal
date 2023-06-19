import type { TemplateResult } from 'lit'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-box-button')
export class W3mBoxButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public icon?: TemplateResult<2> = undefined
  @property() public label = ''
  @property() public onClick: () => void = () => null

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <button @click=${this.onClick}>
        <div>${this.icon}</div>
        <wcm-text variant="xsmall-regular" color="accent">${this.label}</wcm-text>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-box-button': W3mBoxButton
  }
}
