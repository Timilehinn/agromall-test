import React, { useState, useContext } from 'react';
import styles from '../styles/admin/login.module.css';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import {AuthContext} from '../contexts/authContextApi'

function SignIn() {

    const history = useHistory();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [loginState , setLoginState] = useState(false);
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);

    const adminLogin= async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:7777/api/admin/login',{email,password})
        console.log(res)
        if(res.data.session){
            setLoginState(true);
            //INITIATE SESSION ID
            localStorage.setItem("_agro_m_tkn",res.data.token);
            setUserDetails(res.data.details);
            setAuth(res.data.authenticated);
            history.push('/admin');
        }else{
            // setIsLoading(false);
            setLoginState(false);
            history.push('/signin');
        }
    }

    return (
        <div className={styles.container}>
                <form className={styles.form} onSubmit={(e)=>adminLogin(e)}>
                    <p style={{textAlign:'center',color:"grey",marginBottom:'1rem',fontSize:'3rem'}}>
                        Login
                    </p>
                    <div style={{display:'flex',width:'100%',marginTop:'.3rem',justifyContent:'space-between',alignItems:'center'}}>
                        <div style={{width:'35%',backgroundColor:'lightgrey',height:'1px'}}/>
                        <span style={{color:'lightgrey',width:'20',fontSize:'.7rem',margin:'.3rem'}}>Administrator Login</span>
                        <div style={{width:'35%',backgroundColor:'lightgrey',height:'1px'}}/>
                    </div>
                    <input value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    
                    <input value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    <button className={styles.loginbutton}>Login</button>
                </form>
           
        </div>
    )
}


export default SignIn