import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { ConfigCtrlState } from '../types/controllerTypes'
import { CoreUtil } from '../utils/CoreUtil'
import { EventsCtrl } from './EventsCtrl'
import { OptionsCtrl } from './OptionsCtrl'

const state = proxy<ConfigCtrlState>({
  projectId: '',
  mobileWallets: undefined,
  desktopWallets: undefined,
  walletImages: undefined,
  standaloneChains: undefined,
  enableAuthMode: false,
  enableExplorer: true,
  defaultChain: undefined,
  explorerExcludedWalletIds: undefined,
  explorerRecommendedWalletIds: undefined,
  termsOfServiceUrl: undefined,
  privacyPolicyUrl: undefined
})

// -- controller --------------------------------------------------- //
export const ConfigCtrl = {
  state,

  subscribe(callback: (newState: ConfigCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  setConfig(config: ConfigCtrlState) {
    EventsCtrl.initialize()
    OptionsCtrl.setStandaloneChains(config.standaloneChains)
    OptionsCtrl.setIsAuth(Boolean(config.enableAuthMode))
    OptionsCtrl.setIsCustomMobile(Boolean(config.mobileWallets?.length))
    OptionsCtrl.setIsCustomDesktop(Boolean(config.desktopWallets?.length))

    if (config.defaultChain) {
      OptionsCtrl.setSelectedChain(config.defaultChain)
    }

    CoreUtil.setModalVersionInStorage()

    Object.assign(state, config)
  }
}
