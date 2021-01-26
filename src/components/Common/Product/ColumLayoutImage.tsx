import React from 'react';

interface AppProps{
    image:  string;
}

const ColumnLayoutImage = (props: AppProps) => {
    const { image} = props;

    return (
        <div>          
            <div style={{maxWidth: "100%", minHeight: 200, display: "flex", alignItems: "center"}}>
                <img src={image} alt="" style={{width: "100%", height: "100%"}} />
            </div>     
        </div>
    )
}

export default ColumnLayoutImage;
