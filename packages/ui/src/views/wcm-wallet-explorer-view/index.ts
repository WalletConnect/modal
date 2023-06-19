import type { Listing } from '#core'
import { CoreUtil, ExplorerCtrl, OptionsCtrl, ToastCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { TemplateUtil } from '../../utils/TemplateUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import { UiUtil } from '../../utils/UiUtil'
import styles from './styles.css'

const PAGE_ENTRIES = 40

@customElement('wcm-wallet-explorer-view')
export class WcmWalletExplorerView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @state() private loading = !ExplorerCtrl.state.wallets.listings.length
  @state() private firstFetch = !ExplorerCtrl.state.wallets.listings.length
  @state() private search = ''
  @state() private endReached = false

  // -- lifecycle ---------------------------------------------------- //
  public firstUpdated() {
    this.createPaginationObserver()
  }

  public disconnectedCallback() {
    this.intersectionObserver?.disconnect()
  }

  // -- private ------------------------------------------------------ //
  private get placeholderEl() {
    return UiUtil.getShadowRootElement(this, '.wcm-placeholder-block')
  }

  private intersectionObserver: IntersectionObserver | undefined = undefined

  private createPaginationObserver() {
    this.intersectionObserver = new IntersectionObserver(([element]) => {
      if (element.isIntersecting && !(this.search && this.firstFetch)) {
        this.fetchWallets()
      }
    })
    this.intersectionObserver.observe(this.placeholderEl)
  }

  private isLastPage() {
    const { wallets, search } = ExplorerCtrl.state
    const { listings, total } = this.search ? search : wallets

    return total <= PAGE_ENTRIES || listings.length >= total
  }

  private async fetchWallets() {
    const { wallets, search } = ExplorerCtrl.state
    const { listings, total, page } = this.search ? search : wallets

    if (
      !this.endReached &&
      (this.firstFetch || (total > PAGE_ENTRIES && listings.length < total))
    ) {
      try {
        this.loading = true
        const chains = OptionsCtrl.state.chains?.join(',')
        const { listings: newListings } = await ExplorerCtrl.getWallets({
          page: this.firstFetch ? 1 : page + 1,
          entries: PAGE_ENTRIES,
          search: this.search,
          version: 2,
          chains
        })
        const explorerImages = newListings.map(wallet => UiUtil.getWalletIcon(wallet))
        await Promise.all([
          ...explorerImages.map(async url => UiUtil.preloadImage(url)),
          CoreUtil.wait(300)
        ])
        this.endReached = this.isLastPage()
      } catch (err) {
        console.error(err)
        ToastCtrl.openToast(UiUtil.getErrorMessage(err), 'error')
      } finally {
        this.loading = false
        this.firstFetch = false
      }
    }
  }

  private onConnect(listing: Listing) {
    if (CoreUtil.isAndroid()) {
      UiUtil.handleMobileLinking(listing)
    } else {
      UiUtil.goToConnectingView(listing)
    }
  }

  private onSearchChange(event: Event) {
    const { value } = event.target as HTMLInputElement
    this.searchDebounce(value)
  }

  private readonly searchDebounce = UiUtil.debounce((value: string) => {
    if (value.length >= 3) {
      this.firstFetch = true
      this.endReached = false
      this.search = value
      ExplorerCtrl.resetSearch()
      this.fetchWallets()
    } else if (this.search) {
      this.search = ''
      this.endReached = this.isLastPage()
      ExplorerCtrl.resetSearch()
    }
  })

  // -- render ------------------------------------------------------- //
  protected render() {
    const { wallets, search } = ExplorerCtrl.state
    const { listings } = this.search ? search : wallets
    const isLoading = this.loading && !listings.length
    const isSearch = this.search.length >= 3
    let manualWallets = TemplateUtil.manualWalletsTemplate()
    let recomendedWallets = TemplateUtil.recomendedWalletsTemplate(true)

    // If search is active, we only show results matching query
    if (isSearch) {
      manualWallets = manualWallets.filter(({ values }) =>
        UiUtil.caseSafeIncludes(values[0] as string, this.search)
      )
      recomendedWallets = recomendedWallets.filter(({ values }) =>
        UiUtil.caseSafeIncludes(values[0] as string, this.search)
      )
    }

    const isEmpty = !this.loading && !listings.length && !recomendedWallets.length
    const classes = {
      'wcm-loading': isLoading,
      'wcm-end-reached': this.endReached || !this.loading,
      'wcm-empty': isEmpty
    }

    return html`
      <wcm-modal-header>
        <wcm-search-input .onChange=${this.onSearchChange.bind(this)}></wcm-search-input>
      </wcm-modal-header>

      <wcm-modal-content class=${classMap(classes)}>
        <div class="wcm-grid">
          ${isLoading ? null : manualWallets} ${isLoading ? null : recomendedWallets}
          ${isLoading
            ? null
            : listings.map(
                listing => html`
                  ${listing
                    ? html`
                        <wcm-wallet-button
                          imageId=${listing.image_id}
                          name=${listing.name}
                          walletId=${listing.id}
                          .onClick=${() => this.onConnect(listing)}
                        >
                        </wcm-wallet-button>
                      `
                    : null}
                `
              )}
        </div>
        <div class="wcm-placeholder-block">
          ${isEmpty
            ? html`<wcm-text variant="big-bold" color="secondary">No results found</wcm-text>`
            : null}
          ${!isEmpty && this.loading ? html`<wcm-spinner></wcm-spinner>` : null}
        </div>
      </wcm-modal-content>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-wallet-explorer-view': WcmWalletExplorerView
  }
}
