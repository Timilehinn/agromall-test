import React,{ useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios'
import styles from '../styles/dashstyles/d.home.module.css'
import {AuthContext} from '../contexts/authContextApi'

  const ProtectedRoute = ({ component: Component, ...rest }) => {


    // const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);

    function refreshValidatePage(){
      let token = localStorage.getItem("_stck_token");
      if (token) {
        axios.get('http://localhost:6363/api/isuserauth', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-access-token":token,
          },
          // body: JSON.stringify({ token })
        })
        .then((res) => {
          return res
        })
        .then((json) => {
          if (json.data.authenticated) {
            setAuth(true);
            setUserDetails(json.data.details)
            console.log(json.data.details,' the new logs i want to see')
          }else{
            setAuth(false);
            localStorage.removeItem("_stck_token"); 
          }
        })
        .catch((err) => {
          setAuth(false);
          console.log(err)
          localStorage.removeItem("_stck_token");
        })
        .then(() => setIsTokenValidated(true));
      } else {
        setIsTokenValidated(true); // in case there is no token
      }
    }

    
      // send jwt to API to see if it's valid when navigating to a protected route
    useEffect(() => {
      refreshValidatePage();
  }, [])

 if (!isTokenValidated) return (
   <div className={styles.the_box}>
      <span className={styles.loader}></span>
   </div>
 )

  return (<Route {...rest}
    render={(props) => {
      return auth ? <Component {...props} /> : <Redirect to="/" />
    }} />)
  }
export default ProtectedRoute;