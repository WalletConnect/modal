import { CoreUtil } from '#core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-install-wallet-view')
export class WcmInstallWalletView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //

  private onInstall(uri?: string) {
    if (uri) {
      CoreUtil.openHref(uri, '_blank')
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { name, id, image_id, homepage } = CoreUtil.getWalletRouterData()

    return html`
      <wcm-modal-header title=${name}></wcm-modal-header>

      <wcm-modal-content>
        <wcm-connector-waiting
          walletId=${id}
          imageId=${ifDefined(image_id)}
          label="Not Detected"
          .isStale=${true}
        ></wcm-connector-waiting>
      </wcm-modal-content>

      <wcm-info-footer>
        <wcm-text color="secondary" variant="small-thin">
          ${`Download ${name} to continue. If multiple browser extensions are installed, disable non ${name} ones and try again`}
        </wcm-text>

        <wcm-button .onClick=${() => this.onInstall(homepage)} .iconLeft=${SvgUtil.ARROW_DOWN_ICON}>
          Download
        </wcm-button>
      </wcm-info-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-install-wallet-view': WcmInstallWalletView
  }
}
