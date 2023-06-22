import { ConfigCtrl, ExplorerCtrl, OptionsCtrl, ToastCtrl } from '@walletconnect/modal-core'
import { LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { UiUtil } from '../utils/UiUtil'

@customElement('wcm-explorer-context')
export class WcmExplorerContext extends LitElement {
  // -- state & properties ------------------------------------------- //
  @state() private preload = true

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()

    // Load explorer and asset data
    this.preloadData()
  }

  // -- private ------------------------------------------------------ //
  private async loadImages(images?: string[]) {
    try {
      if (images?.length) {
        await Promise.all(images.map(async url => UiUtil.preloadImage(url)))
      }
    } catch {
      console.info('Unsuccessful attempt at preloading some images', images)
    }
  }

  private async preloadListings() {
    if (ConfigCtrl.state.enableExplorer) {
      await ExplorerCtrl.getRecomendedWallets()
      OptionsCtrl.setIsDataLoaded(true)
      const { recomendedWallets } = ExplorerCtrl.state
      const walletImgs = recomendedWallets.map(wallet => UiUtil.getWalletIcon(wallet))
      await this.loadImages(walletImgs)
    } else {
      OptionsCtrl.setIsDataLoaded(true)
    }
  }

  private async preloadCustomImages() {
    const images = UiUtil.getCustomImageUrls()
    await this.loadImages(images)
  }

  private async preloadData() {
    try {
      if (this.preload) {
        this.preload = false
        await Promise.all([this.preloadListings(), this.preloadCustomImages()])
      }
    } catch (err) {
      console.error(err)
      ToastCtrl.openToast('Failed preloading', 'error')
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-explorer-context': WcmExplorerContext
  }
}
