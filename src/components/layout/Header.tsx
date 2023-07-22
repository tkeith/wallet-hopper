import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading } from '@chakra-ui/react'
import { SITE_NAME } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { PassportScore } from './PassportScore'
import { Web3Button } from '@web3modal/react'
import Image from 'next/image'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex as="header" className={className} px={4} py={2} mb={8} alignItems="center">
      <LinkComponent href="/">
        <Heading as="h1" size="lg" className="flex items-center space-x-6">
          <Image src="/header-logo.png" alt="Logo" width={100} height={96} /> <span>Wallet Hopper</span>
        </Heading>
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        <PassportScore />
        <Web3Button icon="hide" label="Connect" />
      </Flex>
    </Flex>
  )
}
