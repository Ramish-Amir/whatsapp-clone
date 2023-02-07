import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import AuthCard from './AuthCard';


function Home() {

    const navigate = useNavigate()
    useEffect(() => {
        const user = localStorage.getItem('token')

        if (user) {
            navigate('/whatsapp')
        }
    }, [])

    return (
        <div className='homeContainer'>
            <div className='homeCard'>
                <img className='whatsappLogo' src='https://seeklogo.com/images/W/whatsapp-icon-logo-BDC0A8063B-seeklogo.com.png' alt='logo' />
                <h1 className='homeTitle'>WhatsApp Clone</h1>
                <span>by Ramish Amir</span>
                <p>
                    [ Developed using React JS, Redux and Firebase for learning purpose. Register yourself with a dummy email and start chatting with your friends using their registered email. ]
                </p>
                <AuthCard />
            </div>
        </div>
    )
}

export default Home