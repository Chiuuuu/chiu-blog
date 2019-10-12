import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './modal'

function TopModal(option) {

  const obj = {}

  const modalBox = document.createElement('div')
  modalBox.className = 'top-modal-mask'
  document.body.appendChild(modalBox)
  ReactDOM.render(<Modal {...option} />, modalBox)

  const close = function() {
    ReactDOM.unmountComponentAtNode(modalBox)
    document.body.removeChild(modalBox)
    obj = null
  }
  obj.close = close

  return obj

}

// 私有方法
TopModal.closeAll = function() {
  const modals = document.querySelectorAll('.top-modal-mask')
  modals.map(item => {
    document.body.removeChild(item)
  })
}

export default TopModal