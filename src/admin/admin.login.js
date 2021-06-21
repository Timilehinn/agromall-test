import React, { useState, useContext } from 'react';
import styles from '../styles/admin/login.module.css';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import {AuthContext} from '../contexts/authContextApi'
import { FaTimes, FaUserAlt } from 'react-icons/fa'
import { RiUser6Line } from 'react-icons/ri'
import { LinearProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn(props) {
    const login_msg = props.location.state? props.location.state.params.msg : ''
    const history = useHistory();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [isLoading , setIsLoading] = useState(false);
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ errorBox, setErrorBox ] = useState('none')
    const toastsettings ={
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
    }

    const adminLogin= async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        if(errorBox) setErrorBox('none')
        try{
            const res = await axios.post('https://agromall-server.herokuapp.com/api/admin/login',{email,password})
            if(res.data.session){
                setIsLoading(false)
                //INITIATE SESSION ID
                localStorage.setItem("_agro_m_tkn",res.data.token);
                setUserDetails(res.data.details);
                setAuth(res.data.authenticated);
                history.push('/admin');
            }else{
                setIsLoading(false);
                setErrorBox('block')
                history.push({
                    pathname:'/login/admin',
                    state:{params:{msg:res.data.auth_msg}}
                });
            }
        }catch(err){
            console.log(err)
            setIsLoading(false);
            setErrorBox('block')
            history.push({
                pathname:'/login/admin',
                state:{params:{msg:'No internet, Check your network settings and try again.'}}
            });
            // toast.error(err.response.message,toastsettings)
        }
    }

    return (
        <>
            {isLoading? <LinearProgress style={{width:'100%'}} />:''}
            <ToastContainer />
            <div className={styles.container}>
                    <form className={styles.form} onSubmit={(e)=>adminLogin(e)}>
                        <RiUser6Line size="70" color="rgb(0,135,55)" />
                        <p style={{textAlign:'center',color:"rgb(0,135,55)",marginTop:'1rem',marginBottom:'1rem',fontSize:'1.2rem'}}>
                            Login as Admin. 
                        </p>
                        <div onClick={()=>setErrorBox('none')} style={{display:errorBox}} className={styles.error_box}>
                            <FaTimes size={10} color="grey" style={{cursor:'pointer'}} onClick={()=>setErrorBox('none')} />
                            <p>{login_msg}</p>
                        </div>
                        
                        <div style={{display:'flex',width:'100%',marginTop:'.3rem',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'35%',backgroundColor:'lightgrey',height:'1px'}}/>
                            <span style={{color:'lightgrey',width:'20',fontSize:'.7rem',margin:'.3rem'}}>Administrator Login</span>
                            <div style={{width:'35%',backgroundColor:'lightgrey',height:'1px'}}/>
                        </div>
                        <input value={email} type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} />
                        
                        <input value={password} minLength={6} type="password" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                        <button className={styles.loginbutton}>Login</button>
                    </form>
                    
            </div>
            <footer className={styles.footer}>
                    &copy; 2021 AgromallTest. All right reserved.
            </footer>
        </>
    )
}


export default SignIn