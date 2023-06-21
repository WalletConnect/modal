# Development

## Workspace setup

Install dependencies from the repository's root directory (this will also set up each workspace):

```bash
npm install
```

## .env.local file setup

Laboratory has `.env.local.example` file. Copy its content and create new `.env.local` file in the same directory.
Without these `npm run build` command will fail. To create your ProjectID head to [cloud.walletconnect.com](https://cloud.walletconnect.com/)

## Commands

Please execute all commands from the monorepo root to avoid issues with npm workspaces. Running `build` command is required if this is your first time setting up the monorepo.

- `npm run build` - Build all packages.
- `npm run dev` - Build and watch all packages for changes.
- `npm run lab` - Run laboratory example (has to be ran together with `npm run dev` in a separate terminal tab).
- `npm run lint` - Run the linter.
- `npm run prettier` - Run prettier.
- `npm run typecheck` - Run typescript checks.

## Repository structure

- `laboratory` - WaleltConnectModal test playground
- `packages`
  - `core` - State, proxy between ui and chain packages
  - `ui` - Web-components based ui of WaleltConnectModal
    - `components` - Basic ui components
    - `partials` - Complex ui pieces composing multiple components and accessing core
    - `views` - Full WaleltConnectModal views
- `projects`
  - `modal-auth-html` - Modal pre-bundled with WalletConnect auth-client for plain html use
  - `modal-auth-react` - Modal pre-bundled with WalletConnect auth-client for react use
  - `modal-sign-html` - Modal pre-bundled with WalletConnect sign-client for plain html use
  - `modal-sign-react` - Modal pre-bundled with WalletConnect sign-client for react use
  - `modal` - Barebones modal without any clients
