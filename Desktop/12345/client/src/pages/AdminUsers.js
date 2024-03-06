import Layout from '../components/Layout';
import React , {useEffect ,useState} from 'react'
import {useSelector} from 'react-redux';
import axios from "axios";
function AdminUsers() {

    if(!localStorage.loaded) {
        localStorage.setItem('loaded', 'yes')
        window.location.reload();
    }

    const {user} = useSelector((state) => state.user)
    const adminusers = user?.clients
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
    
    {adminusers?.map((user) => {
                return <h1>{user}</h1>


            })}
         
    {mapmembers?.email?.map((name) => {
                return <h1>{name}</h1>


            })}
             {mapmembers?.map((item,key)=>
               { return <tr key={key}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.boss}</td>

              </tr>
                
                })}
  
            <h1>
            </h1>
          
      </Layout>
    </div>
  )
}

export default AdminUsers
