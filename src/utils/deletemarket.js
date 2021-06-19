import React,{ useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GrUpdate } from 'react-icons/gr'
import { MarketContext } from '../contexts/marketContextApi'
import axios from 'axios'
import { useHistory } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa' 



function DeleteMarket(prop) {
    const [ isDeleting, setIsDeleting ] = useState(false)
    const { market, setMarket, selection, setSelection } = useContext(MarketContext)
    const history = useHistory()
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
        setIsDeleting(false)
        setOpen(false);
    };

    const deleteMarket=async()=>{
        setIsDeleting(true)
        const res = await axios.post('http://localhost:7777/api/market/delete',{markets:prop.selection})
        console.log(res)
        if(res.data.success){
            setIsDeleting(false);
            toast.error(res.data.msg,{toastsettings});
            setSelection([])
            setMarket(res.data.markets)
            console.log(res.data.msg)
            handleClose();
        }else{
            setIsDeleting(false)
            toast.error(res.data.msg,toastsettings);
        }
    }
    
    return (
        <>
        <ToastContainer />
        <label onClick={handleClickOpen} style={{border:"1px solid cyan",cursor:'pointer',padding:'.5rem',border:'1px solid lightgrey',display:'flex',alignItems:'center'}}>
            <FaTrashAlt size={15} style={{marginRight:'.3rem'}} /> Delete
        </label>
        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      { isDeleting? <LinearProgress/>:'' }
        <DialogTitle id="form-dialog-title">Delete Market(s)</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Update market
          </DialogContentText> */}
          These action will delete all the selected {prop.selection.length} market(s). Proceed?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>deleteMarket()}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

export default DeleteMarket
