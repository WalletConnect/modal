import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { ModalCtrlState } from '../types/controllerTypes'
import { CoreUtil } from '../utils/CoreUtil'
import { OptionsCtrl } from './OptionsCtrl'
import { RouterCtrl } from './RouterCtrl'

// -- types -------------------------------------------------------- //
export interface OpenOptions {
  uri: string
  chains?: string[]
}

// -- initial state ------------------------------------------------ //
const state = proxy<ModalCtrlState>({
  open: false
})

// -- controller --------------------------------------------------- //
export const ModalCtrl = {
  state,

  subscribe(callback: (newState: ModalCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  async open(options?: OpenOptions) {
    return new Promise<void>(resolve => {
      const { isUiLoaded, isDataLoaded } = OptionsCtrl.state
      CoreUtil.removeWalletConnectDeepLink()

      OptionsCtrl.setWalletConnectUri(options?.uri)
      OptionsCtrl.setChains(options?.chains)
      RouterCtrl.reset('ConnectWallet')

      // Open modal if essential async data is ready
      if (isUiLoaded && isDataLoaded) {
        state.open = true
        resolve()
      }
      // Otherwise (slow network) re-attempt open checks
      else {
        const interval = setInterval(() => {
          const opts = OptionsCtrl.state
          if (opts.isUiLoaded && opts.isDataLoaded) {
            clearInterval(interval)
            state.open = true
            resolve()
          }
        }, 200)
      }
    })
  },

  close() {
    state.open = false
  }
}
