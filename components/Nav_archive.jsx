import Link from 'next/link';
import React, { Component } from 'react';
import Router from 'next/router'

import client from '../utils/contentful'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      route: ''
    }

    Router.events.on('routeChangeComplete', () => {
        this.setState({route:Router.route})
        if(Router.route !== '/') {
          document.querySelector('.top-left').innerHTML = 'Home'
          document.querySelector('.top-left').style.textDecoration = 'underline'
        }
    });
  }

  componentDidMount() {


  }

  render() {

    return (
      <div>
      <style jsx>{`
          @import url("https://use.typekit.net/udj6uwt.css");

          .item {
            font-family: roc-grotesk-wide, sans-serif;
            font-weight: 500;
            font-style: normal;
            color: #fff;
            font-size: 40px;

            @media screen and (max-width: 900px) {
              font-size: 24px;
            }

            z-index: 200;
          }

          .item:hover {

          }

          .top-left {
            position: fixed;
            top: 0px;
            left: 0px;
            background-color: #0000ff;
            padding: 0px 10px;
            text-decoration: underline;
          }

          .bottom-left {
            position: fixed;
            bottom: 0px;
            left: 0px;

            a {
              background-color: #0000ff;
              margin-right: 25px;
              color: #fff;
              padding: 0px 10px;
            }
          }

          .top-right {
            position: fixed;
            top: 0px;
            right: 0px;

            a {
              background-color: lime;
              color: #333;
              padding: 0px 10px;
            }
          }

          .bottom-right {
            position: fixed;
            bottom: 0px;
            right: 0px;

            a {
              background-color: #0000ff;
              padding: 0px 10px;
            }
          }

          .overlay {
            width: 100vw;
            height: 200px;
            background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 999;
          }

          .link {
            text-decoration: underline;
            z-index: 200;
          }

          .email {
            color: #fff;
            &:after {
              content: "bluemanzhang@gmail.com";
            }

            @media screen and (max-width: 900px) {
              &:after {
                content: "@";
              }
            }
          }
      `}</style>

      <div className='top-right item link'>
        <a className='link' href='https://handshake.now.sh' target='_blank'>Hello</a>
      </div>
      <Link href='/'>
        <div className='top-left item'>
          Home
        </div>
      </Link>
      <div className='bottom-left item'>
        <Link href='/about'><a className='link'>About</a></Link>
      </div>
      <div className='bottom-right link item'>
        <a className='link email' href='mailto:bluemanzhang@gmail.com?subject=Hello%20There!'></a>
      </div>
    </div>
    )
  }
};

export default Nav;
