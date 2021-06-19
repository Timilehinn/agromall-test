import React,{ useEffect, useState } from 'react';
import styles from '../styles/user/home.module.css'
import { makeStyles } from '@material-ui/core';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom'

const MarketDiv=(prop)=>{

    return(
        <div className={styles.market}>
            <div className={styles.market_image}>
                <img src={prop.market.images[0].imguri}  width="100%" />
            </div>
            <div className={styles.category}>
                {prop.market.category.map(cat=>(
                    <span>{cat.cat}</span>
                ))}
           </div>
            <p style={{color:'black'}}>{prop.market.name}</p>
            <p style={{color:'grey', fontSize:'.8rem'}}><HiOutlineLocationMarker />  {prop.market.location}</p>
            
            <p style={{color:'black', fontSize:'.8rem'}}>
                {prop.market.desc.length>100? prop.market.desc.substring(0,100)+'...'
                :
                prop.market.desc} <Link style={{color:'grey'}} 
                to={{pathname:`/market/${prop.market.name}`,state:{params:{id:prop.market.id}}}}>more</Link>
            </p>
        </div>
    )
}

function Home() {
    const [ allMarket, setAllMarket ] = useState([]);
    const [ searchResult, setSearchResult ] = useState([])
    const [ selectedCategory, setSelectedCategory ] =useState('');
    const [ searchValue, setSearchValue ] = useState('')
    const [ long, setLong ] = useState('')
    const [ lat, setLat ] = useState('')

    const useStyles =  makeStyles((theme)=>({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    }))

    const getMarkets=async()=>{
        const res = await axios.get('http://localhost:7777/api/market/all?limit=50&offset=0')
        setAllMarket(res.data.market)
    }

    const handleSearch=(v)=>{
        const found = allMarket.filter(m => {
            return m.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        })
    }
    

    

    useEffect(()=>{
        getMarkets();
    },[])

    const classes = useStyles();
    const api_key ="AIzaSyDACp6ZI_WWhM1y-vwWk9vgtw9t0Gfo--A";

    return (
        <div className={styles.container}>
            <nav>
                <span className={styles.logo}>
                    AgroMall
                </span>
                <div className={styles.navitems}>
                    <span>
                        <input 
                            className={styles.search}
                            value={searchValue}
                            onChange={(e)=>handleSearch(e.target.value)}
                        />
                    </span>
                    <span>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-select">By Category</InputLabel>
                            <Select id="grouped-select" defualtValue="category">
                                <MenuItem value="dairy">
                                    sflvjnsl
                                </MenuItem>
                            </Select>
                    </FormControl>
                    
                    </span>
                    <span>
                        <HiOutlineLocationMarker />
                        <p>Nearby markets</p>
                    </span>
                </div>
            </nav>


            <main >
                {allMarket.map(market=>(
                    <MarketDiv market={market} />
                ))}
            </main>
        </div>
    )
}

export default Home
