import './Coin.scss'
import notcoin from '../../assets/coin.svg'
import { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'

function Coin() {
    // MuLTI-TAP
    const { tap, setTap } = useContext(Context)
    const { tapLevel, setTapLevel } = useContext(Context)

    // ENERGY
    const { energyLevel } = useContext(Context)
    const { energy, setEnergy } = useContext(Context)

    // ROCKET
    const { useRocket, setUseRocket } = useContext(Context)

    useEffect(() => {
        if (useRocket === false) {
            return;
        }

        setTapLevel(prevTapLevel => prevTapLevel * 5);

        const interval = setTimeout(() => {
            setTapLevel(prevTapLevel => prevTapLevel / 5);
            setUseRocket(false)
        }, 3000);

        return () => clearTimeout(interval);
    }, [useRocket, setTapLevel, setUseRocket]);

    // window.addEventListener('online', console.log('on'))
    // window.addEventListener('offline', () => {
    //     console.log();
    // })
    return (
        <div className='coin'>
            <button className='coin__btn' onClick={() => {
                if (energy >= tapLevel) {
                    setTap(tap + tapLevel)
                    setEnergy(energy - tapLevel)
                    const heart = document.createElement('div');
                    const heartContainer = document.querySelector('.coin__btn');
                    heart.classList.add('heart');

                    // Добавляем сердечко в контейнер
                    heartContainer.appendChild(heart);

                    // Удаляем сердечко после завершения анимации
                    heart.addEventListener('animationend', () => {
                        heart.remove();
                    });
                }
                else {
                    alert("Please wait...")
                }
            }}>
                <img className='bigCoin' src={notcoin} alt={notcoin} />
            </button>
            <progress id='p1' value={energy} max={energyLevel * 500}></progress>
            <b>{energy} / {energyLevel * 500}</b>
        </div>
    )
}

export default Coin