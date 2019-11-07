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
      </div>
    )
  }
}

export default AddPage