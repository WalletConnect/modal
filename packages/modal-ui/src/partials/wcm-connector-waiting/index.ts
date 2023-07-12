import { ThemeCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-connector-waiting')
export class WcmConnectorWaiting extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public walletId?: string = undefined

  @property() public imageId?: string = undefined

  @property({ type: Boolean }) public isError = false

  @property({ type: Boolean }) public isStale = false

  @property() public label = ''

  // -- private ------------------------------------------------------ //
  private svgLoaderTemplate() {
    const ICON_SIZE = 88
    const DH_ARRAY = 317
    const DH_OFFSET = 425

    const radius =
      ThemeCtrl.state.themeVariables?.['--wcm-wallet-icon-large-border-radius'] ??
      ThemeUtil.getPreset('--wcm-wallet-icon-large-border-radius')
    let numRadius = 0

    if (radius.includes('%')) {
      numRadius = (ICON_SIZE / 100) * parseInt(radius, 10)
    } else {
      numRadius = parseInt(radius, 10)
    }

    numRadius *= 1.17
    const dashArray = DH_ARRAY - numRadius * 1.57
    const dashOffset = DH_OFFSET - numRadius * 1.8

    return html`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect id="wcm-loader" x="2" y="2" width="106" height="106" rx=${numRadius} />
        <use
          xlink:href="#wcm-loader"
          stroke-dasharray="106 ${dashArray}"
          stroke-dashoffset=${dashOffset}
        ></use>
      </svg>
    `
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'wcm-error': this.isError,
      'wcm-stale': this.isStale
    }

    return html`
      <div class=${classMap(classes)}>
        ${this.svgLoaderTemplate()}
        <wcm-wallet-image
          walletId=${ifDefined(this.walletId)}
          imageId=${ifDefined(this.imageId)}
        ></wcm-wallet-image>
      </div>
      <wcm-text variant="medium-regular" color=${this.isError ? 'error' : 'primary'}>
        ${this.isError ? 'Connection declined' : this.label}
      </wcm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-connector-waiting': WcmConnectorWaiting
  }
}
