import Layout from '../components/Layout';
import React , {useEffect ,useState} from 'react'
import axios from "axios";
import '../../src/list.css'
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {Link } from 'react-router-dom'

function AdminUsers() {
const [sendid,setSendid] = useState("")

    const testing = async(e) => {
     
        setSendid(e.target.value)
        console.log(sendid)

    }



    if(!localStorage.loaded) {
        localStorage.setItem('loaded', 'yes')
        window.location.reload();
    }
    const [member , setMember] = useState();
   const mapmembers = member?.adminmembers;
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
 <Link className="add-user-link" style={{ textDecoration: 'none', }} to="/adduser" >  <Button icon={<PlusOutlined />}  type="primary"
                                className='add-user'></Button>
 
 </Link>
</div>

 <div className='header-list'>
      <div className='name'>name</div>
      <div className='name'>email</div>
      <div className='name'>token</div>
</div>
  
             {mapmembers?.map((item)=>
               { return <div >
               <div className='member-list' key={item._id}>
                <div className='member-name'>{item.name}</div>
                <div className='member-email'>{item.email}</div>
                <div  className='member-boss'>{item._id}</div>

               < Button value={item._id}
onClick={testing}
                >
               </Button>
               
            
               <Link to="/message" state={{ fromHome: { sendid } }}>
               
               to Other Component</Link>                 
 

              
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
