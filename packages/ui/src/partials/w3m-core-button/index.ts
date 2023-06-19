import { AccountCtrl, ConfigCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { UiUtil } from '../../utils/UiUtil'

@customElement('wcm-core-button')
export class W3mCoreButton extends LitElement {
  // -- state & properties ------------------------------------------- //
  @state() public isConnected = false
  @property() public label? = 'Connect Wallet'
  @property() public icon?: 'hide' | 'show' = 'show'
  @property() public avatar?: 'hide' | 'show' = 'show'
  @property() public balance?: 'hide' | 'show' = 'hide'

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    UiUtil.rejectStandaloneButtonComponent()
    this.isConnected = AccountCtrl.state.isConnected
    this.unsubscribeAccount = AccountCtrl.subscribe(({ isConnected }) => {
      this.isConnected = isConnected
    })
  }

  public disconnectedCallback() {
    this.unsubscribeAccount?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeAccount?: () => void = undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    const { enableAccountView } = ConfigCtrl.state
    const isBalance = this.balance
    const isLabel = this.label
    const isIcon = this.icon
    const isAvatar = this.avatar

    return this.isConnected && enableAccountView
      ? html`<wcm-account-button balance=${isBalance} avatar=${isAvatar}></wcm-account-button>`
      : html`
          <wcm-connect-button label=${this.isConnected ? 'Disconnect' : isLabel} icon=${isIcon}>
          </wcm-connect-button>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-core-button': W3mCoreButton
  }
}
