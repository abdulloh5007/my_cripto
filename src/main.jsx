import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProviderContext } from './Context/Context.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProviderContext>
      <Provider store={store}>
        <App />
      </Provider>
    </ProviderContext>
  </BrowserRouter>
)
