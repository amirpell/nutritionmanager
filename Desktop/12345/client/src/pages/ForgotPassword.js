import React , {useState} from 'react'
import {  useNavigate } from 'react-router-dom'
import {Form , Input , Button } from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import {  useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';

function Forgotpassword() {
    const [email, setEmail] = useState("")
    const onChangeemail = (e) =>{
        setEmail(e.target.value);
    
      }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/forgotpassword', values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
            //    navigate("/entertoken");
       navigate(`/entertoken`,{state:{name: {email}}});

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
            <h1 className='card-title'>שינוי סיסמא</h1>

            <Form className="form-login" layout='vertical' onFinish={onFinish}>
               
                <Form.Item    className="login-input" label=":מייל" name='email'>
                 
                    <Input  value={email} onChange={onChangeemail}
                    
                    className="login-input" placeholder='@email.com' 
                    
                  
                    
                    />
                </Form.Item>
               
               
                <Button htmlType='submit' className='primary-button mt-3 my-2'>שלח</Button>

            </Form>
            
        </div>

    </div>


  )
}

export default Forgotpassword;
