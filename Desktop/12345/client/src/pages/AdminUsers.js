import Layout from '../components/Layout';
import React , {useEffect ,useState} from 'react'
import axios from "axios";
import '../../src/list.css'
import { PlusOutlined } from '@ant-design/icons';

import { Button } from 'antd';
import {Link} from 'react-router-dom'
function AdminUsers() {
    if(!localStorage.loaded) {
        localStorage.setItem('loaded', 'yes')
        window.location.reload();
    }
    const [member , setMember] = useState();
   const mapmembers = member?.adminmembers;
    console.log("ppppp", member?.adminmembers)
    const getData=async()=>{
        try{
            const response = await axios.post("/api/user/get-posts" , {} , {
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token"),
                },
            });
            window.onload = function() {
                if(!window.location.hash) {
                    window.location = window.location + '#loaded';
                    window.location.reload();
                }
            }
            console.log("asdiasjd", response.data)
            setMember(response.data)

        }catch(error){      
            console.log(error)
    
        }
    }
        useEffect(()=> {
            getData();
        }, []);
       
  return (
    <div>
      <Layout>
<div>
 <Link style={{ textDecoration: 'none' }} to="/adduser" >  <Button icon={<PlusOutlined />}  type="primary"
                                className='add-user'></Button>
 
 </Link>
</div>
 <div className='header-list'>
      <div className='name'>name</div>
      <div className='email'>email</div>
      <div className='token'>token</div>
</div>
  
             {mapmembers?.map((item,key)=>
               { return <div >
               <div className='member-list' key={key}>
                <div className='member-name'>{item.name}</div>
                <div className='member-email'>{item.email}</div>
                <div className='member-boss'>{item.boss}</div>

              </div>
              </div>
                })}
  
            <h1>
            </h1>
          
      </Layout>
    </div>
  )
}

export default AdminUsers
