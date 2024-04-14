import React, { useContext, useState } from "react"
import notcoin from '../../assets/coin.svg'

import './Customize.scss'
import { Context } from "../../Context/Context"
import { Button, IconButton, Snackbar } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import { useNavigate } from "react-router-dom"
function Customize() {
  // MuLTI-TAP
  const { tap, setTap } = useContext(Context)
  const { tapLevel, setTapLevel } = useContext(Context)
  const { tapPrice, setTapPrice } = useContext(Context)

  // GROW
  const { energyGrowLevel, setEnergyGrowLevel } = useContext(Context)
  const { energyGrowPrice, setEnergyGrowPrice } = useContext(Context)

  // ENERGY
  const { energyLevel, setEnergyLevel } = useContext(Context)
  const { energyUpLevelPrice, setEnergyUpLevelPrice } = useContext(Context)

  const { rocket, setRocket } = useContext(Context)
  const { setUseRocket } = useContext(Context)

  const [open, setOpen] = useState(false);
  const [maxOpen, setMaxOpen] = useState(false)

  const { setValue } = useContext(Context)

  const navigate = useNavigate()

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMaxOpen(false)
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="error"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="boost">
      <div className="helpers">
        <Button className="helpers__btn" onClick={() => {
          if (rocket >= 1) {
            setRocket(rocket - 1)
            setUseRocket(true)
            navigate('/')
            setValue('/')
          }
          else {
            alert("No")
          }
        }}>
          <RocketLaunchIcon sx={{fontSize: "38px", marginRight: "5px", color: 'red'}} /> 
          <div>
            <b>Tap Boost</b>
            <p>{rocket} / 3</p>
          </div>
        </Button>
        <Button className="helpers__btn">
          <BatteryFullIcon sx={{fontSize: "38px", marginRight: "5px", color: 'green'}} />
          <div>
            <b>Full Energy</b>
            <p>3 / 3</p>
          </div>
        </Button>
      </div>
      <div className="upgrade">
        <button className="myBtn tapLevelUp" onClick={() => {
          if (tap >= tapPrice) {
            setTapPrice(tapPrice * 2)
            setTapLevel(tapLevel + 1)
            setTap(tap - tapPrice)
          }
          else {
            handleClick()
          }
        }}>
          <div>
            <TouchAppIcon sx={{color: '#E48F07'}} /> <b>Multi tap: {tapLevel} lvl</b>
          </div>
          <div>
            {tapPrice} <img src={notcoin} alt={notcoin} /> <NavigateNextIcon />
          </div>
        </button>
        <button className="myBtn energyLevelUp" onClick={() => {
          if (tap >= energyUpLevelPrice) {
            setTap(tap - energyUpLevelPrice)
            setEnergyUpLevelPrice(energyUpLevelPrice * 2)
            setEnergyLevel(energyLevel + 1)
          }
          else {
            handleClick()
          }
        }}>
          <div>
            <BatteryChargingFullIcon sx={{color: 'green'}} /> <b>Energy limit: {energyLevel} lvl</b>
          </div>
          <div>
            {energyUpLevelPrice} <img src={notcoin} alt={notcoin} /> <NavigateNextIcon />
          </div>
        </button>
        <button className="myBtn energyGrowLevelUp" onClick={() => {
          if (energyGrowLevel >= 5) {
            setMaxOpen(true)
            return;
          }
          if (tap >= energyGrowPrice) {
            setTap(tap - energyGrowPrice)
            setEnergyGrowLevel(energyGrowLevel + 1)
            if (energyGrowLevel === 1) {
              setEnergyGrowPrice(energyGrowPrice * 5)
              return;
            }
            setEnergyGrowPrice(energyGrowPrice * 2)
          }
          else {
            handleClick()
          }
        }}>
          <div>
            <ElectricBoltIcon sx={{color: '#0059FF'}} /> <b>Energy grow up: {energyGrowLevel} lvl</b>
          </div>
          <div>
            {energyGrowLevel >= 5 ? `MAX` : energyGrowPrice} <img src={notcoin} alt={notcoin} /> <NavigateNextIcon />
          </div>
        </button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="You haven't enough coins to upgrade this"
          action={action}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={maxOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          message="You have reached the maximum upgrade level"
          action={action}
        />
      </div>
    </div>
  )
}

export default Customize