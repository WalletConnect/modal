import { OptionsCtrl, RouterCtrl } from '#core'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-account-network-button')
export class W3mAccountNetworkButton extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ----------------------------------------------- //
  @state() private chainId? = 0
  @state() private label? = ''

  // -- lifecycle ---------------------------------------------------- //
  public constructor() {
    super()
    const { selectedChain } = OptionsCtrl.state
    this.chainId = selectedChain?.id
    this.label = selectedChain?.name
    this.unsubscribeNetwork = OptionsCtrl.subscribe(({ selectedChain: newChain }) => {
      this.chainId = newChain?.id
      this.label = newChain?.name
    })
  }

  public disconnectedCallback() {
    this.unsubscribeNetwork?.()
  }

  // -- private ------------------------------------------------------ //
  private readonly unsubscribeNetwork?: () => void = undefined

  private onClick() {
    RouterCtrl.push('SelectNetwork')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { chains, selectedChain } = OptionsCtrl.state
    const supportedChainIds = chains?.map(chain => chain.id)
    const isChainSupported = selectedChain && supportedChainIds?.includes(selectedChain.id)
    const isSwitchNetoworkDisabled = chains && chains.length <= 1 && isChainSupported

    return html`
      <button @click=${this.onClick} ?disabled=${isSwitchNetoworkDisabled}>
        <wcm-network-image chainId=${this.chainId}></wcm-network-image>
        <wcm-text variant="xsmall-regular" color="accent">${this.label}</wcm-text>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-account-network-button': W3mAccountNetworkButton
  }
}
