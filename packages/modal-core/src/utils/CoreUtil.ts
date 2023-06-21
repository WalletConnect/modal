import { RouterCtrl } from '../controllers/RouterCtrl'

export const CoreUtil = {
  WALLETCONNECT_DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',

  WCM_VERSION: 'WCM_VERSION',

  RECOMMENDED_WALLET_AMOUNT: 9,

  isMobile() {
    if (typeof window !== 'undefined') {
      return Boolean(
        window.matchMedia('(pointer:coarse)').matches ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)
      )
    }

    return false
  },

  isAndroid() {
    return CoreUtil.isMobile() && navigator.userAgent.toLowerCase().includes('android')
  },

  isIos() {
    const ua = navigator.userAgent.toLowerCase()

    return CoreUtil.isMobile() && (ua.includes('iphone') || ua.includes('ipad'))
  },

  isHttpUrl(url: string) {
    return url.startsWith('http://') || url.startsWith('https://')
  },

  isArray<T>(data?: T | T[]): data is T[] {
    return Array.isArray(data) && data.length > 0
  },

  formatNativeUrl(appUrl: string, wcUri: string, name: string): string {
    if (CoreUtil.isHttpUrl(appUrl)) {
      return this.formatUniversalUrl(appUrl, wcUri, name)
    }
    let safeAppUrl = appUrl
    if (!safeAppUrl.includes('://')) {
      safeAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '')
      safeAppUrl = `${safeAppUrl}://`
    }
    if (!safeAppUrl.endsWith('/')) {
      safeAppUrl = `${safeAppUrl}/`
    }
    this.setWalletConnectDeepLink(safeAppUrl, name)
    const encodedWcUrl = encodeURIComponent(wcUri)

    return `${safeAppUrl}wc?uri=${encodedWcUrl}`
  },

  formatUniversalUrl(appUrl: string, wcUri: string, name: string): string {
    if (!CoreUtil.isHttpUrl(appUrl)) {
      return this.formatNativeUrl(appUrl, wcUri, name)
    }
    let safeAppUrl = appUrl
    if (!safeAppUrl.endsWith('/')) {
      safeAppUrl = `${safeAppUrl}/`
    }
    this.setWalletConnectDeepLink(safeAppUrl, name)
    const encodedWcUrl = encodeURIComponent(wcUri)

    return `${safeAppUrl}wc?uri=${encodedWcUrl}`
  },

  async wait(miliseconds: number) {
    return new Promise(resolve => {
      setTimeout(resolve, miliseconds)
    })
  },

  openHref(href: string, target: '_blank' | '_self') {
    window.open(href, target, 'noreferrer noopener')
  },

  setWalletConnectDeepLink(href: string, name: string) {
    localStorage.setItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href, name }))
  },

  setWalletConnectAndroidDeepLink(wcUri: string) {
    const [href] = wcUri.split('?')

    localStorage.setItem(
      CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE,
      JSON.stringify({ href, name: 'Android' })
    )
  },

  removeWalletConnectDeepLink() {
    localStorage.removeItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE)
  },

  setModalVersionInStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CoreUtil.WCM_VERSION, process.env.ROLLUP_WCM_VERSION ?? 'UNKNOWN')
    }
  },

  getWalletRouterData() {
    const routerData = RouterCtrl.state.data?.Wallet
    if (!routerData) {
      throw new Error('Missing "Wallet" view data')
    }

    return routerData
  }
}
