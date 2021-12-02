import { Flex, Spinner } from '@chakra-ui/react'
import NextImage from 'next/image'
import { FC, Suspense, lazy } from 'react'

const Layout = lazy(() => import('@components/Layout'))

const Home: FC = () => (
  <Suspense
    fallback={
      <Flex h="100vh" w="full" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    }
  >
    <Layout title="Welcome to HOV">
      <Flex p={8} alignItems="center" justifyContent="center">
        <NextImage src="/logo.png" width={200} height={200} />
      </Flex>
    </Layout>
  </Suspense>
)

export default Home
