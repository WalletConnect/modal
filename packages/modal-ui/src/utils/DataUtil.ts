import { ConfigCtrl, CoreUtil, ExplorerCtrl } from 'packages/modal-core'
import { UiUtil } from './UiUtil'

export const DataUtil = {
  manualWallets() {
    const { mobileWallets, desktopWallets } = ConfigCtrl.state
    const recentWalletId = DataUtil.recentWallet()?.id
    const platformWallets = CoreUtil.isMobile() ? mobileWallets : desktopWallets
    const wallets = platformWallets?.filter(wallet => recentWalletId !== wallet.id)

    return (
      (CoreUtil.isMobile()
        ? wallets?.map(({ id, name, links }) => ({ id, name, mobile: links, links }))
        : wallets?.map(({ id, name, links }) => ({ id, name, desktop: links, links }))) ?? []
    )
  },

  recentWallet() {
    return UiUtil.getRecentWallet()
  },

  recomendedWallets(skipRecent = false) {
    const recentWalletId = skipRecent ? undefined : DataUtil.recentWallet()?.id
    const { recomendedWallets } = ExplorerCtrl.state
    const wallets = recomendedWallets.filter(wallet => recentWalletId !== wallet.id)

    return wallets
  }
}
