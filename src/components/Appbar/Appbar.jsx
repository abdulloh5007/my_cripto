import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import './Appbar.scss'
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Context } from '../../Context/Context';

export default function Appbar() {
    const navigate = useNavigate()
    const { value, setValue } = React.useContext(Context);
    const { useRocket } = React.useContext(Context)

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <div>
            <BottomNavigation value={value} sx={{ width: '100vw' }} onChange={handleChange}>
                <BottomNavigationAction
                    label="Recents"
                    value="/"
                    onClick={() => navigate('/')}
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Nearby"
                    value="/missions"
                    onClick={() => navigate('/missions')}
                    icon={<NearMeIcon />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="/upgrade"
                    onClick={() => navigate('/upgrade')}
                    icon={<RocketLaunchIcon />}
                    disabled={useRocket == true}
                />
            </BottomNavigation>
        </div>
    );
}