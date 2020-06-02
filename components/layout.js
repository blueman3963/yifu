import React, { Component } from 'react'

import Nav from './Nav'
import { initGA, logPageView } from '../utils/analytics'

import * as cDefault from '../static/icons/default.png'
import * as cPointer from '../static/icons/pointer.png'

import Router from 'next/router'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.cursor = React.createRef()

    this.state = {
      cursor: 'default',
    }
  }

  componentDidMount() {

    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()

    window.addEventListener('mousemove',e => this.cursorMove(e))

  }

  cursorMove(e) {
    if(this.cursor.current) {


      if(e.target.classList.contains('link') && this.state.cursor === 'default'){
        this.setState({cursor:'pointer'})
      }else if(!e.target.classList.contains('link') && this.state.cursor === 'pointer') {
        this.setState({cursor:'default'})
      }

      this.cursor.current.style.left = e.clientX + 'px'
      this.cursor.current.style.top = e.clientY + 'px'
    }
  }

  render() {
    return (
      <div>
        <style jsx global>{`

          @import url("https://use.typekit.net/udj6uwt.css");

          * {
            scroll-behavior: smooth;
            cursor: none !important;
          }

          body {
            color: #fff;
            background-color: #000;
            cursor: none;
            width: 100vw;
            height: 100vh;
            padding: 0;
            margin: 0;
            overflow-x: hidden;
            background-image: url('');
          }

          .cursor {
            position: fixed;
            left: 50vw;
            top: 50vh;
            pointer-events: none;
            width: 50px;
            z-index: 9999;
            margin-left: -10px;

            @media screen and (max-width: 900px) {
              display: none;
            }

            img {
              width: 100%;
            }
          }
        `}</style>
      <div className='ctnt'>
          <div className='cursor' ref={this.cursor}>
            <img src={this.state.cursor === 'default' ? cDefault : cPointer}/>
          </div>
          <Nav />

          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;
