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
  chains: undefined,
  enableAuthMode: false,
  enableExplorer: true,
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
    OptionsCtrl.setChains(config.chains)
    OptionsCtrl.setIsAuth(Boolean(config.enableAuthMode))
    OptionsCtrl.setIsCustomMobile(Boolean(config.mobileWallets?.length))
    OptionsCtrl.setIsCustomDesktop(Boolean(config.desktopWallets?.length))

    CoreUtil.setModalVersionInStorage()

    Object.assign(state, config)
  }
}
