import { Button, Card } from '@nextui-org/react'
import { WalletConnectModalAuth, useSignIn } from '@walletconnect/modal-auth-react'
import { NotificationCtrl } from '../../controllers/NotificationCtrl'
import { DEMO_METADATA, DEMO_STATEMENT } from '../../data/Constants'
import { getProjectId, getTheme } from '../../utilities/EnvUtil'
import { getErrorMessage, showErrorToast } from '../../utilities/ErrorUtil'

export default function WithAuthReactPage() {
  const { signIn } = useSignIn(DEMO_STATEMENT)

  async function onSignIn() {
    try {
      const data = await signIn()
      NotificationCtrl.open('Sign In', JSON.stringify(data, null, 2))
    } catch (error) {
      const message = getErrorMessage(error)
      showErrorToast(message)
    }
  }

  return (
    <>
      <Card css={{ maxWidth: '400px', margin: '100px auto' }} variant="bordered">
        <Card.Body css={{ justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Button shadow color="success" onPress={onSignIn}>
            Sign In With Wallet
          </Button>
        </Card.Body>
      </Card>

      <WalletConnectModalAuth
        projectId={getProjectId()}
        modalOptions={{ themeMode: getTheme() }}
        metadata={DEMO_METADATA}
      />
    </>
  )
}
