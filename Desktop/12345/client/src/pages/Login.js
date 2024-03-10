import React from 'react'
import {Link,  useNavigate } from 'react-router-dom'
import {Form , Input , Button} from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/login', values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to home");
                localStorage.setItem("token" , response.data.data)
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
              <img className='logo-login' src={require('./logo.png')} alt='/'/>

        <div className='register-form card p-3'>
            <h1 className='card-title'>התחברות</h1>
            <h1 className='card-sub-title'>התחילו לבנות את תוכניות האימון של המתאמנים שלכם 
בצורה המקצועית ביותר!</h1>

            <Form className='form-login' layout='vertical' onFinish={onFinish}>
               
                <Form.Item  className='login-input' name='email'>
                <label>:אימייל</label>

                    <Input className='login-input' placeholder='אימייל'/>
                </Form.Item>
                <Form.Item  className='login-input' name='password'>
                <label>:סיסמא</label>

                    <Input className='login-input' placeholder='סיסמא' type='password'/>
                </Form.Item>
                <div className='forgot'>
                <h1 className='forgot'>?שכחת סיסמא</h1>
                </div>
                <Button htmlType='submit' className='login-btn'>התחברות</Button>
                <Link className='anchor' to='/Register'>אין לך משתמש? הרשם עכשיו</Link>
                
            </Form>

        </div>

    </div>


  )
}

export default Login;
