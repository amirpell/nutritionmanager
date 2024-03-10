import React ,{ useEffect ,useState} from 'react'
import axios from 'axios'
function Notifications() {
    const [message , setMessage] = useState();
    const [user , setUser] = useState();
    console.log("asdasdasdasda" ,message?.data)
 const mapmessages = message?.data
const getData=async()=>{
    try{
        const response = await axios.post("/api/user/get-user-info-by-id" , {} , {
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
        console.log(response.data)
        setUser(response.data)
    }catch(error){      
        console.log(error)

    }
}
    useEffect(()=> {
        getData();
    }, []);

    const getDataM=async()=>{
        try{
            const response = await axios.post("/api/user/get-member-info-by-id" , {} , {
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token"),
                },
            });
            console.log(response.data)
            window.onload = function() {
                if(!window.location.hash) {
                    window.location = window.location + '#loaded';
                    window.location.reload();
                }
            }
            setUser(response.data)

        }catch(error){      
            console.log(error)
        }
    }
        useEffect(()=> {
            getDataM();
        }, []);
       

    const getmessages=async()=>{
        try{
            const response = await axios.post("/api/user/get-messages" , {} , {
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
            setMessage(response.data)
            console.log(response.data)
        }catch(error){      
            console.log(error)
    
        }
    }
        useEffect(()=> {
            getmessages();
        }, []);
  return (
       <div>
  {mapmessages?.map((item , index)=>
               { return <div >
               <div className='member-list' key={item._id}>
                <div className='member-name'>{item.from}</div>
                <div className='member-email'>{item.to}</div>

                <div className='member-boss'>{item.messages}</div>

            
                           

              
              </div> </div>
                })}
       </div>
    


  )
}

export default Notifications;
