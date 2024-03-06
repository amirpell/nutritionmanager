import React from 'react'
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { setUser } from '../redux/userSlice'

import { hideLoading, showLoading } from '../redux/alertSlice'
import { setMember } from '../redux/memberSlice';

function ProtectedRoute(props) {


    const { user } = useSelector((state) => state.user);
    const { member } = useSelector((state) => state.member);

    const dispatch = useDispatch();

    const getUser = async () => {
   
        try{

            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/get-user-info-by-id",
                { token: localStorage.getItem('token') },
                 {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
    
            });
    
            dispatch(hideLoading());
    
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            }
           
        }catch(error){      
            dispatch(hideLoading());
           
    
        }
        
    }


    
useEffect(()=> {
    if(!user){
    getUser();
    }
},[]);

const getUserM = async () => {
   
    try{

        dispatch(showLoading());
        const response = await axios.post(
            "/api/user/get-member-info-by-id",
            { token: localStorage.getItem('token') },
             {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },

        });

        dispatch(hideLoading());

        if (response.data.success) {
            dispatch(setMember(response.data.data))
        }
       
    }catch(error){      
        dispatch(hideLoading());
       

    }
    
}



useEffect(()=> {
if(!member){
    getUserM();
}
},[]);

    if (localStorage.getItem('token')) {
        return props.children;

    } else {
        return <Navigate to="/welcome" />
    }

}

export default ProtectedRoute
