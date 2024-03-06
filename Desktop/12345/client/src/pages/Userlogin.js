import React from 'react'
import {  useNavigate} from 'react-router-dom'
import {Form , Input , Button} from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
function Userlogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish2 = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/userlogin', values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to home");
                localStorage.setItem("token" , response.data.data);
                navigate("/");
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
        <div className='register-form card p-3'>
            <h1 className='card-title'>User Login</h1>
            <Form layout='vertical' onFinish={onFinish2}>
               
                <Form.Item label="Email" name='email'>
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item label="Password" name='password'>
                    <Input placeholder='Password' type='password'/>
                </Form.Item>
                <Button htmlType='submit' className='primary-button mt-3 my-2'>L2ogin</Button>
            </Form>
        </div>

    </div>


  )
}

export default Userlogin;
