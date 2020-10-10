import axios from 'axios'

const allStaffQuery = () => {
  return axios.get('/queryAllStaff')
}

const staffQuery = (staffId) => {
  return axios.get('/queryStaff', {
    params: {
      staffId
    }
  })
}

const staffUpdate = (body) => {
  return axios.post(body)
}

export default {
  allStaffQuery,
  staffQuery,
  staffUpdate
}
