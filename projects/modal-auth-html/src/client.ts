/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { AuthClientTypes } from '@walletconnect/auth-client'
import { AuthClient, generateNonce } from '@walletconnect/auth-client'
import type { WalletConnectModalConfig } from '@walletconnect/modal'
import { WalletConnectModal } from '@walletconnect/modal'

// -- Types ----------------------------------------------------------------
export interface WalletConnectModalAuthOptions {
  projectId: string
  metadata: AuthClientTypes.Metadata
  modalOptions?: Omit<
    WalletConnectModalConfig,
    'chains' | 'enableAuthMode' | 'projectId' | 'walletConnectVersion'
  >
}

export interface WalletConnectModalAuthSignInArguments {
  statement: string
  chainId?: string
  aud?: string
  domain?: string
}

// -- Client ---------------------------------------------------------------
export class WalletConnectModalAuth {
  #options: WalletConnectModalAuthOptions
  #modal: WalletConnectModal
  #initAuthClientPromise?: Promise<void> = undefined
  #authClient?: InstanceType<typeof AuthClient> = undefined

  public constructor(options: WalletConnectModalAuthOptions) {
    this.#options = options
    this.#modal = this.#initModal()
    this.#initAuthClient()
  }

  // -- public ------------------------------------------------------------
  public async signIn(args: WalletConnectModalAuthSignInArguments) {
    const { chainId, statement, aud, domain } = args
    const defaultChainId = chainId ?? 'eip155:1'
    const defaultAud = aud ?? location.href
    const defaultDomain = domain ?? location.host

    return new Promise<{ valid: boolean; address: string; cacao: Record<string, string> }>(
      async (resolve, reject) => {
        if (!this.#authClient) {
          await this.#initAuthClient()
        }

        const unsubscribeModal = this.#modal.subscribeModal(state => {
          if (!state.open) {
            unsubscribeModal()
            reject(new Error('Modal closed'))
          }
        })

        this.#authClient!.once('auth_response', ({ params }) => {
          unsubscribeModal()
          this.#modal.closeModal()
          // @ts-expect-error - result exists
          if (params.result) {
            resolve({
              valid: true,
              // @ts-expect-error - result exists
              address: params.result.p.iss.split(':')[4],
              // @ts-expect-error - result exists
              cacao: params.result
            })
          } else {
            // @ts-expect-error - message exists
            reject(new Error(params.message))
          }
        })

        const { uri } = await this.#authClient!.request({
          aud: defaultAud,
          domain: defaultDomain,
          chainId: defaultChainId,
          type: 'eip4361',
          nonce: generateNonce(),
          statement
        })

        if (uri) {
          await this.#modal.openModal({ uri, chains: [defaultChainId] })
        }
      }
    )
  }

  // -- private -----------------------------------------------------------
  #initModal() {
    const { modalOptions, projectId } = this.#options

    return new WalletConnectModal({
      ...modalOptions,
      enableAuthMode: true,
      projectId
    })
  }

  async #initAuthClient() {
    if (!this.#initAuthClientPromise && typeof window !== 'undefined') {
      this.#initAuthClientPromise = this.#createAuthClient()
    }

    return this.#initAuthClientPromise
  }

  async #createAuthClient() {
    this.#authClient = await AuthClient.init({
      metadata: this.#options.metadata,
      projectId: this.#options.projectId
    })
  }
}
