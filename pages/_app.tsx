import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import {BrowserRouter, Route} from 'react-router-dom'
import Editar from '../pages/editar'


 export default function MyApp({ Component, pageProps}: AppProps) {
  const router = useRouter()
  return (
    
 
    <Component  {...pageProps} />
    
    
  
  )
  
}


