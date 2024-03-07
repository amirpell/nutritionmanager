import React ,{useEffect}  from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
function Verify() {
  const param = useParams();
  const Verifyemail=async()=>{
    try{
        const response = await axios.get(`/api/user/verify/${param.id}` , {} , {
            headers:{
                Authorization : "Bearer " + localStorage.getItem("token"),
            },
        });
       
        console.log(response.data)
    }catch(error){      
        console.log(error)

    }
}
    useEffect(()=> {
      Verifyemail();
    }, []);

  return (
    <div>
      11112
    </div>
  )
}

export default Verify
