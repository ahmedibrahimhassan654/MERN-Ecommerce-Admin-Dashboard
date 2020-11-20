


import React from 'react'
import PropTypes from 'prop-types'
import {connect}from 'react-redux'
// import { Alert } from 'antd';
import { toast } from 'react-toastify'
const AlertComp = ({ alerts }) =>
   alerts !== null &&
   alerts.length > 0 &&
   alerts.map(alert => (
      <>
         toast.`${alert.alertType}`(
			`{alert.msg}`,
      )
      {/* <Alert
      key={alert.id}
      description={alert.msg}
      type={alert.alertType}
      showIcon
    /> */}
  </>
    
   ))
   

   AlertComp.propTypes = {
   alerts: PropTypes.array.isRequired 

}

const mapStateToProps = state => ({
   alerts:state.alert
})
export default connect(mapStateToProps) (AlertComp)
