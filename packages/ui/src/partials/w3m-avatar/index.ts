import { AccountCtrl } from '#core'
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-avatar')
export class W3mAvatar extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() private address?: string = undefined
  @state() private avatar?: string | null = undefined
  @state() private loading = true
  @property() public size?: 'medium' | 'small' = 'small'

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.address = AccountCtrl.state.address
    this.avatar = AccountCtrl.state.profileAvatar
    this.loading = Boolean(AccountCtrl.state.profileLoading)
    this.unsubscribeAccount = AccountCtrl.subscribe(
      ({ address, profileAvatar, profileLoading }) => {
        this.address = address
        this.avatar = profileAvatar
        this.loading = Boolean(profileLoading)
      }
    )
  }

  public disconnectedCallback() {
    this.unsubscribeAccount?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeAccount?: () => void = undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-placeholder': true,
      'wcm-small': this.size === 'small',
      'wcm-medium': this.size === 'medium'
    }

    if (this.avatar) {
      return html`<img class=${classMap(classes)} src=${this.avatar} />`
    }

    if (this.address) {
      UiUtil.generateAvatarColors(this.address)

      return html`
        <div class=${classMap(classes)}>
          ${this.loading ? html`<div class="wcm-loader"></div>` : null}
        </div>
      `
    }

    return null
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-avatar': W3mAvatar
  }
}
