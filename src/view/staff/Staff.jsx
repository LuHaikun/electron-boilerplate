import React, { Component } from 'react'

import staffAPI from '../../api/staff'
import StaffQuery from './components/StaffQuery'
import Button from 'antd/lib/button'
import { Table, Divider } from 'antd'

class StaffIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xIsNext: true,
      handleStaffInfo: {},
      staffs: []
    }
  }

  handleModifyClick = (element) => {
    this.setState({
      handleStaffInfo: element
    })
  }

  handleDeleteClick = (staffId) => {
    const newStaffs = []
    const oldStaffs = this.state.staffs
    for (let i = 0; i < oldStaffs.length; i++) {
      const item = oldStaffs[i]
      if (item.id && item.id !== staffId) {
        newStaffs.push(item)
      }
    }
    this.setState({
      staffs: newStaffs
    })
  }

  handleQueryStaff = (staffId) => {
    staffAPI.staffQuery(staffId)
      .then(res => {
        const responseData = res.data
        if (responseData.resultCode === 0) {
          const staffs = responseData.result.staffs
          this.setState({
            staffs: staffs
          })
        }
      }).catch(err => {
        console.log(err)
      })
  }

  modifyStaff = (staffInfo) => {
    const staffs = this.state.staffs
    for (let i = 0; i < staffs.length; i++) {
      const item = staffs[i]
      if (item.id && item.id === staffInfo.staffId) {
        if (staffInfo.staffName) {
          staffs[i].name = staffInfo.staffName
        }
        if (staffInfo.staffAge) {
          staffs[i].age = staffInfo.staffAge
        }
        if (staffInfo.staffSex) {
          staffs[i].sex = staffInfo.staffSex
        }
      }
    }
    this.setState({
      staffs: staffs
    })
  }

  componentDidMount () {
    this.queryAllStaff()
  }

  queryAllStaff = () => {
    staffAPI.allStaffQuery()
      .then(res => {
        const responseData = res.data
        if (responseData.resultCode === 0) {
          const staffs = responseData.result.staffs
          this.setState({ staffs: staffs })
          this.props.setStaffList(staffs)
        }
      }).catch(err => {
        console.log(err)
      })
  }

  render () {
    const columns = [{
      title: '工号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '工资',
      dataIndex: 'salary',
      key: 'salary'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type='primary' onClick={() => { this.handleModifyClick(record) }}>修改</Button>
          <Divider type='vertical' />
          <Button type='danger' onClick={() => { this.handleDeleteClick(record.id) }}>删除</Button>
        </span>
      )
    }]
    return (
      <div style={{ background: 'var(--section-color)' }}>
        <StaffQuery onClick={this.handleQueryStaff} />
        <Table columns={columns} dataSource={this.props.staffs} rowKey={record => record.id} />
      </div>
    )
  }
}

export default StaffIndex
