import { AccountCtrl } from '#core'
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-address-text')
export class W3mAddressText extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() private address?: string = undefined
  @state() private name?: string | null = undefined
  @state() private loading = true
  @property() public variant?: 'button' | 'modal' = 'button'

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.address = AccountCtrl.state.address
    this.name = AccountCtrl.state.profileName
    this.loading = Boolean(AccountCtrl.state.profileLoading)
    this.unsubscribeAccount = AccountCtrl.subscribe(({ address, profileName, profileLoading }) => {
      this.address = address
      this.name = profileName
      this.loading = Boolean(profileLoading)
    })
  }

  public disconnectedCallback() {
    this.unsubscribeAccount?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeAccount?: () => void = undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    const isButton = this.variant === 'button'
    const classes = {
      'wcm-loading': this.loading
    }

    return html`
      <wcm-text
        class=${classMap(classes)}
        variant=${isButton ? 'medium-regular' : 'big-bold'}
        color=${isButton ? 'inverse' : 'primary'}
      >
        ${this.name ? this.name : UiUtil.truncate(this.address ?? '')}
      </wcm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-address-text': W3mAddressText
  }
}
