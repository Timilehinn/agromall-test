import React, { useState, useContext } from 'react';
import styles from '../styles/login.module.css';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import {AuthContext} from '../contexts/authContextApi'

function SignIn() {

    const history = useHistory();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [loginState , setLoginState] = useState(false);
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);

    const signIn= async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:6363/api/signin',{email,password})
        console.log(res)
        if(res.data.session){
            setLoginState(true);
            //INITIATE SESSION ID
            localStorage.setItem("_stck_token",res.data.token);
            setUserDetails(res.data.details);
            setAuth(res.data.authenticated);
            history.push(`/home`);
        }else{
            // setIsLoading(false);
            setLoginState(false);
            history.push('/signin');
        }
    }
    const responseGoogle = (response) => {
        console.log(response);
      }

    const handleGoogleAuth=async(data)=>{
        const res = await axios.post('http://localhost:6363/api/auth/google',{
            token: data.tokenId
        })
        if(res.data.session){
            setLoginState(true);
            //INITIATE SESSION ID
            localStorage.setItem("_stck_token",res.data.token);
            setUserDetails(res.data.details);
            setAuth(res.data.authenticated);
            history.push(`/home`);
        }else{
            // setIsLoading(false);
            setLoginState(false);
            
        }
    }

    return (
        <div className={styles.container}>
                <Navbar />
                <ToastContainer />
                <form className={styles.form} onSubmit={(e)=>signIn(e)}>
                    <h4 style={{textAlign:'center',color:"grey",marginBottom:'1rem',fontSize:'1rem'}}>
                        Sign in
                    </h4>
                       
                       
                    <div style={{display:'flex',width:'100%',marginTop:'.3rem',alignItems:'center'}}>
                        <div style={{width:'100%',backgroundColor:'lightgrey',height:'1px'}}/>
                        <span style={{color:'lightgrey',margin:'.3rem'}}>or</span>
                        <div style={{width:'100%',backgroundColor:'lightgrey',height:'1px'}}/>
                    </div>
                    <input value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    
                    <input value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    <button className={styles.loginbutton}>Sign In</button>
                    <p style={{color:"lightgray",marginTop:'.8rem',marginBottom:'.8rem',fontSize:'.9rem'}}>Not registered? <Link to="/signup">Sign up</Link></p>
                </form>
           
        </div>
    )
}


export default SignIn