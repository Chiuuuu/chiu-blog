import React from 'react'
import './AddArticle.css'

import TopNav from '../../components/topNav/TopNav'

class AddPage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="add-article-box">
        <TopNav />
        <div className="add-article-left">
          <textarea className="add-article-textarea" ></textarea>
        </div>
        <div className="add-article-right">
          <textarea className="add-article-textarea" readOnly></textarea>
        </div>
      </div>
    )
  }
}

export default AddPage