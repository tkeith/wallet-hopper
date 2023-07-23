import { ThemingProps } from '@chakra-ui/react'
import { mainnet, sepolia, polygon, optimism, arbitrum } from '@wagmi/chains'

export const SITE_NAME = 'Wallet Hopper'
export const SITE_DESCRIPTION = 'Reducing blockchain anxiety since 2023'
export const SITE_URL = 'https://wallethopper.com/'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'tsrkeith'
export const SOCIAL_GITHUB = 'tkeith/wallethopper'

export const ETH_CHAINS = [mainnet, sepolia, polygon, optimism, arbitrum]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'qp5mGdUDT2n5T7x1LrGQe5OUwCnai62y',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
