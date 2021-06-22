import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/market.module.css'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import GoogleMapReact from 'google-map-react';

function Market(props) {

    const id = props.location.state.params.id
    const [ images, setImages ] = useState([])
    const [ category, setCategory ] = useState([])
    const [ name, setName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ lat, setLat ] = useState(0)
    const [ long, setLong ] = useState(0)


    const getMarket=async()=>{
        const res = await axios.get(`https://agromall-server.herokuapp.com/api/market/one?id=${id}`)
        setName(res.data.market.name) 
        setDesc(res.data.market.desc) 
        setLocation(res.data.market.location) 
        setCategory(res.data.market.category) 
        setImages(res.data.market.images) 
        setLat(parseFloat(res.data.market.lat)) 
        setLong(parseFloat(res.data.market.long)) 

    }
    var center = {lat:lat,lng:long}
    var zoom =11

    useEffect(()=>{
       getMarket()
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                {images.map(img=>(
                <img src={img.imguri} />
                ))}
            </div>
           <h2>
           {name}
           </h2>
           <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDACp6ZI_WWhM1y-vwWk9vgtw9t0Gfo--A" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <div
            lat={lat}
            lng={long}
            text="My Marker"
          />
        </GoogleMapReact>
           <div className={styles.category}>
                {category.map(cat=>(
                    <span>{cat.cat}</span>
                ))}
           </div>
           <p><HiOutlineLocationMarker />{location}</p>
           <div className={styles.desc}>
                <p style={{color:'black'}}>{desc}</p>
           </div>
          
        </div>
    )
}

export default Market
