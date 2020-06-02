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
            font-family: Helvetica, Arial, Verdana, sans-serif;
            color: #fff;
            font-size: 20px;

            background-color: #0000ff;
            color: #fff;
            padding: 0px 5px;
            display: inline-block;
            position: relative;
            margin: 0;

            &:hover {
              background-color: #000 !important;
              color: #fff !important;
            }

            @media screen and (max-width: 900px) {
              font-size: 24px;
            }

            z-index: 200;
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
          }

          .email {
            color: #333;
            background-color: #ff0;
            &:after {
              content: "email";
            }

            @media screen and (max-width: 900px) {
              &:after {
                content: "@";
              }
            }
          }

          .inst {
            color: #333;
            background-color: #ff0;
          }

          .nav-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 200;
          }
      `}</style>
    <div className='nav-wrapper'>

        <div className='link'>
          <a className='link email item' href='mailto:bluemanzhang@gmail.com?subject=Hello%20There!'></a>
          <a className='link inst item' href='https://www.instagram.com/yifuzzz/' target='_blank'>instagram</a>
        </div>
      </div>
    </div>
    )
  }
};

export default Nav;
