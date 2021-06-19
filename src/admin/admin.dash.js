import React,{ useState, useEffect } from 'react'
import Navbar from './admin.navbar'
import styles from '../styles/admin/admin.module.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

function AdminDash() {

    const useStyles = makeStyles({
        root: {
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                outline: 'none',
            },
        }
    });
    const classes = useStyles();
    const [ market, setMarket ] = useState([])
    const [ selection, setSelection ] = useState([])
    const getMarkets=async()=>{
        const res = await axios.get('http://localhost:7777/api/market/all?limit=50&offset=0')
        setMarket(res.data.market)
    }

    useEffect(()=>{
        getMarkets();
    },[])
 
    const columns = [
        { field: "name",width: 200, headerName: "name",renderCell:(params)=>{
            return(
                <Link to={{
                    pathname:'',
                    state:{params:{id:params.row.id}}
                }}>
                    --{params.row.name}
                </Link>
            )
        }}, 
        { field: "desc",width: 200, headerName: "description" },
        { field: "location",width: 200, headerName: "location" },
        { field: "category",width: 200, headerName: "category" }
    ]



    return (
        <>   
            <Navbar />
            <div className={styles.container}>
                <div className={styles.data}>
                    <DataGrid 
                        zIndex={100}
                        className={classes.root}
                        checkboxSelection
                        pageSize={25}
                        columns={columns}
                        rows={market}
                        onRowSelected={(e) => setSelection((prevSel)=>{
                            return [e.data,...prevSel]
                        })} 
                    />
                </div>
                <div className={styles.side}>

                </div>
            </div>
        </>
    )
}

export default AdminDash
