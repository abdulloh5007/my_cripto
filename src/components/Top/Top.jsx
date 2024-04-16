import { useContext } from "react"
import './Top.scss'
import { Context } from "../../Context/Context"
import { useSelector } from "react-redux"

function Top() {
  const {tap} = useContext(Context) 
  const userData = useSelector((state) => state.auth.data)

  return (
    <div className="top">
      <b>{userData != null ? userData?.uzsCoins.toLocaleString('de-DE') : tap}</b>
    </div>
  )
}

export default Top