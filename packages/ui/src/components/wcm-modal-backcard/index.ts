import { ModalCtrl, RouterCtrl, ThemeCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-backcard')
export class WcmModalBackcard extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() private isHelp = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.unsubscribeRouter = RouterCtrl.subscribe(routerState => {
      this.isHelp = routerState.view === 'Help'
    })
  }

  public disconnectedCallback() {
    this.unsubscribeRouter?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeRouter?: () => void = undefined

  private onHelp() {
    RouterCtrl.push('Help')
  }

  private logoTemplate() {
    const customSrc = ThemeCtrl.state.themeVariables?.['--wcm-logo-image-url']

    if (customSrc) {
      return html`<img src=${customSrc} />`
    }

    return SvgUtil.WALLET_CONNECT_LOGO
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const actionsClasses = {
      'wcm-help-active': this.isHelp
    }

    return html`
      <div class="wcm-toolbar-placeholder"></div>
      <div class="wcm-toolbar">
        ${this.logoTemplate()}
        <div class=${classMap(actionsClasses)}>
          <button @click=${this.onHelp}>${SvgUtil.HELP_ICON}</button>
          <button @click=${ModalCtrl.close}>${SvgUtil.CROSS_ICON}</button>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-backcard': WcmModalBackcard
  }
}