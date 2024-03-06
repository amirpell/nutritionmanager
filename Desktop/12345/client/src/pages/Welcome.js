import React from 'react'
import { Button} from 'antd'
import {  useNavigate} from 'react-router-dom'

function Welcome() {
    const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => {
    navigate("/login");
 }}>כניסה לאדמין</Button>
      <Button onClick={() => {
    navigate("/userlogin");
 }}>כניסה ללקוחות</Button>

    </div>
  )
}

export default Welcome
