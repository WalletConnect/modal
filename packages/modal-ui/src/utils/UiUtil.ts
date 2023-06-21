import type { LitElement } from 'lit'
import type { WalletData } from 'packages/modal-core'
import {
  ConfigCtrl,
  CoreUtil,
  ExplorerCtrl,
  OptionsCtrl,
  RouterCtrl,
  ToastCtrl
} from 'packages/modal-core'

export const UiUtil = {
  MOBILE_BREAKPOINT: 600,

  WCM_RECENT_WALLET_DATA: 'WCM_RECENT_WALLET_DATA',

  EXPLORER_WALLET_URL: 'https://explorer.walletconnect.com/?type=wallet',

  getShadowRootElement(root: LitElement, selector: string) {
    const el = root.renderRoot.querySelector(selector)
    if (!el) {
      throw new Error(`${selector} not found`)
    }

    return el as HTMLElement
  },

  getWalletIcon({ id, image_id }: { id: string; image_id?: string }) {
    const { walletImages } = ConfigCtrl.state

    if (walletImages?.[id]) {
      return walletImages[id]
    } else if (image_id) {
      return ExplorerCtrl.getWalletImageUrl(image_id)
    }

    return ''
  },

  getWalletName(name: string, short = false) {
    return short ? name.split(' ')[0] : name
  },

  isMobileAnimation() {
    return window.innerWidth <= UiUtil.MOBILE_BREAKPOINT
  },

  async preloadImage(src: string) {
    const imagePromise = new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = resolve
      image.onerror = reject
      image.src = src
    })

    return Promise.race([imagePromise, CoreUtil.wait(3_000)])
  },

  getErrorMessage(err: unknown) {
    return err instanceof Error ? err.message : 'Unknown Error'
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(func: (...args: any[]) => unknown, timeout = 500) {
    let timer: NodeJS.Timeout | undefined = undefined

    return (...args: unknown[]) => {
      function next() {
        func(...args)
      }
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(next, timeout)
    }
  },

  handleMobileLinking(wallet: WalletData) {
    const { walletConnectUri } = OptionsCtrl.state
    const { mobile, name } = wallet
    const nativeUrl = mobile?.native
    const universalUrl = mobile?.universal

    UiUtil.setRecentWallet(wallet)

    function onRedirect(uri: string) {
      let href = ''
      if (nativeUrl) {
        href = CoreUtil.formatUniversalUrl(nativeUrl, uri, name)
      } else if (universalUrl) {
        href = CoreUtil.formatNativeUrl(universalUrl, uri, name)
      }
      CoreUtil.openHref(href, '_self')
    }

    if (walletConnectUri) {
      onRedirect(walletConnectUri)
    }
  },

  handleAndroidLinking() {
    const { walletConnectUri } = OptionsCtrl.state

    if (walletConnectUri) {
      CoreUtil.setWalletConnectAndroidDeepLink(walletConnectUri)
      CoreUtil.openHref(walletConnectUri, '_self')
    }
  },

  async handleUriCopy() {
    const { walletConnectUri } = OptionsCtrl.state
    if (walletConnectUri) {
      await navigator.clipboard.writeText(walletConnectUri)
    }
    ToastCtrl.openToast('Link copied', 'success')
  },

  getCustomImageUrls() {
    const { walletImages } = ConfigCtrl.state
    const walletUrls = Object.values(walletImages ?? {})

    return Object.values(walletUrls)
  },

  truncate(value: string, strLen = 8) {
    if (value.length <= strLen) {
      return value
    }

    return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
  },

  setRecentWallet(wallet: WalletData) {
    localStorage.setItem(UiUtil.WCM_RECENT_WALLET_DATA, JSON.stringify(wallet))
  },

  getRecentWallet() {
    const wallet = localStorage.getItem(UiUtil.WCM_RECENT_WALLET_DATA)
    if (wallet) {
      const json = JSON.parse(wallet)

      return json as WalletData
    }

    return undefined
  },

  caseSafeIncludes(str1: string, str2: string) {
    return str1.toUpperCase().includes(str2.toUpperCase())
  },

  openWalletExplorerUrl() {
    CoreUtil.openHref(UiUtil.EXPLORER_WALLET_URL, '_blank')
  },

  getCachedRouterWalletPlatforms() {
    const { desktop, mobile } = CoreUtil.getWalletRouterData()
    const isDesktop = Boolean(desktop?.native)
    const isWeb = Boolean(desktop?.universal)
    const isMobile = Boolean(mobile?.native) || Boolean(mobile?.universal)

    return { isDesktop, isMobile, isWeb }
  },

  goToConnectingView(wallet: WalletData) {
    RouterCtrl.setData({ Wallet: wallet })
    const isMobileDevice = CoreUtil.isMobile()
    const { isDesktop, isWeb, isMobile } = UiUtil.getCachedRouterWalletPlatforms()

    // Mobile
    if (isMobileDevice) {
      if (isMobile) {
        RouterCtrl.push('MobileConnecting')
      } else if (isWeb) {
        RouterCtrl.push('WebConnecting')
      } else {
        RouterCtrl.push('InstallWallet')
      }
    }

    // Desktop
    else if (isDesktop) {
      RouterCtrl.push('DesktopConnecting')
    } else if (isWeb) {
      RouterCtrl.push('WebConnecting')
    } else if (isMobile) {
      RouterCtrl.push('MobileQrcodeConnecting')
    } else {
      RouterCtrl.push('InstallWallet')
    }
  }
}