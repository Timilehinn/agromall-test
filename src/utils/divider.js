import React from 'react'

function Divider(prop) {
    return (
        <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{width:prop.width,backgroundColor:'lightgrey',height:'1px'}}/>
            <span style={{color:'lightgrey',display:'flex',flexDirection:'column',alignItems:'center',width:prop.textWidth,fontSize:'.7rem',margin:'.3rem'}}>
                {prop.text}
            </span>
            <div style={{width:prop.width,backgroundColor:'lightgrey',height:'1px'}}/>
        </div>
    )
}

export default Divider
