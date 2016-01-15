import React, {Component} from 'react'
import MarkdownEditor from '../component/MarkdownEditor'

export default class App extends Component {
  constructor(prop) {
    super(prop)
    this.state = {}
  }

  render() {
    return (
      <div class="app">
        <MarkdownEditor />
      </div>
    )
  }
}
