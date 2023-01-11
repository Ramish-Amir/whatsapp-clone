import React from 'react'
import AuthCard from './AuthCard';


function Home() {
    return (
        <div className='homeContainer'>
            <div className='homeCard'>
                <img className='whatsappLogo' src='https://seeklogo.com/images/W/whatsapp-icon-logo-BDC0A8063B-seeklogo.com.png' alt='logo' />
                <h1 className='homeTitle'>WhatsApp Clone</h1>
                <span>by Ramish Amir</span>
                <p>
                    [ Developed using React JS and Redux for learning purpose. No connection to database. All the data is saved using Redux State Management. ]
                </p>
                <AuthCard />
            </div>
        </div>
    )
}

export default Home