import React, { Component } from 'react'

class Image extends Component {
  constructor(props) {
    super(props)
    this.image = React.createRef();
  }

  componentDidMount() {
    setTimeout( ()=> {
      this.image.current.style.opacity =  1;
    },500)
  }

  render() {
    return(
      <div>
        <style jsx>{`
            .image {
                width: 100%;
                background-color: #000;
                margin-bottom: 32px;

                img {
                  width: 100%;
                  opacity: 0;
                  display: block;
                  transition: opacity 1s;
                }
            }
        `}</style>
      <div className='image'>
        <img ref={this.image} src={this.props.url}/>
        </div>
      </div>
    )
  }
}

export default Image;
