import React,{ useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { MarketContext } from '../contexts/marketContextApi'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GrUpdate } from 'react-icons/gr'
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Updatemarket(prop) {
    const { market, setMarket, selection, setSelection } = useContext(MarketContext)

    const [ isUpdating, setIsUpdating ] = useState(false)
    const [ images, setImages ] = useState([])
    const [ category, setCategory ] = useState([])
    const [ id, setId ] = useState(prop.selection[0].id);
    const [ name, setName ] = useState(prop.selection[0].name);
    const [ desc, setDesc ] = useState(prop.selection[0].desc);
    const [ location, setLocation ] = useState(prop.selection[0].location);
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
        setIsUpdating(false)
        setOpen(false);
    };

    const updateMarket=async()=>{
        let token = localStorage.getItem("_agro_m_tkn");
        setIsUpdating(true)
        const res = await axios.post('https://agromall-server.herokuapp.com/api/market/update',
        {id,name,desc,location},
        {headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "x-access-token":token,
        }})
        console.log(res)
        if(res.data.success){
            setIsUpdating(false)
            setMarket(res.data.market)
            toast.success(res.data.msg,toastsettings);
            setSelection([])
            handleClose();
        }else{
            setIsUpdating(false)
            toast.error(res.data.msg,toastsettings);
        }
    }
    
    return (
        <>
        <ToastContainer />
        <label onClick={handleClickOpen} style={{border:"1px solid cyan",cursor:'pointer',padding:'.5rem',border:'1px solid lightgrey',display:'flex',alignItems:'center'}}>
        
        <GrUpdate size={15} style={{marginRight:'.3rem'}} color="rgb(0,135,55)" /> Update
        </label>
        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      { isUpdating? <LinearProgress/>:'' }
        <DialogTitle id="form-dialog-title">{'sfrbeb'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update market
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            value={name}
            onChange={e=>setName(e.target.value)}
            inputProps={{ maxLength: 50 }}
            required
          />
          <span style={{fontSize:'.7rem',color:'grey'}}>{0 + name.length}/50</span>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            value={desc}
            multiline
            onChange={e=>setDesc(e.target.value)}
            inputProps={{ maxLength: 300 }}
            required
          />
          <span style={{fontSize:'.7rem',color:'grey'}}>{0 + desc.length}/300</span>
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="location"
            type="text"
            fullWidth
            value={location}
            onChange={e=>setLocation(e.target.value)}
            inputProps={{ maxLength: 50 }}
            required
          />
          <span style={{fontSize:'.7rem',color:'grey'}}>{0 + location.length}/50</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>updateMarket()}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

export default Updatemarket
