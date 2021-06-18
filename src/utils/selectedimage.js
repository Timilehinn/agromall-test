import React from 'react'

function SelectedImage(prop) {
    return (
        <img src={prop.src} style={{margin:'.5rem'}} width="100px" height="100px" />
    )
}

export default SelectedImage
