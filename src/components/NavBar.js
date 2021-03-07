import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Nav = styled.nav`
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
        background-color: #333D51;
        height: 67px;
        padding: 10px;
        z-index: 999;
    `;
 
    const NavButton = styled.button`
        width: ${props => props.mobileSite ? '100%' : '120px'};
        height: ${props => props.mobileSite ? '2rem' : '60px'};
        background-color: #333D51;
        color: #F4F3EA;
        font-family: "Roboto Condensed", sans-serif;
        font-size: ${props => props.mobileSite ? '24px' : '16px'};
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 0.3rem;
        transition: all 0.5s;
        &:hover {
            
            color: #D3AC2B;
            transform: scale(1.1)
        }
        
        margin-right: ${props => props.mobileSite ? '0' : '40px'};
        margin-top: ${props => props.mobileSite ? '45px' : '10px'};
        text-align: center;
    `;

    const NavButtonsDiv = styled.div`
        
        position: relative;
        float: right;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 75vw;
        height: 100px;
        box-sizing: border-box;
    `;

    const MobileNavButtonsDiv = styled.div`
        position: absolute;
        left: 0;
        padding-left: 40px;
        padding-top: 10px;
        top: 80px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        z-index: 100;
        width: 105vw;
        background-color: #333D51;
        height: 100vh;
    `;

function NavBar({logout, getOrders, getAdminOrders, user, mobile }){

    const logoStyle = {
        float: 'left', 
        marginLeft: '20px', 
        marginTop: '0px',
        color: '#F4F3EA', 
        fontSize: '24px',
    };

    const greetingStyle = {
        color: '#F4F3EA',
        fontSize: '14px',
        textShadow: 'none',
        marginTop: '10px',
        zIndex: '101'
    }

    const [ showNav, setShowNav ] = useState(false);
    const [ translucent, setTranslucent ] = useState(false);

    const isUserAdmin = user.role === 'administrator';

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 0 ? setTranslucent(true) : setTranslucent(false); 
        })
    }, []);

    return (
        <Nav style={{opacity: translucent ? '0.8' : '1'}}>
            {!mobile && 
            <Link to='/home'>
            <div className="title" style={logoStyle}> <i className="fab fa-apple"></i> Shop
            <div className="greeting" style={greetingStyle}>Welcome back, <em>{user.username}</em></div>
            </div>
            </Link>}
            {!mobile && 
            <Fragment>
            <NavButtonsDiv>
                <Link to='/orders'>
                    <NavButton onClick={() => {
                        isUserAdmin ? getAdminOrders() : getOrders()
                    }}>{isUserAdmin ? 'Orders' : 'My Orders'}</NavButton>
                </Link>
                {isUserAdmin && 
                        <Link to='/create-product'>
                        <NavButton>Create a Product</NavButton>
                        </Link>
                }
                <Link to='/products'>
                    <NavButton>Products</NavButton>
                </Link>
                <Link to='/password'>
                    <NavButton>Manage Passwords</NavButton>
                </Link>
                <NavButton onClick={logout}>Logout</NavButton>
            </NavButtonsDiv>
            </Fragment>
            }
            {mobile && 
            <NavButton 
            onClick={() => setShowNav(!showNav)} 
            style={{ float: 'left'}} 
            >
                { showNav ? <i className="fas fa-times fa-2x"></i> : <i className="fas fa-bars fa-2x"></i>}
            </NavButton>}
            {showNav && 
            <MobileNavButtonsDiv onClick={() => mobile && setShowNav(!showNav)}>
                <Link to='/home'>
                    <NavButton mobileSite={true}>Home</NavButton>
                </Link>
                <Link to='/orders'>
                    <NavButton mobileSite={true} onClick={isUserAdmin ? getAdminOrders : getOrders}>{isUserAdmin ? 'Orders' : 'My Orders'}</NavButton>
                </Link>
                {isUserAdmin && 
                        <Link to='/create-product'>
                        <NavButton mobileSite={true}>Create a Product</NavButton>
                        </Link>
                }
                <Link to='/products'>
                    <NavButton mobileSite={true}>Products</NavButton>
                </Link>
                <Link to='/password'>
                    <NavButton mobileSite={true}>Manage Passwords</NavButton>
                </Link>
                <div className="logout" 
                style={{width: '80vw', 
                left: '0', position: 'relative', 
                border: 'none', 
                borderTop: '1px solid #D3AC2B', 
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: '20vh'}}>
                <Link to='/'>
                    <NavButton mobileSite={true} onClick={logout}>Logout</NavButton>
                </Link>
                </div>
                
            </MobileNavButtonsDiv>}
        </Nav>
    )
}

export default NavBar;