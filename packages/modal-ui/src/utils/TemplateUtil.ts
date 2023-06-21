import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { WalletData } from 'packages/modal-core'
import { DataUtil } from './DataUtil'
import { UiUtil } from './UiUtil'

export const TemplateUtil = {
  onConnecting(data: WalletData) {
    UiUtil.goToConnectingView(data)
  },

  manualWalletsTemplate() {
    const wallets = DataUtil.manualWallets()

    return wallets.map(
      wallet => html`
        <wcm-wallet-button
          walletId=${wallet.id}
          name=${wallet.name}
          .onClick=${() => this.onConnecting(wallet)}
        ></wcm-wallet-button>
      `
    )
  },

  recomendedWalletsTemplate(skipRecent = false) {
    const wallets = DataUtil.recomendedWallets(skipRecent)

    return wallets.map(
      wallet => html`
        <wcm-wallet-button
          name=${wallet.name}
          walletId=${wallet.id}
          imageId=${wallet.image_id}
          .onClick=${() => this.onConnecting(wallet)}
        ></wcm-wallet-button>
      `
    )
  },

  recentWalletTemplate() {
    const wallet = DataUtil.recentWallet()

    if (!wallet) {
      return undefined
    }

    return html`
      <wcm-wallet-button
        name=${wallet.name}
        walletId=${wallet.id}
        imageId=${ifDefined(wallet.image_id)}
        .recent=${true}
        .onClick=${() => this.onConnecting(wallet)}
      ></wcm-wallet-button>
    `
  }
}
