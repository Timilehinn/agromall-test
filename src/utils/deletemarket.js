import React,{ useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
        let token = localStorage.getItem("_agro_m_tkn");
        setIsDeleting(true)
        const res = await axios.post('https://agromall-server.herokuapp.com/api/market/delete',
        {markets:prop.selection},{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-access-token":token,
          }
        })
        console.log(res)
        if(res.data.success){
            setIsDeleting(false);
            toast.success(res.data.msg,toastsettings);
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
          These action will delete {prop.selection.length} selected market(s). Proceed?
        </DialogContent>
        <DialogActions>
          <Button style={{textTransform:'capitalize'}} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{textTransform:'capitalize'}} onClick={()=>deleteMarket()}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

export default DeleteMarket
