import React from 'react'
import './SideInfoArticle.css'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import MainContext from '../../../mainContext'
import SubTitle from '../../../../../components/subTitle/SubTitle'

class SideInfoArticle extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="side-info-article">
        <SubTitle text="最近发布" />
        <MainContext.Consumer>
          {itemList => itemList.map((item, index) => {
            return <a className="side-info-article-item text-over" key={item.id}>{item.title}</a>
          })}
        </MainContext.Consumer>
      </div>
    )
  }
}

SideInfoArticle = withRouter(SideInfoArticle)

export default SideInfoArticle