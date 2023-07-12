import { EventsCtrl } from '@walletconnect/modal-core'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-wallet-button')
export class WcmWalletButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public onClick: () => void = () => null

  @property() public name = ''

  @property() public walletId = ''

  @property() public label?: string = undefined

  @property() public imageId?: string = undefined

  @property({ type: Boolean }) public installed? = false

  @property({ type: Boolean }) public recent? = false

  // -- private ------------------------------------------------------ //
  private sublabelTemplate() {
    if (this.recent) {
      return html`
        <wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">RECENT</wcm-text>
      `
    } else if (this.installed) {
      return html`
        <wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</wcm-text>
      `
    }

    return null
  }

  private handleClick() {
    EventsCtrl.click({ name: 'WALLET_BUTTON', walletId: this.walletId })
    this.onClick()
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <button @click=${this.handleClick.bind(this)}>
        <div>
          <wcm-wallet-image
            walletId=${this.walletId}
            imageId=${ifDefined(this.imageId)}
          ></wcm-wallet-image>
          <wcm-text variant="xsmall-regular">
            ${this.label ?? UiUtil.getWalletName(this.name, true)}
          </wcm-text>

          ${this.sublabelTemplate()}
        </div>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-wallet-button': WcmWalletButton
  }
}
