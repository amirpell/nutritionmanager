import React from 'react'
import { useNavigate} from 'react-router-dom'
import {Form , Input , Button} from 'antd'
import axios from "axios";
import toast from "react-hot-toast";
import {  useDispatch} from 'react-redux';
import {useSelector } from 'react-redux'

import { hideLoading, showLoading } from '../redux/alertSlice';
import Layout from '../components/Layout';

function Adduser() {

    if(!localStorage.loaded) {
        localStorage.setItem('loaded', 'yes')
        window.location.reload();
    }
    const {user} = useSelector((state) => state.user)


        const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/registeruser', values);
            dispatch(hideLoading());

            if(response.data.success){
                
                toast.success(response.data.message);


                toast("add user success");
                navigate("/");
            }
            else{
                toast.error(response.data.message);

            }
        } catch(error){
            dispatch(hideLoading());

            toast.error("User already exist");

        }
    };
  return (
    <Layout>    
  <div className='authentication'>
        <div className='register-form card p-3'>
            <h1 className='card-title'>add user</h1>
            <Form layout='vertical' onFinish={onFinish}
            fields={[
                {
                    name: ["useremail"],
                    value: user?.email
                }
            ]
            
            }
            >
                <div style={{display:'none'}}>
                                <Form.Item  label="admin email"  name='useremail'>
                    <Input    placeholder='Email'/>
                </Form.Item>
                </div>

                <Form.Item label="Name" name='name'>
                    <Input placeholder='Name'/>
                </Form.Item>
                <Form.Item label="Email" name='email'>
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item label="Password" name='password'>
                    <Input placeholder='Password' type='password'/>
                </Form.Item>
                <Button htmlType='submit' className='primary-button mt-3 my-2'>add user</Button>
            </Form>
        </div>

    </div>
    </Layout>
  )
}

export default Adduser
