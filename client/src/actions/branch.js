import axios from 'axios';
import { setAlert } from './alert';

import { GET_MYBRANCHES, BRANCH_ERROR } from './types';

//get Current owner branches
export const getCurrentBranches = () => async dispatch => {
   try {
      const res = await axios.get(`${process.env.REACT_APP_API}/branches/owner`);
      dispatch({
         type: GET_MYBRANCHES,
         payload:res.data
      })
   } catch (err) {
      dispatch({
         type: BRANCH_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}