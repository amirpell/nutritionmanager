import React, { useEffect } from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
function Home() {
 
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
        }catch(error){      
            console.log(error)
    
        }
    }
        useEffect(()=> {
            getDataM();
        }, []);
       

  return <Layout>

    </Layout>
  
}

export default Home
