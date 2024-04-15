import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Appbar from './components/Appbar/Appbar'
import Coin from './components/Coin/Coin'
import Customize from './components/Customize/Customize'
import Top from './components/Top/Top'
import React, { useContext, useEffect } from 'react'
import { Context } from './Context/Context'
import { IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const { energy, setEnergy } = useContext(Context)
  const { energyLevel } = useContext(Context)
  const { energyGrowLevel } = useContext(Context)

  const { open, setOpen } = useContext(Context);
  const { snackMsg } = useContext(Context)
 
  useEffect(() => {
    if (energy >= energyLevel * 500) {
      setEnergy(energyLevel * 500)
      return;
    }
    const interval = setInterval(() => {
      setEnergy(energy => energy + energyGrowLevel);
    }, 1000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [energyLevel, energy, energyGrowLevel, setEnergy]);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color={snackMsg.status}
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='App'>
      <Top />
      <Routes>
        <Route path='/' element={<Coin />} />
        <Route path='/upgrade' element={<Customize />} />
      </Routes>
      <Appbar />

      {/* SNACKBAR */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackMsg.msg}
        action={action}
      />
    </div>
  )
}

export default App
