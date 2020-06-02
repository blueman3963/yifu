import React, { Component } from 'react'

import Image from './image.jsx'

class Case extends Component {
  constructor(props) {
    super(props)
  }

  renderBody(content) {

    switch(content.nodeType) {
        case 'paragraph':
          if (content.content[0].value.match(".*\\w.*")) {

            return <div className='text-block'>
              {content.content[0].value}

              <style jsx>{`
                  .text-block {
                    margin-bottom: 32px;
                  }
              `}</style>
              </div>;
          }
          break;
        case 'embedded-asset-block':
          if(content.data.target.fields.file.contentType.includes('image')){
            return <div className={'block '+content.data.target.fields.description}>
                <img
                  src={content.data.target.fields.file.url}
                />

                <style jsx>{`

                      .block {

                        width: calc(46vw - 20px);
                        display: inline-block;
                        margin-bottom: 32px;

                        img {
                          width: 100%;
                        }

                        @media screen and (max-width: 900px) {
                          width: 100% !important;
                          padding: 0 0 20px;
                        }
                      }
                      .full {
                        width: 100%;
                      }
                      .w20 {
                        width: 20%;
                      }
                      .w35 {
                        width: 35%;
                      }
                      .w65 {
                        width: 65%;
                      }
                `}</style>
              </div>
          }else{
            return <div  className={'block '+content.data.target.fields.description}>
                <video muted playsInline loop autoPlay>
                  <source src={content.data.target.fields.file.url} type={content.data.target.fields.file.contentType}/>
                </video>
                <style jsx>{`
                    .block {
                      width: calc(46vw - 20px);
                      display: inline-block;
                      margin-bottom: 32px;


                      @media screen and (max-width: 900px) {
                        padding: 0 0 20px;
                      }

                      video {
                        width: 100%;
                      }

                      @media screen and (max-width: 900px) {
                        width: 100% !important;
                        display: block !important;
                        margin: 0 !important;
                      }
                    }

                    .full {
                      width: 100%;
                    }

                    .w20 {
                      width: 20%;
                    }
                    .w35 {
                      width: 35%;
                    }
                    .w65 {
                      width: 65%;
                    }
                `}</style>
              </div>
          }
        case 'embedded-entry-block':
          return <div className='block'>

            <div className='block-img'>
              <img
                src={content.data.target.fields.image.fields.file.url}
              />
              <div className='caption'>{ content.data.target.fields.image.fields.description }</div>
            </div>
            <div className='block-text'>{ content.data.target.fields.caption }</div>


            <style jsx>{`
            `}</style>
            </div>;
          break;
        default:
          return false;
      }
  }

  render() {

    const show = this.props.show

    return (
      <div>
        <style jsx>
        {`

          .wrapper {
            font-family: roc-grotesk, sans-serif;
            font-weight: 400;
            font-style: normal;
            padding: 4vw;
            overflow-y: hidden;
            display: flex;
            flex-wrap: wrap;
            font-size: 40px;
            justify-content: space-between;
            @media screen and (max-width: 900px) {
              font-size: 18px;
            }

            div {
              width: calc(46vw - 20px) !important;
              display: inline-block;
              min-height: 200px;
            }

            .link {
              cursor: none;
              color: #fff;
              text-decoration: underline;
              font-size: 24px;
              @media screen and (max-width: 900px) {
                font-size: 18px;
              }
            }

            .title {
              font-family: gimlet-display, serif;
              font-weight: 300;
              font-style: italic;

              display: inline;
            }

            .cover {
              width: 100%;
              margin-bottom: 32px;
            }

            p {
              display: inline;
            }


          }

          .list {
            padding: 0 30px 4vw 4vw;
          }

          .intro {
          }
        `}
        </style>
        <div className='wrapper'>
          <div className='placeholder'></div>
          <div className='intro'>
            <div className='title'>{show.title}&nbsp;&nbsp;</div>
            {show.time}
            {
              show.link
              ?<div><a href={show.link} target='_blank'><div className='link'>see the product</div></a></div>
              :''
            }
          </div>
          {
            show.cover.fields.file.contentType.includes('video')
            ?<video muted playsInline loop autoPlay style={{width: '100%', height: '56%', marginBottom: '40px'}}>
              <source src={show.cover.fields.file.url} type={show.cover.fields.file.contentType} size='100%' />
            </video>
            :<Image url={show.cover.fields.file.url} size='100%'/>

          }


          {
            show.detail.content.map((content) => this.renderBody(content))
          }
        </div>
      </div>
    )
  }
}

export default Case
