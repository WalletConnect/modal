import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { OptionsCtrlState } from '../types/controllerTypes'

// -- initial state ------------------------------------------------ //
const state = proxy<OptionsCtrlState>({
  chains: undefined,
  walletConnectUri: undefined,
  isAuth: false,
  isCustomDesktop: false,
  isCustomMobile: false,
  isDataLoaded: false,
  isUiLoaded: false
})

// -- controller --------------------------------------------------- //
export const OptionsCtrl = {
  state,

  subscribe(callback: (newState: OptionsCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  setChains(chains: OptionsCtrlState['chains']) {
    state.chains = chains
  },

  setWalletConnectUri(walletConnectUri: OptionsCtrlState['walletConnectUri']) {
    state.walletConnectUri = walletConnectUri
  },

  setIsCustomDesktop(isCustomDesktop: OptionsCtrlState['isCustomDesktop']) {
    state.isCustomDesktop = isCustomDesktop
  },

  setIsCustomMobile(isCustomMobile: OptionsCtrlState['isCustomMobile']) {
    state.isCustomMobile = isCustomMobile
  },

  setIsDataLoaded(isDataLoaded: OptionsCtrlState['isDataLoaded']) {
    state.isDataLoaded = isDataLoaded
  },

  setIsUiLoaded(isUiLoaded: OptionsCtrlState['isUiLoaded']) {
    state.isUiLoaded = isUiLoaded
  },

  setIsAuth(isAuth: OptionsCtrlState['isAuth']) {
    state.isAuth = isAuth
  }
}
