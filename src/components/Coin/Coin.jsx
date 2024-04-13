import './Coin.scss'
import notcoin from '../../assets/coin.svg'
import { useEffect, useState } from 'react'

function Coin() {
    // MuLTI-TAP
    const [tap, setTap] = useState(0)
    const [tapLevel, setTapLevel] = useState(1)
    const [tapPrice, setTapPrice] = useState(100)

    // GROW
    const [energyGrowLevel, setEnergyGrowLevel] = useState(1)
    const [energyGrowPrice, setEnergyGrowPrice] = useState(100)

    // ENERGY
    const [energyLevel, setEnergyLevel] = useState(1)
    const [energyUpLevelPrice, setEnergyUpLevelPrice] = useState(100)
    const [energy, setEnergy] = useState(500 * energyLevel)

    useEffect(() => {
        if (energy >= energyLevel * 500) {
            setEnergy(energyLevel * 500)
            return;
        }
        const interval = setInterval(() => {
            setEnergy(energy => energy + energyGrowLevel);
        }, 1000);

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [energyLevel, energy, energyGrowLevel]);

    // window.addEventListener('online', console.log('on'))
    // window.addEventListener('offline', () => {
    //     console.log();
    // })

    return (
        <div className='coin'>
            <b>{tap}</b>
            <button className='coin__btn' onClick={() => {
                if (energy >= tapLevel) {
                    setTap(tap + tapLevel)
                    setEnergy(energy - tapLevel)
                }
                else {
                    alert("Please wait...")
                }
            }}>
                <img className='bigCoin' src={notcoin} alt={notcoin} />
            </button>
            <progress id='p1' value={energy} max={energyLevel * 500}></progress>
            <b>{energy}</b>
            <div className="upgrade">
                <button className="tapLevelUp" onClick={() => {
                    if (tap >= tapPrice) {
                        setTapPrice(tapPrice * 2)
                        setTapLevel(tapLevel + 1)
                        setTap(tap - tapPrice)
                    }
                    else {
                        alert("You haven't enough coins to upgrade")
                    }
                }}>
                    Multi tap: {tapLevel} lvl
                    <div>
                        {tapPrice} <img src={notcoin} alt={notcoin} />
                    </div>
                </button>
                <button className="energyLevelUp" onClick={() => {
                    if (tap >= energyUpLevelPrice) {
                        setTap(tap - energyUpLevelPrice)
                        setEnergyUpLevelPrice(energyUpLevelPrice * 2)
                        setEnergyLevel(energyLevel + 1)
                    }
                    else {
                        alert("You haven't enough coins to upgrade")
                    }
                }}>
                    Energy limit: {energyLevel} lvl
                    <div>
                        {energyUpLevelPrice} <img src={notcoin} alt={notcoin} />
                    </div>
                </button>
                <button className="energyGrowLevelUp" onClick={() => {
                    if (energyGrowLevel >= 5) {
                        alert("You have reached the maximum upgrade level")
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
                        alert("You haven't enough coins to upgrade")
                    }
                }}>
                    Energy grow up: {energyGrowLevel} lvl
                    <div>
                        {energyGrowLevel >= 5 ? `MAX` : energyGrowPrice} <img src={notcoin} alt={notcoin} />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Coin