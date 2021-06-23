import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import styles from '../styles/admin/addmarket.module.css';
import Navbar from './admin.navbar'
import axios from 'axios';
import Resizer from "react-image-file-resizer";
import SelectedImage from '../utils/selectedimage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from 'uuid';
import { Helmet } from 'react-helmet';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Geocode from "react-geocode";

function AddMarket() {

    Geocode.setApiKey("AIzaSyDACp6ZI_WWhM1y-vwWk9vgtw9t0Gfo--A");
    Geocode.setRegion("ng");
    Geocode.setLocationType("ROOFTOP");
    const [ images, setImages ] = useState([])
    const [ category, setCategory ] = useState([])
    const [ name, setName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ lat, setLat ] = useState(0)
    const [ long, setLong ] = useState(0)
    const [ photo, setPhoto ] = useState('');
    const [ photoName, setPhotoName ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ isLocating, setIsLocating ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [open, setOpen] = useState(false);

    const toastsettings ={
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsLocating(false)
        setOpen(false);
    };

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
        let token = localStorage.getItem("_agro_m_tkn");
        if(!name || !desc || !location ){
            toast.error('Input feilds cannot be empty',toastsettings);
        }else if(images.length === 0){
            toast.error('Upload between 1 and 3 images',toastsettings);
        }else if(category.length === 0){
            toast.error('Choose at least one category',toastsettings);
        }else if(!long || !lat){
            toast.error('Confirm location to continue',toastsettings);
        }else{
            setLoading(true)
            const res = await axios.post('https://agromall-server.herokuapp.com/api/market/add',{
                id:v4(),images,name,category,desc,location,lat,long  
              },{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token":token,
                }
              })
              if(res.data.success){
                  setLoading(false)
                  setImages([]);
                  setName('');
                  setCategory('');
                  setDesc('');
                  setLocation('');
                  toast.success(res.data.msg, toastsettings);
              }else{
                  setLoading(false)
                  toast.error(res.data.msg,toastsettings);
              }
              console.log(res.data.msg)
        }
        
    } 

    const getLatLongFromLocation=()=>{
        if(location){
            setIsLocating(true)
            Geocode.fromAddress(location).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setLong(lng)
                    setLat(lat)
                    setIsLocating(false);
                    handleClose();
                console.log(lat, lng);
                },
                (error) => {
                console.error(error);
                }
            );
        }else{
            toast.error("enter a location or address to proceed.",toastsettings)
        }
    }

    return (
        <>
        {loading? <LinearProgress />:<></>}
        <Helmet>
            <title>Agromall - Add Market</title>
        </Helmet>
        <Navbar sync={false} addmarket={false} />
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
                    inputProps={{ maxLength: 70 }}
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
                    inputProps={{ maxLength: 700 }}
                    multiline
                    required
                />
                {/* <FormHelperText id="my-helper-text">A detailed description of the market.</FormHelperText> */}
                <TextField
                    id="standard-textarea"
                    label="Location"
                    placeholder="No 123, Ave ..."
                    style={{width:'100%',marginBottom:"20px"}}
                    onClick={()=>handleClickOpen()}
                    required
                    value={location}
                />
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                { isLocating? <LinearProgress/>:'' }
                    <DialogTitle id="form-dialog-title">Add Market Location</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="location"
                        type="text"
                        fullWidth
                        placeholder="Location or address needs to be detailed."
                        value={location}
                        onChange={e=>setLocation(e.target.value)}
                        inputProps={{ maxLength: 50 }}
                        required
                    />
                    <span style={{fontSize:'.7rem',color:'grey'}}>{0 + name.length}/50</span>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLocating? true:false} onClick={()=>getLatLongFromLocation()}>
                        confirm
                    </Button>
                    </DialogActions>
                </Dialog>
                {/* <Divider text="Or" width="45%" textWidth="10%" /> */}
                {/* <h3 style={{color:'grey'}}>Select location from map</h3> */}
                <Button onClick={()=>addMarket()}  style={{width:"100%"}} variant="contained">Create Market </Button>
            </form>

        </div>
        </>
    )
}

export default AddMarket
