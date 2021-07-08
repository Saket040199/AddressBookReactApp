import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import './header.scss'

export default class Header extends Component {
    render() {
        return (
            <header className ="header-content header">
            <div className ="logo-content">
                <img className ="image" src = {logo}/>
                <div>
                    <span className ="add-text">ADDRESS</span><br/>
                    <span className="add-text add-book">BOOK</span>
                </div>
            </div>
        </header>

        )
    }
}