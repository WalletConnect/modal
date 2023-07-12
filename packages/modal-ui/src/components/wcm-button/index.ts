import type { TemplateResult } from 'lit'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-button')
export class WcmButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property({ type: Boolean }) public disabled? = false

  @property() public iconLeft?: TemplateResult<2> = undefined

  @property() public iconRight?: TemplateResult<2> = undefined

  @property() public onClick: () => void = () => null

  @property() public variant: 'default' | 'ghost' | 'outline' = 'default'

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-icon-left': this.iconLeft !== undefined,
      'wcm-icon-right': this.iconRight !== undefined,
      'wcm-ghost': this.variant === 'ghost',
      'wcm-outline': this.variant === 'outline'
    }
    let textColor = 'inverse'
    if (this.variant === 'ghost') {
      textColor = 'secondary'
    }
    if (this.variant === 'outline') {
      textColor = 'accent'
    }

    return html`
      <button class=${classMap(classes)} ?disabled=${this.disabled} @click=${this.onClick}>
        ${this.iconLeft}
        <wcm-text variant="small-regular" color=${textColor}>
          <slot></slot>
        </wcm-text>
        ${this.iconRight}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-button': WcmButton
  }
}
