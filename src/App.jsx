import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Appbar from './components/Appbar/Appbar'
import Coin from './components/Coin/Coin'
import Customize from './components/Customize/Customize'
import Top from './components/Top/Top'

function App() {

  return (
    <div className='App'>
      <Top />
      <Routes>
        <Route path='/' element={<Coin />}/>
        <Route path='/upgrade' element={<Customize />}/>
      </Routes>
      <Appbar />
    </div>
  )
}

export default App
