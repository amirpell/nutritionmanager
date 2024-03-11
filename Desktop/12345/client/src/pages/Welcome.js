import React from 'react'
import { Button} from 'antd'
import {  useNavigate} from 'react-router-dom'
import '../welcome.css'

function Welcome() {
    const navigate = useNavigate();

 

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
    <h1 className='text-welcome'>NUTRITION MANAGER</h1>
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
<div className='texting2'>
    <h1 className='text3-welcome'>?מה היתרונות שלנו</h1>
    <h1 className='text4-welcome'>!הגיע זמן לבנות תפריטי תזונה בצורה מקצועית, נוחה ומהירה</h1>

  </div>

  <div className='texting3'>
    <div className='firstevent'>
  <img className='event1' src={require('./event1.png')} alt='/'/>
    <h1 className='text5-welcome'>יומן וקביעת תורים</h1>
    <h1 className='text6-welcome'>ניתן דרך התוכנה לנהל את
יומן הפגישות יחד עם קביעת 
תורים דרך האפליקציה</h1>
</div>
<div className='firstevent'>
  <img className='event1' src={require('./event2.png')} alt='/'/>
    <h1 className='text5-welcome'>ניהול ומעקב</h1>
    <h1 className='text6-welcome'>.באמצעות התוכנה ניתן לנהל ולעקוב אחרי כל הלקוחות שלכם במקום אחד</h1>
</div>
<div className='firstevent'>
  <img className='event1' src={require('./event3.png')} alt='/'/>
    <h1 className='text5-welcome'>יומן וקביעת תורים</h1>
    <h1 className='text6-welcome'>ניתן דרך התוכנה לנהל את
יומן הפגישות יחד עם קביעת 
תורים דרך האפליקציה</h1>
</div>
<div className='firstevent'>
  <img className='event1' src={require('./event4.png')} alt='/'/>
    <h1 className='text5-welcome'>יומן וקביעת תורים</h1>
    <h1 className='text6-welcome'>ניתן דרך התוכנה לנהל את
יומן הפגישות יחד עם קביעת 
תורים דרך האפליקציה</h1>
</div>
<div className='firstevent'>
  <img className='event1' src={require('./event5.png')} alt='/'/>
    <h1 className='text5-welcome'>יומן וקביעת תורים</h1>
    <h1 className='text6-welcome'>ניתן דרך התוכנה לנהל את
יומן הפגישות יחד עם קביעת 
תורים דרך האפליקציה</h1>
</div>
  </div>
</div>




    </div>
  )
}

export default Welcome
