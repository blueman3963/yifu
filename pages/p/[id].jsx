import Layout from '../../components/layout'
import fetch from 'isomorphic-unfetch'
import React, { Component } from 'react'
import Link from 'next/link';

import Case from '../../components/caseDetail.jsx'

import client from '../../utils/contentful'

class Post extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const show = this.props.show
    return (
      <div>
        <style jsx>{`
            .next {
              font-family: roc-grotesk, sans-serif;
              font-weight: 400;
              font-style: normal;
              font-size: 30px;
              height: 400px;
              padding-bottom: 200px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;

              span {
                color: #fff;
              }
            }

            .back {
              position: fixed;
              left: 4vw;
              top: 4vw;
              font-family: roc-grotesk, sans-serif;
              font-weight: 400;
              font-style: normal;
              font-size: 40px;
              background-color: #000;
              z-index: 999;
              a {
                color: inherit !important;
              }
            }
        `}</style>
        <div className='back'><Link href='/'><a>Back</a></Link></div>
        <Case show={this.props.show} ids={this.props.ids}/>
        <div className='next'><Link href={`/p/${this.props.next.fields.id}`}><span className='link'><span style={{fontSize: '20px'}}>NEXT</span><br/><span style={{textDecoration: 'underline'}}>{this.props.next.fields.title}</span></span></Link></div>
      </div>
    )
  }
}

Post.getInitialProps = async (context) => {
  const data = await client.getEntry(context.query.id)
  const data2 = await client.getEntries({content_type: 'projects'})
  let pjs = [],next
  data2.items[0].fields.project.forEach(proj => {
    pjs.push(proj)
  })
  pjs.forEach((id,index) => {
    if( context.query.id === id.fields.id ) {
      if( index !== pjs.length-1 ) {
        next = pjs[index+1]
      } else {
        next = pjs[2]
      }
    }
  })

  return { show: data.fields, next: next };
}

export default Post;
