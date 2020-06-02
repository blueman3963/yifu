import React, { Component } from 'react'
import Router from 'next/router'

class CaseList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projs: [],
      content: []
    }

    this.indent = 0
    this.length = 1
    this.virtualBody
    this.wrapper

    this.pos
    this.touch = false
  }

  componentDidMount() {
    this.wrapper = document.querySelector('.list_wrapper')
    this.virtualBody = document.createElement('span')


    let projs = []
    this.props.shows.forEach(i => {
      projs.push(i)
    })


    this.setState({projs}, () => {
      let ctnt = []
      let group = 0
      let num = ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩']
      let count = 0

      //generate a long array of eveything
      projs.forEach((proj,index) => {
        if(proj.fields.id === 'handshake'){
          ctnt.push({body:this.createDom(num[index],'text'),order:count,group:group})
          count++
          for (let i = 0; i < proj.fields.title.length; i++) {
            count++
            ctnt.push({body:this.createDom(proj.fields.title.charAt(i),'handshake'),order:count,group:group})
          }
        } else {
          ctnt.push({body:this.createDom(num[index],'text'),order:count,group:group})
          count++
          for (let i = 0; i < proj.fields.title.length; i++) {
            count++
            ctnt.push({body:this.createDom(proj.fields.title.charAt(i),'text'),order:count,group:group})
          }
          ctnt.push({body:this.createDom(proj.fields.thumbnails[0].fields.file.url,proj.fields.thumbnails[0].fields.file.contentType),order:count,group:group})
          count++
          for (let i = 0; i < proj.fields.detail.length; i++) {
            count++
            ctnt.push({body:this.createDom(proj.fields.detail.charAt(i),'text'),order:count,group:group})
          }
          if(proj.fields.thumbnails[1]) {
            ctnt.push({body:this.createDom(proj.fields.thumbnails[1].fields.file.url,proj.fields.thumbnails[1].fields.file.contentType),order:count,group:group})
            count++
          }
          group++
        }
      })
      this.length = ctnt.length
      this.setState({content:ctnt}, () => {
        this.shiftArray()
      })
    })

    document.addEventListener('touchstart', (e) => this.touchStart(e))
    document.addEventListener('touchend', () => {this.touch = false})
    document.addEventListener('touchmove', (e) => this.touchMove(e))

    //append hover
    var css = '.proj-wrapper:hover{background-color: transparent;color: #fff;}.thumb-asset:hover {transform: scale(1);}'
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);

  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', (e) => this.touchStart(e))
    document.removeEventListener('touchend', () => {this.touch = false})
    document.removeEventListener('touchmove', (e) => this.touchMove(e))
  }

  touchStart(e) {
    this.pos = [0,0]
    this.pos[1] = e.touches[0].clientY
  }

  touchMove(e) {
    if(e.touches[0].clientY - this.pos[1] > 1) {
      this.pos[1] = e.touches[0].clientY
      this.wheel(-1)
      setTimeout(() => this.wheel(-1),10)
      setTimeout(() => this.wheel(-1),20)
    } else if(e.touches[0].clientY - this.pos[1] < -1) {
      this.pos[1] = e.touches[0].clientY
      this.wheel(1)
      setTimeout(() => this.wheel(1),10)
      setTimeout(() => this.wheel(1),20)
    }
  }

  createDom(content,type) {
    let dom
    if(type === 'text') {
      dom = document.createElement('span')
      dom.style.display = 'inline-block'
      dom.style.height = '60px'
      dom.style.verticalAlign = 'top'
      if(content === ' ') {
        dom.style.width = '.3em'
      }
      dom.innerHTML = content
      return dom
    } else if(type === 'handshake') {
      dom = document.createElement('span')
      dom.style.display = 'inline-block'
      dom.style.height = '60px'
      if(type === 'title') {
        dom.style.fontFamily = 'grad, serif'
        dom.style.fontStyle = 'italic'
      }
      if(type === 'num') {
        dom.style.marginRight = '10px'
        dom.style.fontSize = '20px'
      }
      dom.style.verticalAlign = 'top'
      if(content === ' ') {
        dom.style.width = '.3em'
      }
      dom.innerHTML = content === 'z'?"\uD83E\uDD1D":content
      return dom
    } else {
        if(type.includes('video')) {
          dom = document.createElement('video')

          dom.src = content
          dom.style.height = '50px'
          dom.muted = true
          dom.playsInline = true
          dom.loop = true
          dom.autoplay = true
          dom.style.margin = '0 20px'
          dom.style.display = 'inline-block'
          dom.style.verticalAlign = 'top'
          dom.className='thumb-asset'

          return dom
        } else {
          dom = document.createElement('img')
          dom.style.height = '50px'
          dom.src = content
          dom.style.margin = '0 20px'
          dom.style.display = 'inline-block'
          dom.style.verticalAlign = 'top'
          dom.className='thumb-asset'
          return dom
        }
    }
  }

  shiftArray() {
    let ctnts = this.state.content.concat(this.state.content).slice(this.indent,this.indent+this.state.content.length)
    let startGroup = ctnts[0].group
    let count = 0
    let ctntsGrouped = [{body:[],group:startGroup}]
    ctnts.forEach((i,index) => {
      if(i.group === startGroup) {
        ctntsGrouped[count].body.push(i)
      } else {
        if(startGroup == this.state.projs.length-1) {
          startGroup = 0
        }else {
          startGroup++
        }
        count++
        ctntsGrouped.push({body:[i],group:startGroup})
      }
    })
    this.renderArray(ctntsGrouped)

  }

  renderArray(ctntsGrouped) {
    this.virtualBody.innerHTML = ''
    this.wrapper.innerHTML = ''

    ctntsGrouped.forEach(group => {
      let groupDom = document.createElement('span')
      groupDom.className='proj-wrapper'
      groupDom.style.wordBreak = 'break-all'
      group.body.forEach(i => {
        groupDom.appendChild(i.body)
      })
      groupDom.onclick = () => this.goto(this.state.projs[group.group].fields.id)
      this.virtualBody.appendChild(groupDom)
    })
    this.wrapper.appendChild(this.virtualBody)

  }

  wheel = (shift) => {

    this.indent += shift
    if(this.indent >= this.length) {
      this.indent = 0
    } else if (this.indent <= -1) {
      this.indent = this.length-1
    }
    this.shiftArray()

  }

  goto(id) {
    if(id === 'handshake') {
      window.open('https://incaseidontseeya.com', '_blank');
    } else if (id === 'about') {
      Router.push('/about',`/about`).then(() => window.scrollTo(0, 0))
    } else {
      Router.push('/p/[id]',`/p/${id}`).then(() => window.scrollTo(0, 0))
    }
  }

  render() {
    return(
      <div>
      <style jsx>{`
        .list_wrapper {

          font-family: roc-grotesk, sans-serif;
          font-weight: 400;
          font-style: normal;

          width: calc(100% - 40px);
          max-width: 1200px;
          margin: 20px auto;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 50vw;
          font-size: 24px;
          transform: translateX(-50%);
        }


      `}</style>

      <div className='list_wrapper'>
      </div>

      </div>
    )
  }
}

export default CaseList;
