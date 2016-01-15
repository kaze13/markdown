import React, {Component} from 'react'
import Marked from 'marked'

export default class MarkdownEditor extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      value: prop.value ? prop.value : '',
      dragging:false
    }
  }

  handleEditAreaChange(e) {
    this.setState({value: e.target.value})
    this.updatePreview(e.target.value)
  }

  updateDimensions(){
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount(){
    //window.addEventListener("resize", this.updateDimensions);
    this.updatePreview(this.state.value);
  }

  componentWillMount() {
    //this.updateDimensions()
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.updateDimensions);
  }

  stopDragging() {
    this.setState({dragging: false})
    //container.removeEventListener('mousemove', drag)
    //dragger.classList.remove('-drag')
  }

  startDragging() {
    this.setState({dragging: true})
    //container.addEventListener('mousemove', drag)
    //dragger.classList.add('-drag')
  }

  drag(e) {
    if(!this.state.dragging){
      return
    }
    var total = this.editArea.offsetWidth + this.previewArea.offsetWidth,
      handlerWidth = this.dragger.offsetWidth,
      posX = this.dragger.getBoundingClientRect().left + handlerWidth - e.pageX,
      leftPercentage = ((e.pageX - this.editArea.getBoundingClientRect().left) - (posX + handlerWidth / 2)) / total,
      rightPercentage = 1 - leftPercentage

    e.preventDefault()
    //this.editArea.style.flex = leftPercentage
    //this.previewArea.style.flex = rightPercentage
    this.setState({editAreaPercentage:leftPercentage})
    this.setState({previewAreaPercentage:rightPercentage})

    console.log(posX)
    console.log(e.pageX)
    console.log('-----')
  }


  updatePreview(text) {
    this.setState({preview:{__html: Marked(text, {sanitize: true})}})
  }

  render() {
    return (
      <div id="markdown-editor" ref={(ref) => this.container = ref} onMouseUp={e => this.stopDragging(e)} onMouseMove={e => this.drag(e)}>
        <div id="edit-area"  ref={(ref) => this.editArea = ref} style={{flex:this.state.editAreaPercentage}}>
                <textarea id="editor" value={this.state.value} onChange={e => this.handleEditAreaChange(e)}/>
        </div>
        <div id="dragger"  ref={(ref) => this.dragger = ref}  onMouseDown={e => this.startDragging(e)}></div>
        <div id="preview-area"  ref={(ref) => this.previewArea = ref} style={{flex:this.state.previewAreaPercentage}}
             dangerouslySetInnerHTML={this.state.preview}>

        </div>
      </div>
    )
  }
}