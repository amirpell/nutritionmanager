import React from 'react'
import { useNavigate} from 'react-router-dom'
import {Form , Input , Button} from 'antd'
import axios from "axios";
import toast from "react-hot-toast";
import {  useDispatch} from 'react-redux';
import {useSelector } from 'react-redux'
import '../index.css'
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
            
            <h1 className='add-user-title'>הוסף לקוח</h1>
            <Form layout='vertical' className="add-user-form" onFinish={onFinish}
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

                <Form.Item  name='name'>
                <label>:שם</label>

                    <Input   className='add-user-input' placeholder='שם'/>
                </Form.Item>
                <Form.Item  name='email'>
                <label>:אימייל</label>

                    <Input  className='add-user-input' placeholder='אימייל'/>
               
                </Form.Item>
                
                <Form.Item
              
                    name='password'>
                                                <label>:מספר טלפון</label>

                    <Input className='add-user-input'  placeholder='טלפון' type='Phone'/>
                </Form.Item>
                <div className='add-user-btn'>       <Button htmlType='submit'>הוסף לקוח</Button>
                </div>

            </Form>
     

    
    </Layout>
  )
}

export default Adduser
