import React,{ useEffect, useState } from 'react';
import styles from '../styles/user/home.module.css'
import { makeStyles } from '@material-ui/core';
import { HiOutlineLocationMarker, HiSearch } from 'react-icons/hi'
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa';
import Geocode from "react-geocode";

const MarketDiv=(prop)=>{

    return(
        <div className={styles.market}>
            <div className={styles.market_image}>
                {prop.market.images.map(img=>(
                    <img src={img.imguri} style={{}}  width="100%" height='auto' />
                ))}
            </div>
            <div className={styles.category}>
                {prop.market.category.map(cat=>(
                    <span>{cat.cat}</span>
                ))}
           </div>
            <p style={{color:'black'}}>{prop.market.name.length>50? prop.market.name.substring(0,50)+'...':prop.market.name}</p>
            <p style={{color:'grey', fontSize:'.8rem'}}><HiOutlineLocationMarker />  {prop.market.location.length>50? prop.market.location.substring(0,50)+'...':prop.market.location}</p>
            
            <p style={{color:'black', fontSize:'.8rem'}}>
                {prop.market.desc.length>100? prop.market.desc.substring(0,100)+'...'
                :
                prop.market.desc} <Link style={{color:'grey'}} 
                to={{pathname:`/market/${prop.market.name}`,state:{params:{id:prop.market.id}}}}>view</Link>
            </p>
        </div>
    )
}

function Home() {
    Geocode.setApiKey("AIzaSyDACp6ZI_WWhM1y-vwWk9vgtw9t0Gfo--A");
    Geocode.setRegion("ng");
    Geocode.setLocationType("ROOFTOP");
    const [ allMarket, setAllMarket ] = useState([]);
    const [ searchResult, setSearchResult ] = useState([])
    const [ selectedCategory, setSelectedCategory ] =useState('vegetable'); // default value
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


    useEffect(()=>{
        getMarkets();
    },[])

    // Searches by filtering avalilabe market 
    const found = allMarket.filter(m => {
        return m.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    })

    // search by category
    const categoryHandler=async(e)=>{
        const res = await axios.get('http://localhost:7777/api/market/all?limit=50&offset=0')
        const found = []
        res.data.market.forEach(m=>{
            m.category.forEach(cat=>{
                if(cat.cat === selectedCategory){
                    found.push(m)
                }
            })
        })
        setAllMarket(found)
    }


    const classes = useStyles();
    const api_key ="";

    return (
        <div className={styles.container}>
            <nav>
                <span className={styles.logo}>
                    AgroMall
                </span>
                    <div className={styles.search}>
                        <input 
                            value={searchValue}
                            onChange={e=>setSearchValue(e.target.value)}
                        />
                        
                        {searchValue? (
                        <div style={{display:'flex',width:'100%',wordBreak:'break-word',flexDirection:'column'}}>
                        {found.splice(0,5).map(f=>(
                            <Link style={{color:'black',textDecoration:'none'}}
                                to={{
                                    pathname:`/market/${f.name}`,
                                    state:{params:{id:f.id}}
                                }}
                            >
                                <div className={styles.suggested} style={{color:"black"}}>
                                    {f.name.length>80? f.name.substring(0,80)+'...':f.name}
                                </div>
                            </Link>

                        ))}
                        </div>
                    ):(
                        <></>
                    )
                    }
                    </div>
                    
                    
            </nav>
            <span style={{display:'flex',marginTop:'30px',alignItems:'center',fontWeight:'bold',height:'20px'}}>
                            <div style={{display:'flex',alignItems:'center',marginRight:'1rem'}}>
                                <HiOutlineLocationMarker color="grey" size="20" />
                                <p className={styles.location_icon} style={{color:'grey',fontWeight:'lighter'}}>Nearby markets</p>
                            </div>
                            <InputLabel htmlFor="grouped-select">By Category</InputLabel>
                            <Select onChange={(e)=>setSelectedCategory(e.target.value)} value={selectedCategory} style={{marginLeft:'.5rem'}} id="grouped-select" >
                                <MenuItem value="dairy">
                                    Dairy
                                </MenuItem>
                                <MenuItem value="fruits">
                                    Fruits
                                </MenuItem>
                                <MenuItem value="vegetable">
                                    Vegetable
                                </MenuItem>
                                <MenuItem value="grains">
                                    Grains
                                </MenuItem>
                            </Select>
                            <FaCheck color="grey" style={{cursor:'pointer'}} onClick={()=>categoryHandler()} />
            </span>
               
            <main>
                {allMarket.length >0? (
                    <>
                    {allMarket.map(market=>(
                    <MarketDiv market={market} />
                    ))}
                    </>
                ):(
                    <div>No Market is avalilabe for this category yet.</div>
                )}
                
            </main>
        </div>
    )
}

export default Home
