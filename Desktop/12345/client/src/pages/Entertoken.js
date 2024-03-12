import React , {useState} from 'react'
import {  useNavigate ,useLocation } from 'react-router-dom'
import {Form , Input , Button } from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
import EnterCode from '../components/EnterCode';

function Entertoken() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
 //   const memberid = location.state.email.email;
    console.log(location.state.name.email)
    const emailval = location.state.name.email
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/entertoken', values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                localStorage.setItem("token" , response.data.data)
                console.log(response.data.data)
                navigate(`/newpassword`,{state:{name: {emailval}}});

            }
            else{
                toast.error(response.data.message);

            }
        } catch(error){
            toast.error("Something went wrong");

        }
    };
    
  return (


    <div className='authentication'>
              <img className='logo-login' src={require('./logo.png')} alt='/'/>
           
        <div className='register-form card p-3'>
         <h1 className='card-title'>הכנס קוד</h1>
       
            <Form className="form-login" layout='vertical' onFinish={onFinish}>
               
                <Form.Item    className="login-input"  name='password'>
                 
                    <Input  maxLength={4}
                    
                    className="login-input"/>
                </Form.Item>
                <Form.Item  style={{display: 'none'}} initialValue={emailval} className="login-input"  name='email'>
                 
                    <Input  
                    
                    className="login-input"/>
                </Form.Item>
               
               
                <Button htmlType='submit' className='primary-button mt-3 my-2'>המשך</Button>

            </Form>
            
        </div>

    </div>


  )
}

export default Entertoken;
