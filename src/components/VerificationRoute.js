import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from '../pages/LoginPage';
import VerificationPage from '../pages/VerificationPage';

const Verificationroute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/verification/:email" element={<VerificationPage />} />
                <Route path="/" element = { <Loginpage/>} />
            </Routes>
        </Router>


    )
}

export default Verificationroute