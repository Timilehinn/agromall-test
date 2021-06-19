import React,{ useState, createContext, useEffect } from 'react'


export const MarketContext = createContext();

function MarketContextApi(props) {

    const [ market, setMarket ] = useState([]);
    const [ selection, setSelection ] = useState([]);

    const allValues = { market, setMarket, selection, setSelection };
     
    
    return (
        <MarketContext.Provider value={allValues} >
            {props.children}
        </MarketContext.Provider>
    )
}

export default MarketContextApi
