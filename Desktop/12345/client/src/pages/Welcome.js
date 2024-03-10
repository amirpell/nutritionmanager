import React from 'react'
import { Button} from 'antd'
import {  useNavigate ,useLocation} from 'react-router-dom'
import '../welcome.css'

import welcome from '../pages/welcomebackground.jpeg'
function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();

 

  return (
    <div className='welcome-container'>
      <div className='welcome-image'>
        
      </div>
      <img className='logo' src={require('./logo.png')} alt='/'/>

<div className='welcome-card'>
  <div className='welcome-card-header'>
  <div className='welcome-menu'>
   <div className='menubtn'>
    צור קשר
   </div>
   <div className='menubtn'>
    המנוי שלנו
   </div>
   <div className='menubtn'>
מה אומרים עלינו   </div>
   <div className='menubtn'>
מי אנחנו   </div>
   <div className='menubtn'>
מה אנחנו מציעים   </div>
   <div className='menubtn'>
היתרונות שלנו   </div>
 
</div>
  </div>
  <div className='texting'>
    <h1 className='text-welcome'>NUTRITION MANAGERברוכים הבאים ל</h1>
    <h1 className='text2-welcome'>!בניית תפריט בצורה מקצועית, נוחה ומהירה</h1>

  </div>
      <div className='btns'>
             <Button className='login-btn' onClick={() => {
    navigate("/login");
 }}>כניסה ליועצי תזונה</Button>
      <Button  className='login-btn' onClick={() => {
    navigate("/userlogin");
 }}>כניסה לקוחות</Button>
</div>

</div>




    </div>
  )
}

export default Welcome
