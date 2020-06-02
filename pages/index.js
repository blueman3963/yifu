import React, { Component } from 'react';
import Link from "next/link"
import fetch from 'isomorphic-unfetch'

import client from '../utils/contentful'

import List from '../components/caseList.jsx'
import MList from '../components/caseList_m.jsx'


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: false
    }
  }

  componentDidMount() {
    document.querySelectorAll('li').forEach((i,index) => {
      i.style.transform = `translate(-50%, -50%) rotate(${index * 8}deg) translateY(50vw) rotateX(90deg) rotateY(180deg)`
    })
    if(window.innerWidth < 900) {
      this.setState({mobile: true})
    }
  }
  render() {
    return(
      <div>
        <style jsx>{`

          .wrapper {
            padding-right: 0px;
            scroll-behavior: smooth;
          }

        `}</style>
        <div className='wrapper'>
          {
            this.state.mobile
            ?<MList shows={this.props.shows}/>
            :<List shows={this.props.shows}/>
          }

        </div>

      </div>
    )
  }
}

Index.getInitialProps = async () => {
  const data = await client.getEntries({content_type: 'projects'})
  console.log(data.items[0].fields.project)

  return {
    shows: data.items[0].fields.project
  };
}

export default Index;
