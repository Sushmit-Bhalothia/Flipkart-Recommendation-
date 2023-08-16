import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/TopImg.png';
import Navbar from './Navbar';
import MainImg from '../assets/Walmart_logo.svg.png';
import Products from './Products';
import CartModal from './CartModal';

const HomePage = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const searchBar = document.querySelector('.search-container');
            const sticky = searchBar.offsetTop;

            setIsSticky(window.pageYOffset >= sticky);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isSticky && <div><Navbar /></div>}

            <div
                style={{
                    height: '50vh',
                    maxWidth: 'inherit',
                    position: 'relative',
                }}
                className={`relative container ${isSticky ? 'sticky' : ''}`}
            >
                <div
                    className="background-image"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        opacity: 0.5,
                    }}
                ></div>
                <div
                    className="main-img"
                    style={{
                        position: 'absolute',
                        top: '50%', // Adjust top position as needed
                        left: '50%', // Adjust left position as needed
                        transform: 'translate(-48%, -70%)', // Center the image
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '10px'
                    }}
                >
                    <img src={MainImg} alt='noimg' style={{ opacity: 1, maxWidth: '100%' }} />
                </div>
                <div
                    className="search-container absolute bottom-10 w-full p-4"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {!isSticky && (
                        <>
                        <input
                            type="text"
                            className="search-bar bg-white border border-gray-300 rounded p-2 w-full"
                            placeholder="Search Items..."
                            style={{
                                width: '50vw',
                                padding: '10px',
                                paddingLeft: '30px',
                                fontSize: '20px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                                border: '1px solid #ccc',
                                borderRadius: '30px', // Rounded corners
                                transition: 'border-color 0.3s', // Add a transition effect
                                cursor: 'pointer', // Change cursor on hover
                            }}
                        />
                        
                        </>   
                    )}
                </div>
                {!isSticky && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '10px', // Adjust top position as needed
                            right: '10px', // Adjust right position as needed
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            padding: '10px',
                            paddingRight:'15px',
                            borderColor: 'black',
                            borderWidth: '1px',
                        }}
                    >
                        <CartModal/>
                    </div>
                )}
            </div>
            <Products Title="Items Related to your Search"/>
            <Products Title="You may also Like"/>

            <style jsx>
                {`
                    .container {
                        position: relative;
                    }
                `}
            </style>
        </>
    );
};

export default HomePage;
