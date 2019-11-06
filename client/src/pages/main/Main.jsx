import React from 'react'
import './Main.css'

import MainContext from './mainContext'
import TopNav from './mainComponents/topNav/TopNav'
import SideInfo from './mainComponents/sideInfo/SideInfo'
import MainContent from './mainComponents/mainContent/MainContent'
import Directory from './mainComponents/directory/Directory'
import { fn } from 'moment'

function showToTop(e) {
  console.log(e)
}
class MainPage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      contentItems: [
        {
          id: 1,
          title: 'JavaScript原理探讨',
          content: '这回我来对js提出自己的一些理解',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }, 
        {
          id: 2,
          title: 'node+react+antd开发博客',
          content: '运用Node.js + react + antd开发个人博客项目',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }, 
        {
          id: 3,
          title: 'node+react+antd开发博客',
          content: '运用Node.js + react + antd开发个人博客项目',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }, 
        {
          id: 4,
          title: 'node+react+antd开发博客',
          content: '运用Node.js + react + antd开发个人博客项目',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }, 
        {
          id: 5,
          title: 'node+react+antd开发博客',
          content: '运用Node.js + react + antd开发个人博客项目',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }, 
        {
          id: 6,
          title: 'node+react+antd开发博客',
          content: '运用Node.js + react + antd开发个人博客项目',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }, 
        {
          id: 7,
          title: '啊啊啊啊啊啊啊啊啊啊',
          content: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          read: 1,
          comment: [],
          like: 1,
          createTime: 1572921746239
        }
      ]
    }
  
  }

  static getDerivedStateFromProps(props, state) {
    // ItemListContext = React.createContext({
    //   ...state
    // })
    return state
  }

  componentDidMount() {
    window.addEventListener('scroll', showToTop)
  }

  render() {
    return (
      <div className="main-page-box">
        <TopNav />
        <div className="main-page-body">
          <MainContext.Provider value={this.state.contentItems}>
            <SideInfo />
            <MainContent />
            <Directory />
          </MainContext.Provider>
        </div>
      </div>
    )
  }
}

export default MainPage