import { Button, Card } from '@nextui-org/react'
import { WalletConnectModalAuth } from '@walletconnect/modal-auth-html'
import { NotificationCtrl } from '../../controllers/NotificationCtrl'
import { DEMO_METADATA, DEMO_STATEMENT } from '../../data/Constants'
import { getProjectId, getTheme } from '../../utilities/EnvUtil'

const web3ModalAuth = new WalletConnectModalAuth({
  projectId: getProjectId(),
  modalOptions: { themeMode: getTheme() },
  metadata: DEMO_METADATA
})

export default function WithAuthHtmlPage() {
  async function onSignIn() {
    try {
      const data = await web3ModalAuth.signIn(DEMO_STATEMENT)
      NotificationCtrl.open('Sign In', JSON.stringify(data, null, 2))
    } catch (error) {
      NotificationCtrl.open('Sign In', JSON.stringify(error, null, 2))
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
    </>
  )
}
