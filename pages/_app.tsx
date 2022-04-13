import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/base/Header'
import Footer from '../components/base/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex- flex-col-'>
      <Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </div>
  )
}

export default MyApp
