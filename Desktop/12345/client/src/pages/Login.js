import React , {useState} from 'react'
import {Link,  useNavigate } from 'react-router-dom'
import {Form , Input , Button, Space } from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';

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
    const [isActive, setIsActive] = useState(false);
   
  return (


    <div className='authentication'>
              <img className='logo-login' src={require('./logo.png')} alt='/'/>

        <div className='register-form card p-3'>
            <h1 className='card-title'>התחברות למערכת</h1>
            <h1 className='card-sub-title'>!התחילו לבנות  תפריט תזונה בצורה מקצועית, נוחה ומהירה</h1>

            <Form className="form-login" layout='vertical' onFinish={onFinish}>
               
                <Form.Item    className="login-input" label=":מייל" name='email'>
                 
                    <Input  
                   
                    className="login-input" placeholder='@email.com'/>
                </Form.Item>
               
                <Form.Item  className="login-input" label=":סיסמא" name='password'>
             
                    <Input
  addonBefore={ isActive? 
    
  <EyeOutlined onClick={()=>{
    setIsActive(!isActive)
    
   
}}/>

    :

      <EyeInvisibleOutlined onClick={()=>{
    setIsActive(!isActive)}} />}
      
                       
                    className="login-input" 
placeholder='*****' type={
    isActive ? "text" : "password"
}/> 


                </Form.Item>
                <Link to='/forgotpassword' className='forgot-pass'>?שכחת סיסמא</Link>
                <Button 
                
                htmlType='submit' className='primary-button mt-3 my-2'>התחברות</Button>
            </Form>
            
        </div>

    </div>


  )
}

export default Login;
