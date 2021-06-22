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


const MarketDiv=(prop)=>{

    return(
        <Link style={{textDecoration:'none'}} 
            to={{pathname:`/market/${prop.market.name}`,
                state:{params:{id:prop.market.id}}
            }}>
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
                    prop.market.desc} 
                </p>
            </div>
        </Link>
        
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
    const [ long, setLong ] = useState('')
    const [ lat, setLat ] = useState('')
    const [ searchInfo, setSearchInfo ] = useState('')
    const [ searchQuery, setSearchQuery ] = useState('')
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
        // Geocode.toLatLng("bennyrose hotel,akure").then(
        //     (response) => {
        //       const address = response.results[0].formatted_address;
        //       console.log(address);
        //     },
        //     (error) => {
        //       console.error(error);
        //     }
        //   );
        // Geocode.fromAddress("ennyrose hotel,akure").then(
        //     (response) => {
        //       const { lat, lng } = response.results[0].geometry.location;
        //       console.log(lat, lng);
        //     },
        //     (error) => {
        //       console.error(error);
        //     }
        //   );
        getLocation();
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

    const getLocation=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position);
        } else { 
            console.error("Geolocation is not supported by this browser.");
        }
    }
    const position=(pos)=>{
        // alert('lat '+pos.coords.latitude+' long '+pos.coords.longitude)
        // alert(JSON.stringify(pos))
        setLong(pos.coords.longitude);
        setLat(pos.coords.latitude)
    }

    const classes = useStyles();
    const api_key ="";

    return (
        <>
        {isSearching? <LinearProgress style={{zIndex:100,width:'100%'}} />:<></>}
        <div className={styles.container}>
            <ToastContainer />
            <nav>
                <span className={styles.logo}>
                    AgroMall
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
                    
            </nav>
            <span style={{display:'flex',marginTop:'30px',alignItems:'center',fontWeight:'bold',height:'20px'}}>
                <button onClick={()=>alert(long+"  "+lat)} style={{
                    display:'flex',alignItems:'center',
                    border:'0px',backgroundColor:"transparent",
                    cursor:'pointer'
                }} variant="default">
                    <HiOutlineLocationMarker color="grey" size="20" />
                    <span title="Search by location" className={styles.location_text}>nearby</span>
                </button>
                <span style={{color:'lightgrey',paddingRight:'.5rem'}}>|</span>
                            {/* </div> */}
                <InputLabel htmlFor="grouped-select" style={{fontWeight:400,color:'grey',fontSize:'1.05rem'}}>Category</InputLabel>
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
                        <MarketDiv market={market} />
                        ))}
                        </>
                    ):(
                        <h2 style={{color:'grey'}}>No Market found at this time.</h2>
                    )}  
                </>
                }
            </main>
        </div>
        </>
    )
}

export default Home
