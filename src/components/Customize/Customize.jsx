import { useContext } from "react"
import notcoin from '../../assets/coin.svg'

import './Customize.scss'
import { Context } from "../../Context/Context"
import { Button } from "@mui/material"

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
  const { setEnergy } = useContext(Context)

  const { rocket, setRocket } = useContext(Context)
  const { setUseRocket } = useContext(Context)

  const { power, setPower } = useContext(Context)

  const { setOpen } = useContext(Context);

  // const { setValue } = useContext(Context)
  const { snackMsg, setSnackMsg } = useContext(Context)

  // const navigate = useNavigate()

  const handleClick = (msg, status) => {
    setOpen(true);
    setSnackMsg({
      msg: msg,
      status: status,
    })
    console.log(snackMsg.status);
    // if (snackMsg.status == "success") {
    //   setValue('/');
    //   navigate('/');
    //   return;
    // }
  };

  return (
    <div className="boost">
      <div className="helpers">
        <Button className="helpers__btn" onClick={() => {
          if (rocket >= 1) {
            setRocket(rocket - 1)
            setUseRocket(true)
            handleClick("Boosted successfully", "success")
          }
          else {
            handleClick("You haven't any type of this boost", "error")
          }
        }}>
          <RocketLaunchIcon sx={{fontSize: "38px", marginRight: "5px", color: 'red'}} /> 
          <div>
            <b>Tap Boost</b>
            <p>{rocket} / 3</p>
          </div>
        </Button>
        <Button className="helpers__btn" onClick={() => {
          if (power >= 1) {
            setPower(power - 1)
            setEnergy(energyLevel * 500)
            handleClick("Boosted successfully", "success")
          }
          else {
            handleClick("You haven't any type of this boost")
          }
        }}>
          <BatteryFullIcon sx={{fontSize: "38px", marginRight: "5px", color: 'green'}} />
          <div>
            <b>Full Energy</b>
            <p>{power} / 3</p>
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
            handleClick("You haven't enough coins to upgrade this", "error")
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
            handleClick("You haven't enough coins to upgrade this", "error")
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
            setOpen(true)
            handleClick("You have reached the maximum upgrade level", "error")
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
            handleClick("You haven't enough coins to upgrade this", "error")
          }
        }}>
          <div>
            <ElectricBoltIcon sx={{color: '#0059FF'}} /> <b>Energy grow up: {energyGrowLevel} lvl</b>
          </div>
          <div>
            {energyGrowLevel >= 5 ? `MAX` : energyGrowPrice} <img src={notcoin} alt={notcoin} /> <NavigateNextIcon />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Customize