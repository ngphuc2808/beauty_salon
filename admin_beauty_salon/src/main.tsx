import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'remixicon/fonts/remixicon.css'

import App from './main/App.tsx'
import './main/global.css'
import { GlobalProvider } from './contexts/globalContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalProvider>
  </BrowserRouter>,
)
