import React from 'react'
import Navbar from './admin.navbar'
import styles from '../styles/admin/admin.module.css'
import { Link } from 'react-router-dom'

function AdminDash() {
    return (
        <>   
            <Navbar />
            <div className={styles.container}>
                <h1>Admin dashboard</h1>
                <li>
                    <Link to="/admin/addmarket">Add market</Link>
                </li>
            </div>
        </>
    )
}

export default AdminDash
