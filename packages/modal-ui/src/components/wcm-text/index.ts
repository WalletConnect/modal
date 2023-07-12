import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

type Variant =
  | 'big-bold'
  | 'medium-regular'
  | 'small-regular'
  | 'small-thin'
  | 'xsmall-bold'
  | 'xsmall-regular'

type Color = 'accent' | 'error' | 'inverse' | 'primary' | 'secondary' | 'tertiary'

@customElement('wcm-text')
export class WcmText extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public variant?: Variant = 'medium-regular'

  @property() public color?: Color | string = 'primary'

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-big-bold': this.variant === 'big-bold',
      'wcm-medium-regular': this.variant === 'medium-regular',
      'wcm-small-regular': this.variant === 'small-regular',
      'wcm-small-thin': this.variant === 'small-thin',
      'wcm-xsmall-regular': this.variant === 'xsmall-regular',
      'wcm-xsmall-bold': this.variant === 'xsmall-bold',
      'wcm-color-primary': this.color === 'primary',
      'wcm-color-secondary': this.color === 'secondary',
      'wcm-color-tertiary': this.color === 'tertiary',
      'wcm-color-inverse': this.color === 'inverse',
      'wcm-color-accnt': this.color === 'accent',
      'wcm-color-error': this.color === 'error'
    }

    return html`
      <span>
        <slot class=${classMap(classes)}></slot>
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-text': WcmText
  }
}
