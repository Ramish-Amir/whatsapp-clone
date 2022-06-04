import React from 'react'
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate()
    return (
        <div className='homeContainer'>
            <div className='homeCard'>
                <img className='whatsappLogo' src='https://seeklogo.com/images/W/whatsapp-icon-logo-BDC0A8063B-seeklogo.com.png' alt='logo' />
                <h1 className='homeTitle'>WhatsApp Clone</h1>
                <button onClick={() => {navigate('/whatsapp')}} >Continue</button>
            </div>
        </div>
    )
}

export default Home