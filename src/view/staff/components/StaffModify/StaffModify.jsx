import React, { Component } from 'react'

import Button from 'antd/lib/button'
import { Input } from 'antd'

const InputGroup = Input.Group
class StaffModify extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleStaffNameChange (e) {
    const staffName = e.target.value
    this.setState({
      staffName: staffName
    })
  }

  handleStaffSexChange (e) {
    const staffSex = e.target.value
    this.setState({
      staffSex: staffSex
    })
  }

  handleStaffAgeChange (e) {
    const staffAge = e.target.value
    this.setState({
      staffAge: staffAge
    })
  }

  handleModify = () => {
    const staffInfo = this.state
    staffInfo.staffId = this.props.handleStaffInfo.id
    this.props.onClick(staffInfo)
  }

  render () {
    return (
      <div>
        员工信息修改:
        <InputGroup compact>
          <Input style={{ width: '20%' }} placeholder='姓名' onChange={(e) => { this.handleStaffNameChange(e) }} />
          <Input style={{ width: '20%' }} placeholder='性别' onChange={(e) => { this.handleStaffSexChange(e) }} />
          <Input style={{ width: '20%' }} placeholder='年龄' onChange={(e) => { this.handleStaffAgeChange(e) }} />
        </InputGroup>
        <Button type='primary' onClick={this.handleModify}>确认</Button>
      </div>
    )
  }
}

export default StaffModify
