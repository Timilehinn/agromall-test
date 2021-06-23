import React,{ useState, useContext } from 'react'
import styles from '../styles/admin/navbar.module.css'
import { FiLogOut } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MarketContext } from '../contexts/marketContextApi'


function Navbar(prop) {
    const toastsettings ={
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
    }
    const [ isSyncing, setIsSyncing ] = useState(false)
    const [open, setOpen] = useState(false);
    const { market, setMarket } = useContext(MarketContext)
    const history = useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('_agro_m_tkn')
        history.push('/')
    }
    const syncSearch=async()=>{
        let token = localStorage.getItem("_agro_m_tkn");
        setIsSyncing(true)
        const res = await axios.post('https://agromall-server.herokuapp.com/api/market/sync-searchengine',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token":token,
            }
        })
        console.log(res.data.msg)
        if(res.data.success){
            setIsSyncing(false)
            toast.success(res.data.msg,toastsettings)
            setOpen(false)
        }else{
            setIsSyncing(false)
            setOpen(false)
            toast.error(res.data.msg,toastsettings)
        }
    }

    
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsSyncing(false)
        setOpen(false);
    };
    const addMarket =()=>{
        history.push('/admin/addmarket')
    }

    return (
        <>
        <ToastContainer />
        <div className={styles.navbar}>
            <h1 className={styles.logo}>Admin</h1>
            <div style={{display:'flex',alignItems:'center'}}>
                {prop.sync? <Button variant="outlined" style={{fontSize:'.7rem',marginRight:"1rem"}} disabled={market.length>0? false:true} onClick={()=>handleClickOpen()}>sync search</Button>:<></>}
                {prop.addmarket? <Button variant="outlined" style={{fontSize:'.7rem'}} onClick={()=>addMarket()}>Add market</Button>:<></>}
                <span className={styles.logout} onClick={()=>handleLogout()}>
                    <FiLogOut />
                    <span id={styles.logout_text}>Logout</span>
                </span>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                { isSyncing? <LinearProgress/>:'' }
                <DialogTitle id="form-dialog-title">Sync Market Data with Search Engine.</DialogTitle>
                <DialogContent>
                This process will manually synchronize unsynced market data with search engine. Best used when 
                auto sync fails while creating or updating market. Proceed?
                </DialogContent>
                <DialogActions>
                <Button style={{textTransform:'Capitalize'}} onClick={handleClose}>
                    No
                </Button>
                <Button style={{textTransform:'Capitalize'}} onClick={()=>syncSearch()}>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
           
        </div>
        </>
    )
}

export default Navbar
