import React from 'react'
import {Link,  useNavigate} from 'react-router-dom'
import {Form , Input , Button} from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
function Login() {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            const response = await axios.post('/api/user/login', values);
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
        <div className='register-form card p-3'>
            <h1 className='card-title'>Login</h1>
            <Form layout='vertical' onFinish={onFinish}>
               
                <Form.Item label="Email" name='email'>
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item label="Password" name='password'>
                    <Input placeholder='Password' type='password'/>
                </Form.Item>
                <Button htmlType='submit' className='primary-button mt-3 my-2'>Register</Button>
                <Link className='anchor' to='/Register'>Click to Register</Link>
            </Form>
        </div>

    </div>


  )
}

export default Login;
