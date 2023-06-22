import { ThemeCtrl } from '@walletconnect/modal-core'
import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeUtil } from '../utils/ThemeUtil'

@customElement('wcm-theme-context')
export class WcmThemeContext extends LitElement {
  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()

    // Set & Subscribe to theme state
    ThemeUtil.setTheme()
    this.unsubscribeTheme = ThemeCtrl.subscribe(ThemeUtil.setTheme)
  }

  public disconnectedCallback() {
    this.unsubscribeTheme?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeTheme?: () => void = undefined
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-theme-context': WcmThemeContext
  }
}
