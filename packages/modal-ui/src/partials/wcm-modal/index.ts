import { ModalCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { animate } from 'motion'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

type Target = HTMLElement | undefined

@customElement('wcm-modal')
export class WcmModal extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() private open = false

  @state() private active = false

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()

    // Subscribe to modal state
    this.unsubscribeModal = ModalCtrl.subscribe(modalState => {
      if (modalState.open) {
        this.onOpenModalEvent()
      } else {
        this.onCloseModalEvent()
      }
    })
  }

  public disconnectedCallback() {
    this.unsubscribeModal?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeModal?: () => void = undefined

  private abortController?: AbortController = undefined

  private get overlayEl() {
    return UiUtil.getShadowRootElement(this, '.wcm-overlay')
  }

  private get containerEl() {
    return UiUtil.getShadowRootElement(this, '.wcm-container')
  }

  private toggleBodyScroll(enabled: boolean) {
    const body = document.querySelector('body')
    if (body) {
      if (enabled) {
        const wcmStyles = document.getElementById('wcm-styles')
        wcmStyles?.remove()
      } else {
        document.head.insertAdjacentHTML(
          'beforeend',
          `<style id="wcm-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>`
        )
      }
    }
  }

  private onCloseModal(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      ModalCtrl.close()
    }
  }

  private onOpenModalEvent() {
    this.toggleBodyScroll(false)
    this.addKeyboardEvents()
    this.open = true
    setTimeout(async () => {
      const animation = UiUtil.isMobileAnimation() ? { y: ['50vh', '0vh'] } : { scale: [0.98, 1] }
      const delay = 0.1
      const duration = 0.2
      await Promise.all([
        animate(this.overlayEl, { opacity: [0, 1] }, { delay, duration }).finished,
        animate(this.containerEl, animation, { delay, duration }).finished
      ])
      this.active = true
    }, 0)
  }

  private async onCloseModalEvent() {
    this.toggleBodyScroll(true)
    this.removeKeyboardEvents()
    const animation = UiUtil.isMobileAnimation() ? { y: ['0vh', '50vh'] } : { scale: [1, 0.98] }
    const duration = 0.2
    await Promise.all([
      animate(this.overlayEl, { opacity: [1, 0] }, { duration }).finished,
      animate(this.containerEl, animation, { duration }).finished
    ])
    this.containerEl.removeAttribute('style')
    this.active = false
    this.open = false
  }

  private addKeyboardEvents() {
    this.abortController = new AbortController()
    window.addEventListener(
      'keydown',
      event => {
        if (event.key === 'Escape') {
          ModalCtrl.close()
        } else if (event.key === 'Tab') {
          if (!(event.target as Target)?.tagName.includes('wcm-')) {
            this.containerEl.focus()
          }
        }
      },
      this.abortController
    )
    this.containerEl.focus()
  }

  private removeKeyboardEvents() {
    this.abortController?.abort()
    this.abortController = undefined
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-overlay': true,
      'wcm-active': this.active
    }

    return html`
      <wcm-explorer-context></wcm-explorer-context>
      <wcm-theme-context></wcm-theme-context>

      <div
        id="wcm-modal"
        class=${classMap(classes)}
        @click=${this.onCloseModal}
        role="alertdialog"
        aria-modal="true"
      >
        <div class="wcm-container" tabindex="0">
          ${this.open
            ? html`
                <wcm-modal-backcard></wcm-modal-backcard>
                <div class="wcm-card">
                  <wcm-modal-router></wcm-modal-router>
                  <wcm-modal-toast></wcm-modal-toast>
                </div>
              `
            : null}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal': WcmModal
  }
}
