import React,{ useState, useEffect, useContext } from 'react'
import { MarketContext } from '../contexts/marketContextApi'
import Navbar from './admin.navbar'
import styles from '../styles/admin/admin.module.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import UpdateMarket from '../utils/updatemarket'
import DeleteMarket from '../utils/deletemarket'
import { Helmet } from 'react-helmet'

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
    const { market, setMarket, selection, setSelection } = useContext(MarketContext)
    const classes = useStyles();
    const getMarkets=async()=>{
        const res = await axios.get('https://agromall-server.herokuapp.com/api/market/all?limit=50&offset=0')
        setMarket(res.data.market)
    }

    const handleSelection=(e)=>{
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
        setSelection([])
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
            <Helmet>
                <title>
                    Agromall - Admin
                </title>
            </Helmet> 
            <Navbar sync={true} addmarket={true} />
            <div className={styles.container}>
                {market.length>0 &&(
                    <div className={styles.data}>
                    <div className={styles.grid_header}>
                        <h2>My Markets.</h2>
                        <div style={{display:"flex",alignItems:"center"}}>
                            {selection.length === 1?<UpdateMarket selection={selection} />:<></>}
                            {selection.length>0? <DeleteMarket selection={selection} />:<></>}
                        </div>
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
                )}
                {market.length == 0? (
                    <div style={{display:'flex',color:'grey',alignItems:'center',justifyContent:'center',width:'100%'}}>
                        <h3>You Have no market data yet, click Add Market to get Started</h3>
                    </div>
                ):''}
               
                <div className={styles.side}>
                    <h3>Some data or functionality</h3>
                </div>
            </div>
        </>
    )
}

export default AdminDash
