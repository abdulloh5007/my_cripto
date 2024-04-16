import './Coin.scss'
import notcoin from '../../assets/coin.svg'
import { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe, selectIsAuth } from '../../redux/slices/auth'
import { Box, Button, Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'

function Coin() {
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector((state) => state.auth.data)

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

    // GETTING INFORMARTION ABOUT USER

    const dispatch = useDispatch()
    // const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [dispatch])

    useEffect(() => {
        console.log(userData);
    }, [userData])

    const checkUser = (need, err) => {
        return userData != null ? userData?.[need] : err
    }

    return (
        <div className='coin'>
            <h2>{checkUser('fullName', 'Demo')}</h2>
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
            <progress id='p1' value={checkUser('energyHave', energy)} max={energyLevel * 500}></progress>
            <b>{checkUser('energyHave', energy)} / {energyLevel * 500}</b>

            <div className="auth">
                <h2>New Feature</h2>
                <Box
                    sx={{
                        bgcolor: 'white',
                        p: 1,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={200}
                        height={40}
                    />
                </Box>
                <Link to='/login' style={{ display: isAuth ? 'none' : 'block' }}>
                    <Button variant='contained' color='primary' fullWidth>
                        Log In
                    </Button>
                </Link>
                <Link to='/register' style={{ display: isAuth ? 'none' : 'block' }}>
                    <Button variant='contained' color='inherit' fullWidth>
                        Sign Up
                    </Button>
                </Link>

                <Button variant='contained' color='inherit' fullWidth style={{ display: !isAuth ? 'none' : 'block' }} onClick={() => {
                    window.localStorage.setItem('token', 'not signed')
                    window.location.reload()
                }}>
                    Log Out to demo
                </Button>
            </div>
        </div>
    )
}

export default Coin