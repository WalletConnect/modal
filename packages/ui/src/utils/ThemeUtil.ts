import { ThemeCtrl } from '@walletconnect/modal-core'
import { css } from 'lit'

function themeModeVariables() {
  const themeMode = ThemeCtrl.state.themeMode ?? 'dark'
  const themeModePresets = {
    light: {
      foreground: { 1: `rgb(20,20,20)`, 2: `rgb(121,134,134)`, 3: `rgb(158,169,169)` },
      background: { 1: `rgb(255,255,255)`, 2: `rgb(241,243,243)`, 3: `rgb(228,231,231)` },
      overlay: 'rgba(0,0,0,0.1)'
    },
    dark: {
      foreground: { 1: `rgb(228,231,231)`, 2: `rgb(148,158,158)`, 3: `rgb(110,119,119)` },
      background: { 1: `rgb(20,20,20)`, 2: `rgb(39,42,42)`, 3: `rgb(59,64,64)` },
      overlay: 'rgba(255,255,255,0.1)'
    }
  }
  const themeModeColors = themeModePresets[themeMode]

  return {
    '--wcm-color-fg-1': themeModeColors.foreground[1],
    '--wcm-color-fg-2': themeModeColors.foreground[2],
    '--wcm-color-fg-3': themeModeColors.foreground[3],
    '--wcm-color-bg-1': themeModeColors.background[1],
    '--wcm-color-bg-2': themeModeColors.background[2],
    '--wcm-color-bg-3': themeModeColors.background[3],
    '--wcm-color-overlay': themeModeColors.overlay
  }
}

function themeVariablesPresets() {
  return {
    '--wcm-accent-color': '#3396FF',
    '--wcm-accent-fill-color': '#FFFFFF',
    '--wcm-z-index': '89',
    '--wcm-background-color': '#3396FF',
    '--wcm-background-border-radius': '8px',
    '--wcm-container-border-radius': '30px',
    '--wcm-wallet-icon-border-radius': '15px',
    '--wcm-wallet-icon-large-border-radius': '30px',
    '--wcm-wallet-icon-small-border-radius': '7px',
    '--wcm-input-border-radius': '28px',
    '--wcm-button-border-radius': '10px',
    '--wcm-notification-border-radius': '36px',
    '--wcm-secondary-button-border-radius': '28px',
    '--wcm-icon-button-border-radius': '50%',
    '--wcm-button-hover-highlight-border-radius': '10px',
    '--wcm-text-big-bold-size': '20px',
    '--wcm-text-big-bold-weight': '600',
    '--wcm-text-big-bold-line-height': '24px',
    '--wcm-text-big-bold-letter-spacing': '-0.03em',
    '--wcm-text-big-bold-text-transform': 'none',
    '--wcm-text-xsmall-bold-size': '10px',
    '--wcm-text-xsmall-bold-weight': '700',
    '--wcm-text-xsmall-bold-line-height': '12px',
    '--wcm-text-xsmall-bold-letter-spacing': '0.02em',
    '--wcm-text-xsmall-bold-text-transform': 'uppercase',
    '--wcm-text-xsmall-regular-size': '12px',
    '--wcm-text-xsmall-regular-weight': '600',
    '--wcm-text-xsmall-regular-line-height': '14px',
    '--wcm-text-xsmall-regular-letter-spacing': '-0.03em',
    '--wcm-text-xsmall-regular-text-transform': 'none',
    '--wcm-text-small-thin-size': '14px',
    '--wcm-text-small-thin-weight': '500',
    '--wcm-text-small-thin-line-height': '16px',
    '--wcm-text-small-thin-letter-spacing': '-0.03em',
    '--wcm-text-small-thin-text-transform': 'none',
    '--wcm-text-small-regular-size': '14px',
    '--wcm-text-small-regular-weight': '600',
    '--wcm-text-small-regular-line-height': '16px',
    '--wcm-text-small-regular-letter-spacing': '-0.03em',
    '--wcm-text-small-regular-text-transform': 'none',
    '--wcm-text-medium-regular-size': '16px',
    '--wcm-text-medium-regular-weight': '600',
    '--wcm-text-medium-regular-line-height': '20px',
    '--wcm-text-medium-regular-letter-spacing': '-0.03em',
    '--wcm-text-medium-regular-text-transform': 'none',
    '--wcm-font-family':
      "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
    '--wcm-font-feature-settings': `'tnum' on, 'lnum' on, 'case' on`,
    '--wcm-success-color': 'rgb(38,181,98)',
    '--wcm-error-color': 'rgb(242, 90, 103)',
    '--wcm-overlay-background-color': 'rgba(0, 0, 0, 0.3)',
    '--wcm-overlay-backdrop-filter': 'none'
  }
}

function themeBackgroundImage() {
  const { themeVariables } = ThemeCtrl.state
  const backgroundImageUrl = themeVariables?.['--wcm-background-image-url']
    ? `url(${themeVariables['--wcm-background-image-url']})`
    : 'none'

  return {
    '--wcm-background-image-url': backgroundImageUrl
  }
}

export const ThemeUtil = {
  getPreset(key: string) {
    return themeVariablesPresets()[key as never]
  },

  setTheme() {
    const root: HTMLElement | null = document.querySelector(':root')
    const { themeVariables } = ThemeCtrl.state

    if (root) {
      const variables = {
        ...themeModeVariables(),
        ...themeVariablesPresets(),
        ...themeVariables,
        ...themeBackgroundImage()
      }

      Object.entries(variables).forEach(([key, val]) => root.style.setProperty(key, val))
    }
  },

  globalCss: css`
    *,
    *::after,
    *::before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-style: normal;
      text-rendering: optimizeSpeed;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      backface-visibility: hidden;
    }

    button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border: none;
      background-color: transparent;
      transition: all 0.2s ease;
    }

    @media (hover: hover) and (pointer: fine) {
      button:active {
        transition: all 0.1s ease;
        transform: scale(0.93);
      }
    }

    button::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: background-color, 0.2s ease;
    }

    button:disabled {
      cursor: not-allowed;
    }

    button svg,
    button wcm-text {
      position: relative;
      z-index: 1;
    }

    input {
      border: none;
      outline: none;
      appearance: none;
    }

    img {
      display: block;
    }

    ::selection {
      color: var(--wcm-accent-fill-color);
      background: var(--wcm-accent-color);
    }
  `
}
