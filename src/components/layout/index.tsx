import React, { ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import TabSet from 'components/TabSet'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <Box margin="0 auto" minH="100vh">
      <Container maxW="container.lg">
        <Header />
        <TabSet />
        {props.children}
      </Container>

      {/* <Box position="fixed" bottom={2} right={2}>
        <NetworkStatus />
      </Box>

      <Footer /> */}
    </Box>
  )
}
