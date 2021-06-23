import React,{ useEffect, useState } from 'react';
import styles from '../styles/user/home.module.css'
import { makeStyles } from '@material-ui/core';
import { HiOutlineLocationMarker, HiSearch, HiViewGrid } from 'react-icons/hi'
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa';
import Geocode from "react-geocode";
import { ToastContainer, toast } from 'react-toastify';
import LinearProgress from '@material-ui/core/LinearProgress';
import Preview from '../utils/preview'
import { Button } from '@material-ui/core'

const MarketDiv=(prop)=>{

    return(
        <></>
        
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
    const [ isSearching, setIsSearching ] = useState(false)
    const [ long, setLong ] = useState(0)
    const [ lat, setLat ] = useState(0)
    const [ searchInfo, setSearchInfo ] = useState('')
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ userAddr, setUserAddr ] = useState('')
    const toastsettings ={
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
    }
    const useStyles =  makeStyles((theme)=>({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    }))

    const getMarkets=async()=>{
        setIsSearching(true)
        const res = await axios.get('https://agromall-server.herokuapp.com/api/market/all?limit=50&offset=0')
        console.log(res.data.market)
        if(res.data.success){
            setIsSearching(false)
            setAllMarket(res.data.market)
        }else{
            setIsSearching(false)
            toast.error('Something went wrong, Try again.',toastsettings)
        }
    }

    useEffect(()=>{
        getMarkets();
        handleLocation();
        getUserAddr()
    },[])

    // Searches by filtering avalilabe market 
    const found = allMarket.filter(m => {
        return m.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    })

    // search by category
    const categoryHandler=async()=>{
        setIsSearching(true)
        const found = []
        try{
            const res = await axios.get('https://agromall-server.herokuapp.com/api/market/all?limit=50&offset=0')
            if(res.data.success){
                res.data.market.forEach(m=>{
                    m.category.forEach(cat=>{
                        if(cat.cat === selectedCategory){
                            found.push(m)
                        }
                    })
                })
                setAllMarket(found)
                setIsSearching(false)
            }else{
                setIsSearching(false)
            }
        }catch(err){
            setIsSearching(false)
            toast.error('Something went wrong. Try again.',toastsettings)
        }
        
    }
    
    const handleSearch=async()=>{
        setIsSearching(true)
        const res = await axios.get(`https://agromall-server.herokuapp.com/api/market/search?q=${searchValue}`)
        // console.log(res.data.markets)
        const _markets = [];
        if(res.data.success){
            res.data.markets.forEach(m=>{
                _markets.push({id:m._source.id,location:m._source.location,images:m._source.images,category:m._source.category,name:m._source.name,desc:m._source.desc})
            })
            setAllMarket(_markets)
            setIsSearching(false)
            setSearchValue('')
            setSearchInfo(res.data.info)
            setSearchQuery(res.data.query)

        }else{
            setIsSearching(false)
            toast.error(res.data.msg, toastsettings)
        }
    }

    const handleLocation=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position);
        } else { 
            console.error("Geolocation is not supported by this browser.");
        }
    }
    const position=(pos)=>{
        setLong(pos.coords.longitude);
        setLat(pos.coords.latitude)
            
    }

    const getUserAddr=()=>{
            Geocode.fromLatLng(lat, long).then(
            (response) => {
              const address = response.results[0].formatted_address;
              console.log(address);
              setUserAddr(address)
            },
            (error) => {
              console.error(error);
            }
          );
    }

    // this function calculates the distance in km between the user and each market
    // distance is calculated by radius not by road.
    const distance=(m_lat, m_long)=> { // where lat, long are the users coords. and m_lat, m_long are coords of the market 
        var p = 0.017453292519943295;    // where Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((m_lat - lat) * p)/2 + 
                c(lat * p) * c(m_lat * p) * 
                (1 - c((m_long - long) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km (rad of the earth)
    }

    const getNearbyMarkets=()=>{
        // or query from the database which might be slow based on results returned
        var found = [];
        allMarket.forEach(m=>{
            if(distance(m.lat,m.long) < 15 ){
                found.push(m)
            }
        })
        setAllMarket(found)
    }  

    const distanceUnit=(m_lat,m_long)=>{
        const dis = distance(m_lat,m_long)
        if(dis > 1) return parseInt(dis) +'km'
        else if(dis < 1) return parseInt(dis * 1000) +'m'
    }

    return (
        <>
        {isSearching? <LinearProgress style={{zIndex:100,width:'100%'}} />:<></>}
        <div className={styles.container}>
            <ToastContainer />
            <nav>
                <span className={styles.logo}>
                    AgroMall Market
                </span>
                {/* <div style={{display:'flex',width:'60%',alignItems:'flex-start',justifyContent:"flex-end"}}> */}
                    <div className={styles.search}>
                        <span style={{display:'flex',width:'100%',alignItems:'center'}}>
                            <input 
                                value={searchValue}
                                onChange={e=>setSearchValue(e.target.value)}
                                placeholder="Search by name, description ..."
                            />
                            {searchValue? <FaTimes onClick={()=>setSearchValue('')} style={{cursor:'pointer',paddingRight:'.5rem'}}  color="rgb(0,135,55)" />:<></>}
                            <button title="Search Markets" className={styles.search_button} onClick={()=>handleSearch()}>Search</button>
                        </span>
                      
                        {searchValue? (
                        <div style={{display:'flex',width:'100%',wordBreak:'break-word',flexDirection:'column'}}>
                            {found.splice(0,3).map(f=>(
                                <Link style={{color:'black',textDecoration:'none'}}
                                    to={{
                                        pathname:`/market/${f.name}`,
                                        state:{params:{id:f.id}}
                                    }}
                                >
                                    <div className={styles.suggested} style={{color:"black"}}>
                                        {f.name.length>80? f.name.substring(0,80)+'...':f.name} 
                                        <span style={{fontSize:'.75rem',color:'grey',fontStyle:'italic'}}>on this page</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ):(
                        <></>
                    )
                    }

                    </div>
            <p style={{textAlign:"center",fontSize:'.75rem'}}><HiOutlineLocationMarker/>My location: {userAddr} (test purpose)</p>
            </nav>
            <span style={{display:'flex',marginTop:'30px',alignItems:'center',fontWeight:'bold',height:'20px'}}>
                <button onClick={()=>getNearbyMarkets()} style={{
                    display:'flex',alignItems:'center',
                    border:'0px',backgroundColor:"transparent",
                    cursor:'pointer'
                }} variant="default">
                    <HiOutlineLocationMarker color="grey" size="20" />
                    <span title="Search by location, location from your browser is usually determined by IP address which may not be correct" className={styles.location_text}>nearby (15km)</span>
                </button>
                <span style={{color:'lightgrey',paddingRight:'.5rem'}}>|</span>
                <InputLabel htmlFor="grouped-select" style={{fontWeight:400,color:'grey',fontSize:'.85rem'}}>Category</InputLabel>
                <Select onChange={(e)=>setSelectedCategory(e.target.value)} value={selectedCategory} style={{color:'grey',marginLeft:'.5rem',fontSize:'.85rem'}} id="grouped-select" >
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
                <HiSearch title="Search category" color="grey" size="20" style={{cursor:'pointer'}} onClick={()=>categoryHandler()} />
                <span style={{color:'lightgrey',paddingRight:'.5rem',paddingLeft:'.5rem'}}>|</span>
                <span onClick={()=>getMarkets()} style={{cursor:'pointer',display:'flex',alignItems:'center',color:'grey'}}>
                    <HiViewGrid />
                    <span style={{fontWeight:400,color:'grey',fontSize:'1.05rem'}}>All</span>
                </span>
            </span>
            {searchInfo?
                <p>{searchInfo} "<span style={{color:'grey',fontStyle:'italic'}}>{searchQuery}</span>"</p>
                :<></>
            }
            <main>
                {isSearching?(
                    <>
                        <Preview />
                        <Preview />
                        <Preview />
                    </>)
                :
                <>
                    {allMarket.length >0? (
                        <>
                        {allMarket.map(market=>(
                            <Link style={{textDecoration:'none'}} 
                            to={{pathname:`/market/${market.name}`,
                                state:{params:{id:market.id}}
                            }}>
                            <div className={styles.market}>
                                <div className={styles.market_image}>
                                    {market.images.map(img=>(
                                        <img src={img.imguri} style={{}}  width="100%" height='auto' />
                                    ))}
                                </div>
                                <div className={styles.category}>
                                    {market.category.map(cat=>(
                                        <span>{cat.cat}</span>
                                    ))}
                                </div>
                                <p style={{color:"grey",fontSize:'.85rem'}}>{distanceUnit(market.lat,market.long)} from you</p>
                                <p style={{color:'black'}}>{market.name.length>50? market.name.substring(0,50)+'...':market.name}</p>
                                <p style={{color:'grey', fontSize:'.8rem'}}><HiOutlineLocationMarker />  {market.location.length>50? market.location.substring(0,50)+'...':market.location}</p>
                                
                                <p style={{color:'black', fontSize:'.8rem'}}>
                                    {market.desc.length>100? market.desc.substring(0,100)+'...'
                                    :
                                    market.desc} 
                                </p>
                            </div>
                            </Link>
                        ))}
                        </>
                    ):(
                        <h2 style={{color:'grey'}}>No Market found at this time.</h2>
                    )}  
                </>
                }
            </main>
        </div>
        <Button disabled>prev</Button>
        <Button disabled>next</Button>
        <footer>

        </footer>
        </>
    )
}

export default Home
