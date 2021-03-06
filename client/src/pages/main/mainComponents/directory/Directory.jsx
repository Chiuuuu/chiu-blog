import React from 'react'
import './Directory.css'

import MainContext from '../../mainContext'
import SubTitle from '../../../../components/subTitle/SubTitle'

class Directory extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  scrollToAnchor(id) {
    const scrollTop = document.getElementById('item_'+id).offsetTop - 80   // 减去顶部nav高度50+阴影10
    this.props.scrollTo(scrollTop)
  }

  render() {
    return (
      <div className="directory-box">
        <SubTitle text="快速定位" />
        <div className="directory-list">
          <MainContext.Consumer>
            {itemList => itemList.map((item, index) => {
              return <a 
                id={'anchor_' + item.id} 
                className="side-info-article-item text-over"
                key={item.id} 
                onClick={() => this.scrollToAnchor(item.id)}>{item.title}</a>
            })}
          </MainContext.Consumer>
        </div>
        <div className="plice">京ICP备19108748号-1</div>
      </div>
    )
  }
}

export default Directory