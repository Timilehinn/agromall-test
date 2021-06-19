import React from 'react';
import styles from '../styles/user/home.module.css'
import { makeStyles } from '@material-ui/core';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';


function Home() {
    const useStyles =  makeStyles((theme)=>({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    }))
    const classes = useStyles();
    const api_key ="AIzaSyDACp6ZI_WWhM1y-vwWk9vgtw9t0Gfo--A";

    return (
        <div className={styles.container}>
            <nav>
                <span className={styles.logo}>
                    AgroMall
                </span>
                <div className={styles.navitems}>
                    <span>
                        <input className={styles.search} />
                    </span>
                    <span>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-select">By Category</InputLabel>
                            <Select id="grouped-select" defualtValue="category">
                                <MenuItem value="dairy">
                                    sflvjnsl
                                </MenuItem>
                            </Select>
                    </FormControl>
                    
                    </span>
                    <span>
                        <HiOutlineLocationMarker />
                        <p>Nearest markets</p>
                    </span>
                </div>
            </nav>
        </div>
    )
}

export default Home
