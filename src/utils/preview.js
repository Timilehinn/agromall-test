import React from 'react'
import styles from './preview.module.css'

function Preloader() {
    return (
        <div className={styles.main}>
            <div className={styles.blink_1} />
            <div className={styles.blink_2} />
            <div className={styles.blink_3} />
            <div className={styles.blink_4} />
        </div>
    )
}

export default Preloader
