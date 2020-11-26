import axios from 'axios';
// import { useSelector } from 'react-redux';
import { setAlert } from './alert';

import { GET_MYBRANCHES, BRANCH_ERROR } from './types';

//get Current owner branches
export const getCurrentBranches = ( authtoken) => async dispatch => {
   try {
     
      const res = await axios.get(`${process.env.REACT_APP_API}/branches/owner`,{
         headers: {
            authtoken,
         },
      });
      //console.log('current branches for reqsted user',res.data);
      dispatch({
         type: GET_MYBRANCHES,
         payload: res.data,
        // user,
         
      })
   } catch (err) {
      console.log(err);
      dispatch({
         type: BRANCH_ERROR,
         payload: {
            msg: err.response.statusText,
            status:err.response.status,
         
         }
      })
   }
}