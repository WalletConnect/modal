import type { ConfigCtrlState, ThemeCtrlState } from '#core'
import { ConfigCtrl, ModalCtrl, OptionsCtrl, ThemeCtrl } from '#core'

/**
 * Types
 */
export type WalletConnectModalConfig = Pick<
  ConfigCtrlState,
  | 'desktopWallets'
  | 'enableAuthMode'
  | 'enableExplorer'
  | 'explorerExcludedWalletIds'
  | 'explorerRecommendedWalletIds'
  | 'mobileWallets'
  | 'privacyPolicyUrl'
  | 'projectId'
  | 'standaloneChains'
  | 'termsOfServiceUrl'
  | 'tokenImages'
  | 'walletImages'
> &
  ThemeCtrlState & {
    walletConnectVersion: 1 | 2
  }

/**
 * Client
 */
export class WalletConnectModal {
  public constructor(config: WalletConnectModalConfig) {
    ThemeCtrl.setThemeConfig(config)
    ConfigCtrl.setConfig({ enableStandaloneMode: true, ...config })
    this.initUi()
  }

  private async initUi() {
    if (typeof window !== 'undefined') {
      await import('#ui')
      const modal = document.createElement('wcm-modal')
      document.body.insertAdjacentElement('beforeend', modal)
      OptionsCtrl.setIsUiLoaded(true)
    }
  }

  public openModal = ModalCtrl.open

  public closeModal = ModalCtrl.close

  public subscribeModal = ModalCtrl.subscribe

  public setTheme = ThemeCtrl.setThemeConfig
}
