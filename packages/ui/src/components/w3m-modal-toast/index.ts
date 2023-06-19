import { ToastCtrl } from '#core'
import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-toast')
export class W3mModalToast extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() public open = false

  public constructor() {
    super()
    this.unsubscribe = ToastCtrl.subscribe(newState => {
      if (newState.open) {
        this.open = true
        this.timeout = setTimeout(() => ToastCtrl.closeToast(), 2200)
      } else {
        this.open = false
        clearTimeout(this.timeout)
      }
    })
  }

  public disconnectedCallback() {
    this.unsubscribe?.()
    clearTimeout(this.timeout)
    ToastCtrl.closeToast()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribe?: () => void = undefined
  private timeout?: NodeJS.Timeout = undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    const { message, variant } = ToastCtrl.state
    const classes = {
      'wcm-success': variant === 'success',
      'wcm-error': variant === 'error'
    }

    return this.open
      ? html`
          <div class=${classMap(classes)}>
            ${variant === 'success' ? SvgUtil.CHECKMARK_ICON : null}
            ${variant === 'error' ? SvgUtil.CROSS_ICON : null}
            <wcm-text variant="small-regular">${message}</wcm-text>
          </div>
        `
      : null
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-toast': W3mModalToast
  }
}
