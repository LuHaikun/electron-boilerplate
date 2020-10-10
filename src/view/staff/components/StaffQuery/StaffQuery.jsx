import React, { Component } from 'react'

import { Input } from 'antd'

class StaffQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      staffId: ''
    }
  }

  handleSearch = (staffId) => {
    this.props.onClick(staffId)
  }

  render () {
    const Search = Input.Search
    return (
      <div>
        员工信息查询:
        <Search
          size='large'
          enterButton='Search'
          placeholder='根据员工ID查询'
          onSearch={this.handleSearch}
        />
      </div>
    )
  }
}

export default StaffQuery
