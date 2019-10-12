import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './modal'

function TopModal(option) {

  if (!option.text || option.text === '') throw 'TopModal: 请传入text且不能为空'

  let obj = {}

  const modalBox = document.createElement('div')
  modalBox.className = 'top-modal-mask'
  document.body.appendChild(modalBox)

  function close() {
    ReactDOM.unmountComponentAtNode(modalBox)
    document.body.removeChild(modalBox)
    obj = null
  }
  obj.close = close
  modalBox.close = close

  // 确认按钮方法
  option.confirm = function() {
    close()
    if (option.confirm_callback) option.confirm_callback()  // 确认后回调
  }

  option.cancel = function() {
    close()
    if (option.cancel_callback) option.cancel_callback()  // 取消后回调
  }

  ReactDOM.render(<Modal {...option} />, modalBox)

  return obj

}

// 私有方法
TopModal.closeAll = function() {
  let modals = Array.from(document.querySelectorAll('.top-modal-mask'))
  if (modals.length > 0) {
    modals.map(item => {
      item.close()
    })
  }
}

export default TopModal