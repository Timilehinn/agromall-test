import React,{ useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress'


function Updatemarket() {

    const [ isUpdating, setIsUpdating ] = useState(false)
    const [ images, setImages ] = useState([])
    const [ category, setCategory ] = useState([])
    const [ name, setName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ location, setLocation ] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
            value={name}
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
          <Button>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default Updatemarket
