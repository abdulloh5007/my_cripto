import { useContext } from "react"
import './Top.scss'
import { Context } from "../../Context/Context"

function Top() {
  const {tap} = useContext(Context) 

  return (
    <div className="top">
      <b>{tap}</b>
    </div>
  )
}

export default Top