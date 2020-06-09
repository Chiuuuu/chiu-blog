import React from 'react'
import './AddArticle.css'

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import { debounce } from '../../tools'
import marked from 'marked'
import TopNav from '../../components/topNav/TopNav'
import { Input } from 'antd';
const { TextArea  } = Input

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

class AddPage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      markedText: ''
    }
    this.markedText = null
    this.marked = debounce(function(value) {
      this.markedText.innerHTML = marked(value);
    }, 300)
  }

  getText = (e) => { 
    e.persist();
    let value = e.target.value
    this.marked(value)
  }


  render() {
    return (
      <div className="add-article-box">
        <TopNav />
        <div className="add-article-title">
          <Input placeholder="请输入标题" />
        </div>
        <div className="add-article-content">
          <div className="add-article-left">
            <TextArea className="add-article-textarea" onInput={ this.getText }></TextArea>
          </div>
          <div className="add-article-right">
            <div className="add-article-markdown" ref={(textarea) => this.markedText = textarea}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddPage