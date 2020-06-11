import React from 'react'
import './Message.css'
import { Collapse, Badge, message } from 'antd';
import { connect } from 'react-redux'
import { getMessageList, updateMessageCheck } from '../../../request/message'

class Message extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      messageList: []
    }
  
  }

  componentDidMount() {
    getMessageList(this.props.userId)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          this.setState({
            messageList: res.data.sort((a, b) => {
              return (+new Date(b.createTime)) - (+new Date(a.createTime))
            })
          })
        } else {
          message.error(res.msg)
        }
      })
      .catch(err => {
        console.log('获取消息出错', err)
        message.error('获取消息出错, 请刷新重试')
      })
  }

  // 用手风琴模式, index值唯一, 否则返回的数组难以遍历(且数据重复率高)
  clickMessage = index => {
    const messageList = this.state.messageList
    if (messageList[index] && !messageList[index].isCheck) {
      messageList[index].isCheck = true
      // 修改isCheck的状态
      updateMessageCheck(messageList[index]._id)
    }
    this.setState({
      messageList
    })
  }

  render() {
    const { Panel } = Collapse;
    const messageList = this.state.messageList
    if (messageList.length < 1) return (
      <div>暂无消息</div>
    )
    return (
      <Collapse accordion onChange={(key) => this.clickMessage(key)}>
        {
          messageList.map((item, index) => {
            return <Panel header={<Badge dot={!item.isCheck}>{item.title}</Badge>} key={index} onClick={() => this.clickMessage()}>
              <p>{item.content}</p>
            </Panel>
          })
        }
      </Collapse>
    )
  }
}

const mapState = state => {
  return {
    userId: state.userId
  }
}
Message = connect(mapState)(Message)

export default Message