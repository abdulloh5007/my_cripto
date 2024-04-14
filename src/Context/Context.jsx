import { useState } from "react";
import { createContext } from "react";

const Context = createContext()

function Provider({ children }) {
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

    // ROCKET
    const [rocket, setRocket] = useState(3)
    const [useRocket, setUseRocket] = useState(false)

    const [value, setValue] = useState(window.location.pathname)

    return (
        <Context.Provider value={{ tap, setTap, tapLevel, setTapLevel, tapPrice, setTapPrice, energyGrowLevel, setEnergyGrowLevel, energyGrowPrice, setEnergyGrowPrice, energyUpLevelPrice, setEnergyUpLevelPrice, energyLevel, setEnergyLevel, energy, setEnergy, rocket, setRocket, useRocket, setUseRocket, value, setValue }}>
            {children}
        </Context.Provider>
    )
}

export {
    Context,
    Provider
}