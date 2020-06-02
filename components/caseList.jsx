import React, { Component } from 'react'
import Router from 'next/router'

class CaseList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projs: [],
      content: [],
      load: 0
    }
    this.indentZoom = 0
    this.indent = 0
    this.length = 1
    this.virtualBody
    this.wrapper
    this.assetCount = 1000
    this.loading = React.createRef()
    this.fontSize = 40
    this.height = 100
  }

  componentDidMount() {
    this.setFontSize()
    window.addEventListener('resize', () => {
      this.setFontSize()
    })

    this.wrapper = document.querySelector('.list_wrapper')
    this.virtualBody = document.createElement('span')


    let projs = []
    this.props.shows.forEach(i => {
      projs.push(i)
    })


    this.setState({projs}, () => {
      this.assetCount = projs.length*2-2

      let ctnt = []
      let group = 0
      let num = ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩']
      let count = 0

      //generate a long array of eveything

      projs.forEach((proj,index) => {
        if(proj.fields.id === 'handshake'){
          ctnt.push({body:this.createDom(num[index],'num'),order:count,group:group})
          count++
          for (let i = 0; i < proj.fields.title.length; i++) {
            count++
            ctnt.push({body:this.createDom(proj.fields.title.charAt(i),'handshake'),order:count,group:group})
          }
        }else {
          ctnt.push({body:this.createDom(num[index],'num'),order:count,group:group})
          count++
          for (let i = 0; i < proj.fields.title.length; i++) {
            count++
            ctnt.push({body:this.createDom(proj.fields.title.charAt(i),'title'),order:count,group:group})
          }
          ctnt.push({asset: true, body:this.createDom(proj.fields.thumbnails[0].fields.file.url,proj.fields.thumbnails[0].fields.file.contentType),order:count,group:group})
          count++
          for (let i = 0; i < proj.fields.detail.length; i++) {
            count++
            ctnt.push({body:this.createDom(proj.fields.detail.charAt(i),'text'),order:count,group:group})
          }
          if(proj.fields.thumbnails[1]) {
            ctnt.push({asset: true, body:this.createDom(proj.fields.thumbnails[1].fields.file.url,proj.fields.thumbnails[1].fields.file.contentType),order:count,group:group})
            count++
          }
        }
        group++
      })
      this.length = ctnt.length
      this.setState({content:ctnt}, () => {
        this.shiftArray()
      })
    })

    window.addEventListener('wheel', this.wheel, {passive: false})


        //append hover
        var css = '.proj-wrapper{color: #222;}@media screen and (max-width: 900px) {.proj-wrapper{color: #fff;}}.proj-wrapper:hover{color: #fff;}.thumb-asset {border-radius: 10px; transition-duration: .3s;}.thumb-asset:hover {transform: scale(2);border-radius: 0px;}'
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);
  }

  setFontSize() {
    this.fontSize = (window.innerWidth+window.innerHeight)/60
    this.height = this.fontSize*2.5
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.wheel, {passive: false})
    window.removeEventListener('resize', () => {
      this.setFontSize()
    })
  }

  componentDidUpdate() {
    if(this.state.load === this.assetCount) {
      this.loading.current.style.opacity = 0
    }
  }

  createDom(content,type) {
    let dom
    if(type === 'text' || type === 'title' || type === 'num') {
      dom = document.createElement('span')
      dom.style.display = 'inline-block'
      dom.style.height = this.height + 10 + 'px'
      dom.style.fontSize = this.fontSize + 'px'
      if(type === 'num') {
        dom.style.marginRight = '10px'
        dom.style.fontSize = '20px'
      }
      if(type === 'title') {
        dom.style.fontFamily = "gimlet-display, serif"
        dom.style.fontWeight = 300
        dom.style.fontStyle = "italic"
      }
      dom.style.verticalAlign = 'top'
      if(content === ' ') {
        dom.style.width = '.3em'
      }
      dom.innerHTML = content
      return dom
    } else if(type === 'handshake') {
      dom = document.createElement('span')
      dom.style.display = 'inline-block'
      dom.style.height = this.height + 10 + 'px'
      dom.style.fontSize = this.fontSize + 'px'
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
    }else {
        if(type.includes('video')) {
          dom = document.createElement('video')

          dom.src = content
          dom.style.height = this.height + 'px'
          dom.muted = true
          dom.playsInline = true
          dom.loop = true
          dom.autoplay = true
          dom.style.display = 'inline-block'
          dom.style.margin = '0 20px'
          dom.style.verticalAlign = 'top'
          dom.className='thumb-asset'

          dom.onloadeddata = () => {
            let load = this.state.load + 1
            this.setState({load}, ()=> {
            })
          }

          return dom
        } else {
          dom = document.createElement('img')
          dom.style.height = this.height + 'px'
          dom.src = content
          dom.style.display = 'inline-block'
          dom.style.margin = '0 20px'
          dom.style.verticalAlign = 'top'
          dom.className='thumb-asset'

          dom.onload = () => {
            let load = this.state.load + 1
            this.setState({load}, ()=> {
            })
          }

          return dom
        }
    }
  }

  shiftArray() {
    let ctnts = this.state.content.concat(this.state.content).slice(this.indent,this.indent+this.length)
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
      groupDom.style.transitionDuration = '.2s'
      groupDom.style.wordBreak = 'break-all'
      group.body.forEach(i => {
        i.timeout = null
        let instance = document.createElement('span')
        instance.appendChild(i.body)
        groupDom.appendChild(instance)
      })
      groupDom.onclick = () => this.goto(this.state.projs[group.group].fields.id)
      this.virtualBody.appendChild(groupDom)
    })
    this.wrapper.appendChild(this.virtualBody)

  }

  wheel = (e) => {

    e.preventDefault()
    this.indent += Math.ceil(e.deltaY/2)

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
          margin: 20px auto;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 50vw;
          font-size: 40px;
          transform: translateX(-50%);
        }

        .loading {
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
          position: fixed;
          background-color: #000;
          color: #fff;
          display: flex;
          align-items: center;
          z-index: 99999;
          justify-content: center;
          transition: opacity 1s, font-size .1s;
          pointer-events: none;
          font-size: ${2+Math.ceil(100-this.state.load*100/this.assetCount)/5}vw;

          font-family: roc-grotesk, sans-serif;
          font-weight: 400;
          font-style: normal;
        }


      `}</style>

      <div className='list_wrapper'>
      </div>

      <div className='loading' ref={this.loading}>{Math.ceil(100-this.state.load*100/this.assetCount)}</div>

      </div>
    )
  }
}

export default CaseList;
