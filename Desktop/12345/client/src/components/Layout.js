import React  from 'react'
import  "../layout.css"
import {Link, useLocation} from 'react-router-dom';

function Layout({children}) {

    const location = useLocation();
 const userMenu =[
    {
        name:'Home'
        ,path:'/',
        icon:'ri-home-line'
    },
    {
        name:'Cart'
        ,path:'/page',
        icon:'ri-file-list-line'
    },

    {
        name:'Logout'
        ,path:'/logout',
        icon:'ri-login-box-line'
    }
 ];
 const menuToBeRendered = userMenu;
 
    return (
    <div className='main'>
        
      <div className='d-flex layout'>

    <div className='content'>
    <div className='header'>
    <div className='sidebar'>

        
<div className='menu'>
{menuToBeRendered.map((menu) => {
    const isActive = location.pathname === menu.path
    return <div className={`menu-item ${isActive && 'active-menu-item'}`}>
        <i className={menu.icon}></i>

        { <Link to={menu.path}>{menu.name}</Link>}

    </div>
})}

</div>

</div>
   
        </div>
        <div className='body'>
        {children}
    </div>
    </div>
    <div className='buy'>
        <h1>BUY NOW</h1>
      </div>
      </div>
    
    </div>
  )
}

export default Layout
