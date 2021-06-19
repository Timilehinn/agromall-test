import React,{ useState, useEffect } from 'react'
import Navbar from './admin.navbar'
import styles from '../styles/admin/admin.module.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import UpdateMarket from '../utils/updatemarket'
import DeleteMarket from '../utils/deletemarket'
function AdminDash() {

    const useStyles = makeStyles({
        root: {
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                outline: 'none',
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                display: "none"
              }
        }
    });
    const classes = useStyles();
    const [ market, setMarket ] = useState([])
    const [ selection, setSelection ] = useState([])
    const getMarkets=async()=>{
        const res = await axios.get('http://localhost:7777/api/market/all?limit=50&offset=0')
        setMarket(res.data.market)
    }

    // if(!e.target.checked){
    //     if(category.length>0){
    //         const newcat = category.filter(cat=>cat.cat!==e.target.value)
    //         setCategory(newcat)
    //     }else{
    //         e.target.value=false
    //     }
        
    // }else{
    //     setCategory((prev)=>{
    //         return [{'cat':e.target.value},...prev]
    //     })
    // }

    const handleSelection=(e)=>{
        console.log(e)
        if(!e.isSelected){
            if(selection.length>0){
                const newsel = selection.filter(sel=>sel.id !== e.data.id)
                setSelection(newsel)
            }else{
                e.isSelected = false
            }
        }else{
            setSelection((prevSel)=>{
                return [e.data,...prevSel]
            })
        }
        
    }

    useEffect(()=>{
        getMarkets();
    },[])
 
    const columns = [
        { field: "name",width: 200, headerName: "name",renderCell:(params)=>{
            return(
                <Link to={{
                    pathname:`/market/${params.row.name}`,
                    state:{params:{id:params.row.id}}
                }}
                    style={{color:'black'}}
                >
                    {params.row.name}
                </Link>
            )
        }}, 
        { field: "desc",width: 200, headerName: "description" },
        { field: "location",width: 200, headerName: "location" },
        { field: "category",width: 200, headerName: "category",
        renderCell:(params)=>{
            return(
                <>{
                    params.row.category.map(cat=>(
                        <p style={{color:'black'}}>{cat.cat},</p>
                        
                    ))
                }
                    </>
            )
        }
        }
    ]



    return (
        <>   
            <Navbar />
            <div className={styles.container}>
                <div className={styles.data}>
            <h2>My Markets.</h2>
            <div className={styles.grid_header}>
                {selection.length === 1?<UpdateMarket selection={selection} />:<></>}
                {selection.length>0? <DeleteMarket />:<></>}
            </div>
           
                    <DataGrid 
                        zIndex={100}
                        className={classes.root}
                        checkboxSelection
                        pageSize={25}
                        columns={columns}
                        rows={market}
                        onRowSelected={(e)=>handleSelection(e)} 
                    />
                </div>
                <div className={styles.side}>

                </div>
            </div>
        </>
    )
}

export default AdminDash
