import React from 'react'
import styles from '../styles/admin/navbar.module.css'
import { FiLogOut } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const history = useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('_agro_m_tkn')
        history.push('/')
    }
    const syncSearch=async()=>{
        const res = await axios.post('https://agromall-server.herokuapp.com/api/market/sync-searchengine')
        console.log(res.data.msg)
    }

    return (
        <div className={styles.navbar}>
            <h1 style={{color:'rgb(0,135,55)'}}>Admin</h1>
            <div style={{display:'flex',alignItems:'center'}}>
                <span onClick={()=>syncSearch()}>Resync search</span>
                <Link to="/admin/addmarket">Add market</Link>
                <span className={styles.logout} onClick={()=>handleLogout()}>
                    <FiLogOut />
                Logout
                </span>
            </div>
           
        </div>
    )
}

export default Navbar
