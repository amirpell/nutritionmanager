import React , {useState} from 'react'
import  "../layout.css"
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSelector } from 'react-redux'
function Layout({children}) {
    
        if(!localStorage.loaded) {
            localStorage.setItem('loaded', 'yes')
            window.location.reload();
        }
    
    const navigate = useNavigate();
    const [collapsed , setCollapsed] = useState(false);
    const {user} = useSelector((state) => state.user)
    const location = useLocation();
    
 const userMenu =[
    {
        name:'Home'
        ,path:'/',
        icon:'ri-home-line'
        
    },
    {
        name:'My order'
        ,path:'/page',
        icon:'ri-file-list-line'
    }
    ,{
        name:'Profile'
        ,path:'/profile',
        icon:'ri-user-line'
    },
    
 ];
 const adminMenu =[
    {
        name:'בית'
        ,path:'/',
        icon:'ri-home-line'
    }
    ,{
        name:'לקוחות'
        ,path:'/AdminUsers',
        icon:'ri-user-line'
    },
    {
        name:'מאכלים'
        ,path:'/Foods',
        icon:'ri-user-line'
    },
    {
        name:'הודעות'
        ,path:'/notifications',
        icon:'ri-user-line'
    },
    
 ];


 const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  

    return (
    <div className='main'>
      <div className='side-menu'>
 

    <div className='content'>
    
    <div className='header'>
  

<Link className='anchor' to="/pro">{user?.name}  :שם</Link>
<Link className='anchor' to="/pro">{user?.email}  :אימייל</Link>
{collapsed  ?(
    < i className="ri-menu-2-fill header-action-icon"onClick={()=> setCollapsed(false)} ></i>


   ):(
    < i className="ri-close-fill header-action-icon"onClick={()=> setCollapsed(true)}></i>
   )
    

} 
     </div>
        <div className='body'>
        {children}
    </div>
    </div>
    <div className={`sidebar ${collapsed && 'sidebar-collapsed'}`}>

        
<div className='sidebar-header'>
    <h1 className='app-logo'>שם\לוגו</h1>
</div>
<div className='menu'>
    {menuToBeRendered.map((menu) => {
        const isActive = location.pathname === menu.path
        return <div className={`menu-item ${isActive && 'active-menu-item'}`}>

            {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
            <i className={menu.icon}></i>

        </div>
    })}
<div className='menu-item' onClick={() => {
localStorage.clear();
navigate("/login");
}}>


 {!collapsed && <Link to="/login">התנתק</Link>}
 <i className='ri-logout-circle-line'></i>

        </div>
 
</div>

</div>
      </div>
    </div>
  )
}

export default Layout
