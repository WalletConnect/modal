import type { RouterView } from '#core'
import { RouterCtrl } from '#core'
import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { animate } from 'motion'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

@customElement('wcm-modal-router')
export class WcmModalRouter extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() public view: RouterView = RouterCtrl.state.view
  @state() public prevView: RouterView = RouterCtrl.state.view

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    this.unsubscribe = RouterCtrl.subscribe(routerState => {
      if (this.view !== routerState.view) {
        this.onChangeRoute()
      }
    })
  }

  public firstUpdated() {
    this.resizeObserver = new ResizeObserver(([conetnt]) => {
      const newHeight = `${conetnt.contentRect.height}px`
      if (this.oldHeight !== '0px') {
        animate(this.routerEl, { height: [this.oldHeight, newHeight] }, { duration: 0.2 })
      }
      this.oldHeight = newHeight
    })
    this.resizeObserver.observe(this.contentEl)
  }

  public disconnectedCallback() {
    this.unsubscribe?.()
    this.resizeObserver?.disconnect()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribe?: () => void = undefined
  private oldHeight = '0px'
  private resizeObserver?: ResizeObserver = undefined

  private get routerEl() {
    return UiUtil.getShadowRootElement(this, '.wcm-router')
  }

  private get contentEl() {
    return UiUtil.getShadowRootElement(this, '.wcm-content')
  }

  private viewTemplate() {
    switch (this.view) {
      case 'ConnectWallet':
        return html`<wcm-connect-wallet-view></wcm-connect-wallet-view>`
      case 'SelectNetwork':
        return html`<wcm-select-network-view></wcm-select-network-view>`
      case 'InjectedConnecting':
        return html`<wcm-injected-connecting-view></wcm-injected-connecting-view>`
      case 'DesktopConnecting':
        return html`<wcm-desktop-connecting-view></wcm-desktop-connecting-view>`
      case 'MobileConnecting':
        return html`<wcm-mobile-connecting-view></wcm-mobile-connecting-view>`
      case 'WebConnecting':
        return html`<wcm-web-connecting-view></wcm-web-connecting-view>`
      case 'MobileQrcodeConnecting':
        return html`<wcm-mobile-qr-connecting-view></wcm-mobile-qr-connecting-view>`
      case 'GetWallet':
        return html`<wcm-get-wallet-view></wcm-get-wallet-view>`
      case 'WalletExplorer':
        return html`<wcm-wallet-explorer-view></wcm-wallet-explorer-view>`
      case 'Qrcode':
        return html`<wcm-qrcode-view></wcm-qrcode-view>`
      case 'Help':
        return html`<wcm-help-view></wcm-help-view>`
      case 'Account':
        return html`<wcm-account-view></wcm-account-view>`
      case 'SwitchNetwork':
        return html`<wcm-switch-network-view></wcm-switch-network-view>`
      case 'InstallWallet':
        return html`<wcm-install-wallet-view></wcm-install-wallet-view>`
      default:
        return html`<div>Not Found</div>`
    }
  }

  private async onChangeRoute() {
    await animate(
      this.routerEl,
      { opacity: [1, 0], scale: [1, 1.02] },
      { duration: 0.15, delay: 0.1 }
    ).finished
    this.view = RouterCtrl.state.view
    animate(this.routerEl, { opacity: [0, 1], scale: [0.99, 1] }, { duration: 0.37, delay: 0.05 })
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="wcm-router">
        <div class="wcm-content">${this.viewTemplate()}</div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-router': WcmModalRouter
  }
}
