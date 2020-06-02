import React from 'react'
import App from 'next/app'

import Layout from '../components/layout';

import "../style/global.css"

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <div>
        <style jsx>{`
        `}
        </style>
        <div>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </div>
    )
  }
}

export default MyApp
