import React from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AdminUsers from './pages/AdminUsers';
import {useSelector} from "react-redux"
import {BrowserRouter , Routes ,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Notifications from './pages/Notifications'
import PublicRoute from './components/PublicRoute';
import Welcome from './pages/Welcome';
import Userlogin from './pages/Userlogin';
import Adduser from './pages/Adduser';
import Verify from './pages/Verify';
import Message from './pages/Message'
import Forgotpassword from './pages/ForgotPassword';
import Entertoken from './pages/Entertoken';
import Newpassword from './pages/Newpassword';
function App() {
  const {loading} = useSelector(state => state.alerts);

  return (
  
  <BrowserRouter>
  {loading && ( <div className='spinner-parent'>
      <div class="spinner-border" role="status">
</div>

      </div>
  )}
  <Toaster position='top-center' reverseOrder={false}/>
  <Routes>
  <Route path="/verify/:id"  element={<PublicRoute><Verify/></PublicRoute>}/>
  <Route path="/message" element={<ProtectedRoute><Message/></ProtectedRoute>}/>
  <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/>
  <Route path="/forgotpassword" element={<Forgotpassword/>}/>
  <Route path="/entertoken" element={<Entertoken/>}/>
  <Route path="/newpassword" element={<Newpassword/>}/>

    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path="/userlogin" element={<PublicRoute><Userlogin/></PublicRoute>}/>
    <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="/AdminUsers" element={<ProtectedRoute><AdminUsers/></ProtectedRoute>}/>
    <Route path="/welcome" element={<PublicRoute><Welcome/></PublicRoute>}/>
    <Route path="/adduser" element={<ProtectedRoute><Adduser/></ProtectedRoute>}/>


  </Routes>
  </BrowserRouter>
  );
}

export default App;
