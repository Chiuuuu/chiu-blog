import React from 'react'
import './Message.css'
import { Collapse, Badge } from 'antd';

const { Panel } = Collapse;
class Message extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      messageList: [
        {
          id: 1,
          title: '消息1',
          isCheck: false,
          text: '我是消息111111111111'
        },
        {
          id: 2,
          title: '消息2',
          isCheck: false,
          text: '我是消息222222222222'
        },
        {
          id: 3,
          title: '消息3',
          isCheck: false,
          text: '我是消息333333333333'
        },
      ]
    }
  
  }

  // 用手风琴模式, index值唯一, 否则返回的数组难以遍历(且数据重复率高)
  clickMessage = index => {
    const messageList = this.state.messageList
    if (messageList[index] && !messageList[index].isCheck) {
      messageList[index].isCheck = true
      // 修改isCheck的状态
      // api(messageList[index].id)
    }
    this.setState({
      messageList
    })
  }

  render() {
    const messageList = this.state.messageList
    return (
      <Collapse accordion onChange={(key) => this.clickMessage(key)}>
        {
          messageList.map((item, index) => {
            return <Panel header={<Badge dot={!item.isCheck}>{item.title}</Badge>} key={index} onClick={() => this.clickMessage()}>
              <p>{item.text}</p>
            </Panel>
          })
        }
      </Collapse>
    )
  }
}

export default Message