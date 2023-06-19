import { EventsCtrl, ModalCtrl, OptionsCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-account-button')
export class W3mAccountButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    UiUtil.rejectStandaloneButtonComponent()
  }

  // -- state & properties ------------------------------------------- //
  @property() public balance?: 'hide' | 'show' = 'hide'
  @property() public avatar?: 'hide' | 'show' = 'show'

  private onOpen() {
    const { isStandalone } = OptionsCtrl.state
    if (!isStandalone) {
      EventsCtrl.click({ name: 'ACCOUNT_BUTTON' })
      ModalCtrl.open({ route: 'Account' })
    }
  }

  // -- private ------------------------------------------------------ //
  private accountTemplate() {
    const isAvatar = this.avatar === 'show'

    return html`
      ${isAvatar ? html`<wcm-avatar></wcm-avatar>` : null}
      <wcm-address-text></wcm-address-text>
    `
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const isBalance = this.balance === 'show'
    const isNoAvatar = this.avatar === 'hide'
    const classes = {
      'wcm-no-avatar': isNoAvatar
    }

    return isBalance
      ? html`
          <div>
            <wcm-balance></wcm-balance>
            <button @click=${this.onOpen} class=${classMap(classes)}>
              ${this.accountTemplate()}
            </button>
          </div>
        `
      : html`<wcm-button-big @click=${this.onOpen}>${this.accountTemplate()}</wcm-button-big>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-account-button': W3mAccountButton
  }
}
