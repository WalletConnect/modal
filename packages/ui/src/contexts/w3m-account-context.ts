import {
  AccountCtrl,
  ClientCtrl,
  ConfigCtrl,
  EventsCtrl,
  ModalCtrl,
  OptionsCtrl,
  ToastCtrl
} from '#core'
import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { UiUtil } from '../utils/UiUtil'

@customElement('wcm-account-context')
export class WcmAccountContext extends LitElement {
  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()

    // Set & Subscribe to account, ens state
    AccountCtrl.getAccount()
    this.fetchProfile()
    this.fetchBalance()
    this.unwatchAccount = ClientCtrl.client().watchAccount(account => {
      const { address, isConnected } = AccountCtrl.state

      if (account.isConnected && account.address !== address) {
        this.fetchProfile(account.address)
        this.fetchBalance(account.address)
        AccountCtrl.setAddress(account.address)
      }

      if (!account.isConnected) {
        AccountCtrl.resetAccount()
      }

      if (isConnected !== account.isConnected) {
        ModalCtrl.close()
      }

      if (!isConnected && account.isConnected) {
        EventsCtrl.track({ name: 'ACCOUNT_CONNECTED' })
      } else if (isConnected && !account.isConnected) {
        EventsCtrl.track({ name: 'ACCOUNT_DISCONNECTED' })
      }

      AccountCtrl.setIsConnected(account.isConnected)
    })
  }

  public disconnectedCallback() {
    this.unwatchAccount?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unwatchAccount?: () => void = undefined

  private async fetchProfile(profileAddress?: `0x${string}`) {
    const hasMainnet = OptionsCtrl.state.chains?.find(chain => chain.id === 1)
    if (ConfigCtrl.state.enableAccountView && hasMainnet) {
      try {
        await AccountCtrl.fetchProfile(UiUtil.preloadImage, profileAddress)
      } catch (err) {
        console.error(err)
        ToastCtrl.openToast(UiUtil.getErrorMessage(err), 'error')
      }
    }
  }

  private async fetchBalance(balanceAddress?: `0x${string}`) {
    if (ConfigCtrl.state.enableAccountView) {
      try {
        await AccountCtrl.fetchBalance(balanceAddress)
      } catch (err) {
        console.error(err)
        ToastCtrl.openToast(UiUtil.getErrorMessage(err), 'error')
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-account-context': WcmAccountContext
  }
}
