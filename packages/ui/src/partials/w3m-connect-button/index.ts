import { AccountCtrl, ClientCtrl, EventsCtrl, ModalCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-connect-button')
export class W3mConnectButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() public loading = false
  @property() public label? = 'Connect Wallet'
  @property() public icon?: 'hide' | 'show' = 'show'

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    UiUtil.rejectStandaloneButtonComponent()
    this.modalUnsub = ModalCtrl.subscribe(modalState => {
      if (modalState.open) {
        this.loading = true
      }
      if (!modalState.open) {
        this.loading = false
      }
    })
  }

  public disconnectedCallback() {
    this.modalUnsub?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly modalUnsub?: () => void = undefined

  private iconTemplate() {
    return this.icon === 'show' ? SvgUtil.WALLET_CONNECT_ICON : null
  }

  private onClick() {
    if (AccountCtrl.state.isConnected) {
      this.onDisconnect()
    } else {
      this.onConnect()
    }
  }

  private async onConnect() {
    this.loading = true
    EventsCtrl.click({ name: 'CONNECT_BUTTON' })
    await ModalCtrl.open()
    if (!ModalCtrl.state.open) {
      this.loading = false
    }
  }

  private async onDisconnect() {
    EventsCtrl.click({ name: 'DISCONNECT_BUTTON' })
    await ClientCtrl.client().disconnect()
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <wcm-button-big .disabled=${this.loading} @click=${this.onClick}>
        ${this.loading
          ? html`
              <wcm-spinner></wcm-spinner>
              <wcm-text variant="medium-regular" color="accent">Connecting...</wcm-text>
            `
          : html`
              ${this.iconTemplate()}
              <wcm-text variant="medium-regular" color="inverse">${this.label}</wcm-text>
            `}
      </wcm-button-big>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-connect-button': W3mConnectButton
  }
}
