import axios from 'axios';
import { useSelector } from 'react-redux';
import { setAlert } from './alert';

import { GET_MYBRANCHES, BRANCH_ERROR } from './types';

//get Current owner branches
export const getCurrentBranches = () => async dispatch => {
   try {
      const { user } = useSelector((state) => ({
         ...state,
      }))
      const res = await axios.get(`${process.env.REACT_APP_API}/branches/owner`);
      dispatch({
         type: GET_MYBRANCHES,
         payload: [res.data],
        // user,
         
      })
   } catch (err) {
      console.log(err);
      dispatch({
         type: BRANCH_ERROR,
         payload: {
            msg: err.response,
          //  status: err.response.status
         }
      })
   }
}