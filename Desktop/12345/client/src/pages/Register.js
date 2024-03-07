import React ,{useState}  from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form , Input , Button} from 'antd'
import axios from "axios";
import toast from "react-hot-toast";
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';

function Register() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  
  const [passwordagain, setPasswordagain] = useState("")
  
  const onChange = (e) =>{
    setPassword(e.target.value);

  }
  const onChangeagain = (e) =>{
    setPasswordagain(e.target.value);

  }
  const onChangeemail = (e) =>{
    setEmail(e.target.value);

  }
  const onChangename = (e) =>{
    setName(e.target.value);

  }

  const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const onFinish = async(values) => {
        try{
if(password!==passwordagain ){
        toast.error("password dosn't match");
        }
else if(password.length<=5){
    toast.error("Please input password above 6 characters");

}
else if(!email.match(/\S+@\S+\.\S+/)){
    toast.error("Please input valid email");

}
else if(name===""){
    toast.error("Please input name");

}

        else{

            dispatch(showLoading());
            const response = await axios.post('/api/user/register', values);
            dispatch(hideLoading());
          
            if(response.data.success){
             
                toast.success(response.data.message);
                navigate("/login");
              
            }
          
            else{
                toast.error(response.data.message);

            }
        }
        } catch(error){
            dispatch(hideLoading());

            toast.error("User already exist");

        }
    };


  return (
    <div className='authentication'>
        <div className='register-form card p-3'>
            <h1 className='card-title'>Register</h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label="Name" name='name'>
                    <Input value={name} onChange={onChangename} placeholder='Name'/>
                </Form.Item>
                <Form.Item label="Email" name='email'>
                    <Input value={email} onChange={onChangeemail} placeholder='Email'/>
                </Form.Item>
                <Form.Item label="Password" name='password'>
                    <Input                     onChange={onChange}
 value={password}  placeholder='Password' type='password'/>
                </Form.Item>
                <Form.Item label="Password again" name='passwordagain'>
                    <Input 
                    onChange={onChangeagain}
                    value={passwordagain}  placeholder='Password' type='password'/>
                </Form.Item>
                <Button htmlType='submit' className='primary-button mt-3 my-2'>Register</Button>
                <Link className='anchor' to='/login'>Click to login</Link>
            </Form>
        </div>

    </div>


  )
}

export default Register;
