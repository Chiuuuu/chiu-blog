import React from 'react'
import './TopNav.css'

import { withRouter } from "react-router";
import { BrowserRouter as Router , Route, Link, Switch, Redirect } from 'react-router-dom';
import { Button, Icon, Input } from 'antd';

const { Search } = Input;

class TopNav extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="top-nav-box">
        <div className="top-nav-left">
          chiu的博客
        </div>
        <div className="top-nav-center">
          <Search className="top-nav-search" placeholder="搜索文章" size="default" onSearch={value => console.log(value)} />
        </div>
        <div className="top-nav-right">
          {/* <Link><Button type="link"><Icon type="home" />首页</Button></Link>
          <Link><Button type="link"><Icon type="edit" />新建</Button></Link>
          <Link><Button type="link"><Icon type="user" />个人</Button></Link> */}
          <Button type="link"><Icon type="home" />首页</Button>
          <Button type="link"><Icon type="edit" />新建</Button>
          <Button type="link"><Icon type="user" />个人</Button>
        </div>
      </div>
    )
  }
}

export default TopNav