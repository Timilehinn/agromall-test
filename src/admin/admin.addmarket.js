import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from '../styles/admin/addmarket.module.css';
import Navbar from './admin.navbar'

function AddMarket() {
    return (
        <>
        <Navbar />
        <div className={styles.container}>
                                               
            <form className={styles.form} onSubmit={(e)=>AddMarket(e)}>
                <label for="images" className={styles.imagebox}>
                    <h1>Tap to add images</h1>
                    <p>Add up to three images</p>
                </label>
                <input style={{display:"none"}} id="images" type="file" />
                <p>category</p>
                <div className={styles.checkboxes}>
                    <FormControlLabel control={
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        } 
                        label="Grains"  
                    />
                    <FormControlLabel control={
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        } 
                        label="Vegetable"  
                    />
                    <FormControlLabel control={
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        } 
                        label="Dairy"  
                    />
                    <FormControlLabel control={
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        } 
                        label="Fruits"  
                    />
                </div>
            
            <TextField
                id="standard-textarea"
                label="Name"
                placeholder="lorem ipsum ..."
                style={{width:'100%',marginBottom:"50px"}}
            />
            <TextField
                id="standard-textarea"
                label="Description"
                placeholder="lorem ipsum ..."
                style={{width:'100%',marginBottom:"50px"}}
                multiline
            />
            <TextField
                id="standard-textarea"
                label="Location"
                placeholder="No 123, Ave ..."
                style={{width:'100%',marginBottom:"20px"}}
            />
            <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'35%',backgroundColor:'lightgrey',height:'1px'}}/>
                            <span style={{color:'lightgrey',width:'20',fontSize:'.7rem',margin:'.3rem'}}>Or</span>
                            <div style={{width:'35%',backgroundColor:'lightgrey',height:'1px'}}/>
                        </div>
                <FormHelperText id="my-helper-text">A detailed description of the market.</FormHelperText>
                </form>

        </div>
        </>
    )
}

export default AddMarket
