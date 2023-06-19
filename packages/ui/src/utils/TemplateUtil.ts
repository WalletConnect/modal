import type { WalletData } from '#core'
import { html } from 'lit'
import { DataUtil } from './DataUtil'
import { UiUtil } from './UiUtil'

export const TemplateUtil = {
  onConnecting(data: WalletData) {
    UiUtil.goToConnectingView(data)
  },

  onExternal(id: string) {
    UiUtil.handleConnectorConnection(id)
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

  externalWalletsTemplate() {
    const wallets = DataUtil.externalWallets()

    return wallets.map(
      wallet => html`
        <wcm-wallet-button
          name=${wallet.name}
          walletId=${wallet.id}
          .onClick=${() => this.onExternal(wallet.id)}
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
        imageId=${wallet.image_id}
        .recent=${true}
        .onClick=${() => this.onConnecting(wallet)}
      ></wcm-wallet-button>
    `
  },

  installedInjectedWalletsTemplate() {
    const wallets = DataUtil.installedInjectedWallets()

    return wallets.map(
      wallet => html`
        <wcm-wallet-button
          .installed=${true}
          name=${wallet.name}
          walletId=${wallet.id}
          imageId=${wallet.image_id}
          .onClick=${() => this.onConnecting(wallet)}
        ></wcm-wallet-button>
      `
    )
  },

  injectedWalletsTemplate() {
    const wallets = DataUtil.injectedWallets()

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
  }
}
