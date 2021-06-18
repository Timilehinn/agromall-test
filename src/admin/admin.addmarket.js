import React,{ useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import styles from '../styles/admin/addmarket.module.css';
import Navbar from './admin.navbar'
import Divider from '../utils/divider'
import axios from 'axios';
import Resizer from "react-image-file-resizer";


function AddMarket() {

    const [ images, setImages ] = useState(['img1','img2','img3'])
    const [ category, setCategory ] = useState([])
    const [ name, setName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [ photoName, setPhotoName ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');


    function handleFiles(event) {
        console.log('started')
        var fileInput = false;
        if (event.target.files[0]) {
          fileInput = true;
        }
        if (fileInput) {
          try {
            Resizer.imageFileResizer(
              event.target.files[0],
              500,
              500,
              "JPEG",
              20,
              0,
              (uri) => {
                console.log(uri);
                var pre_removed = uri.substring(uri.indexOf(",") + 1)
                setPhotoName(event.target.files[0].name)
                setPhoto(uri);
                setPhotoBase64(pre_removed)
              },
              "base64",
              200,
              200
            );
          } catch (err) {
            console.log(err);
          }
        }
      }


    const addCategory=(e)=>{
        if(e.target.checked){
            setCategory((prev)=>{
                if(prev.includes(e.target.value)){
                    return [...prev]
                }else{
                    return [e.target.value,...prev]
                }
            })
        }else{
            setCategory(category.filter(cat=>cat !== e.target.value))
        }
    }

    async function addMarket(){
        const res = await axios.post('http://localhost:7777/api/market/add',{
          images,name,category,desc,location  
        })
        console.log(res)
    } 

    return (
        <>
        <Navbar />
        <div className={styles.container}>
                                               
            <form className={styles.form} onSubmit={(e)=>AddMarket(e)}>
                <label for="images" className={styles.imagebox}>
                    <h1>Tap to add images</h1>
                    <p>Add up to three images</p>
                </label>
                <input style={{visibility:'hidden'}} type="file" id="img-up" multiple onChange={e=>handleFiles(e)} accept="image/x-png,image/gif,image/jpeg" />
                <p>category</p>
                <div className={styles.checkboxes}>
                    <FormControlLabel control={
                        <Checkbox 
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                            value="grains"
                            onChange={(e)=>addCategory(e)}
                        />
                        } 
                        label="Grains"  
                    />
                    <FormControlLabel control={
                        <Checkbox 
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                            value="vegetable"
                            onChange={(e)=>addCategory(e)}
                        />
                        } 
                        label="Vegetable"  
                    />
                    <FormControlLabel control={
                        <Checkbox 
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                            value="dairy"
                            onChange={(e)=>addCategory(e)}
                        />
                        } 
                        label="Dairy"  
                    />
                    <FormControlLabel control={
                        <Checkbox 
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                            value="fruits"
                            onChange={(e)=>addCategory(e)}
                        />
                        } 
                        label="Fruits"  
                    />
                </div>
            
                <TextField
                    id="standard-textarea"
                    label="Name"
                    placeholder="lorem ipsum ..."
                    style={{width:'100%',marginBottom:"50px"}}
                    onChange={(e)=>setName(e.target.value)}
                    required
                />
                <TextField
                    id="standard-textarea"
                    label="Description"
                    placeholder="lorem ipsum ..."
                    style={{width:'100%',marginBottom:"50px"}}
                    onChange={(e)=>setDesc(e.target.value)}
                    multiline
                    required
                />
                <FormHelperText id="my-helper-text">A detailed description of the market.</FormHelperText>
                <TextField
                    id="standard-textarea"
                    label="Location"
                    placeholder="No 123, Ave ..."
                    style={{width:'100%',marginBottom:"20px"}}
                    onChange={(e)=>setLocation(e.target.value)}
                    required
                />
                <Divider text="Or" width="45%" textWidth="10%" />
                <h3 style={{color:'grey'}}>Select location from map</h3>
                <Button onClick={()=>addMarket()}  style={{width:"100%"}} variant="contained">Create Market </Button>
            </form>

        </div>
        </>
    )
}

export default AddMarket
