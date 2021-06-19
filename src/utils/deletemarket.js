import React,{ useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GrUpdate } from 'react-icons/gr'
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa' 



function DeleteMarket(prop) {
    const [ isUpdating, setIsUpdating ] = useState(false)
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
        setOpen(false);
    };

    const updateMarket=async()=>{
        // const res = await axios.post('http://localhost:7777/api/market/update',{id,name,desc,location})
        // console.log(res)
        // if(res.data.success){
        //     toast.error(res.data.msg,toastsettings);
        //     handleClose();
        // }else{
        //     toast.error(res.data.msg,toastsettings);
        // }
    }
    
    return (
        <>
        <ToastContainer />
        <label onClick={handleClickOpen} style={{border:"1px solid cyan",cursor:'pointer',padding:'.5rem',border:'1px solid lightgrey',display:'flex',alignItems:'center'}}>
        
        <FaTrashAlt size={15} style={{marginRight:'.3rem'}} /> Delete
        </label>
        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      { isUpdating? <LinearProgress/>:'' }
        <DialogTitle id="form-dialog-title">{'sfrbeb'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update market
          </DialogContentText>
          These action will delete all the selected markets.
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

export default DeleteMarket
