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
import SelectedImage from '../utils/selectedimage';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMarket() {

    const [ images, setImages ] = useState([])
    const [ category, setCategory ] = useState([])
    const [ name, setName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [ photoName, setPhotoName ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');

    const toastsettings ={
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
    }

    function handleFiles(event) {
        console.log(event.target.files.length, 'e t f length')
        console.log(event.target.files)
        const imgArray = Array.from(event.target.files)
        var fileInput = false;
        if (event.target.files) {
          fileInput = true;
        }
        if (fileInput) {
          try {
            imgArray.map(file=>{
                Resizer.imageFileResizer(
                    file,
                    500,500,"JPEG",80,0,
                    (uri) => {
                      setImages((prevImages)=>{
                          return [...prevImages,{'imguri':uri}]
                      })
                      var pre_removed = uri.substring(uri.indexOf(",") + 1)
                      setPhotoName(event.target.files[0].name)
                      setPhoto(uri);
                      setPhotoBase64(pre_removed)
                    },
                    "base64",
                    200,
                    200
                );
            })
            
          } catch (err) {
            console.log(err);
          }
        }
      }


    const addCategory=(e)=>{
        if(!e.target.checked){
            if(category.length>0){
                const newcat = category.filter(cat=>cat.cat!==e.target.value)
                setCategory(newcat)
            }else{
                e.target.value=false
            }
            
        }else{
            setCategory((prev)=>{
                return [{'cat':e.target.value},...prev]
            })
        }
    }

    async function addMarket(){
        if(!name || !desc || !location ){
            toast.error('Input feilds cannot be empty',toastsettings);
        }else if(images.length === 0){
            toast.error('Upload between 1 and 3 images',toastsettings);
        }else if(category.length === 0){
            toast.error('Choose at least one category',toastsettings);
        }else{
            const res = await axios.post('http://localhost:7777/api/market/add',{
                images,name,category,desc,location  
              })
              if(res.data.success){
                  setImages([]);
                  setName('');
                  setCategory('');
                  setDesc('');
                  setLocation('');
                  toast.success(res.data.msg, toastsettings);
              }else{
                  toast.error(res.data.msg,toastsettings);
              }
              console.log(res.data.msg)
        }
        
    } 

    return (
        <>
        <Navbar />
        <ToastContainer />
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e)=>AddMarket(e)}>
                <div className={styles.imagebox}>
                    <label for="imgs" className={styles.imagebox_main}>
                        {images.length>0?'':(
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <h1>Tap to add images</h1>
                                <p>Add up to three images</p>
                            </div>
                        )}
                        {images.map(image=>(
                            <SelectedImage src={image.imguri} />
                        ))}
                    </label>
                </div>
                <h6 onClick={()=>setImages([])} style={{cursor:'pointer',color:"grey"}}>Clear Images</h6>
                <input style={{visibility:'hidden'}} type="file" id="imgs" multiple onChange={e=>handleFiles(e)} accept="image/x-png,image/gif,image/jpeg" />
                <p>Choose Category</p>
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
                    value={name}
                />
                <TextField
                    id="standard-textarea"
                    label="Description"
                    placeholder="A description of this market. "
                    style={{width:'100%',marginBottom:"50px"}}
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                    inputProps={{ maxLength: 300 }}
                    multiline
                    required
                />
                {/* <FormHelperText id="my-helper-text">A detailed description of the market.</FormHelperText> */}
                <TextField
                    id="standard-textarea"
                    label="Location"
                    placeholder="No 123, Ave ..."
                    style={{width:'100%',marginBottom:"20px"}}
                    onChange={(e)=>setLocation(e.target.value)}
                    required
                    value={location}
                />
                {/* <Divider text="Or" width="45%" textWidth="10%" /> */}
                {/* <h3 style={{color:'grey'}}>Select location from map</h3> */}
                <Button onClick={()=>addMarket()}  style={{width:"100%"}} variant="contained">Create Market </Button>
            </form>

        </div>
        </>
    )
}

export default AddMarket
