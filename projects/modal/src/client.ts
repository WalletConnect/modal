import type { ConfigCtrlState, ThemeCtrlState } from '@walletconnect/modal-core'
import { ConfigCtrl, ModalCtrl, OptionsCtrl, ThemeCtrl } from '@walletconnect/modal-core'

/**
 * Types
 */
export type WalletConnectModalConfig = ConfigCtrlState & ThemeCtrlState

/**
 * Client
 */
export class WalletConnectModal {
  public constructor(config: WalletConnectModalConfig) {
    ThemeCtrl.setThemeConfig(config)
    ConfigCtrl.setConfig(config)
    this.initUi()
  }

  private async initUi() {
    if (typeof window !== 'undefined') {
      console.log('before import')
      await import('@walletconnect/modal-ui')
      console.log('after import')
      const modal = document.createElement('wcm-modal')
      console.log(modal)
      console.log('after create root')
      document.body.insertAdjacentElement('beforeend', modal)
      console.log('after insert adjecent')
      OptionsCtrl.setIsUiLoaded(true)
      console.log('after set ui loaded')
    }
  }

  public openModal = ModalCtrl.open

  public closeModal = ModalCtrl.close

  public subscribeModal = ModalCtrl.subscribe

  public setTheme = ThemeCtrl.setThemeConfig
}
