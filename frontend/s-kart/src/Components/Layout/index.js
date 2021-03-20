import React, { Component } from 'react';
import Header from '../Header';
import MenuHeader from '../MenuHeader';

const Layout =(props)=>  {
        return (
            <>
                <Header/>
                <MenuHeader/>
                {props.children}
            </>
        );
}

export default Layout;