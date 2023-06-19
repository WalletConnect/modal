import { RouterCtrl } from '#core'
import type { TemplateResult } from 'lit'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-modal-header')
export class WcmModalHeader extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public title = ''
  @property() public onAction?: () => void = undefined
  @property() public actionIcon?: TemplateResult<2> = undefined
  @property() public border = false

  // -- private ------------------------------------------------------ //
  private backBtnTemplate() {
    return html`
      <button class="wcm-back-btn" @click=${RouterCtrl.goBack}>${SvgUtil.BACK_ICON}</button>
    `
  }

  private actionBtnTemplate() {
    return html`<button class="wcm-action-btn" @click=${this.onAction}>${this.actionIcon}</button>`
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-border': this.border
    }
    const backBtn = RouterCtrl.state.history.length > 1

    const content = this.title
      ? html`<wcm-text variant="big-bold">${this.title}</wcm-text>`
      : html`<slot></slot>`

    return html`
      <header class=${classMap(classes)}>
        ${backBtn ? this.backBtnTemplate() : null} ${content}
        ${this.onAction ? this.actionBtnTemplate() : null}
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-modal-header': WcmModalHeader
  }
}
