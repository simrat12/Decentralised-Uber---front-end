import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'


function MyApp({ Component, pageProps }) {
  return (
  <div>
    <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} />
    </MoralisProvider>
  </div>
  )
}

export default MyApp
