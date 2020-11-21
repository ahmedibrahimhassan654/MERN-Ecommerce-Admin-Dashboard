import {GET_MYBRANCHES,BRANCH_ERROR} from '../actions/types'

const initialState = {
   branch: null,
   branches: [],//to get all brances
   myBranches:[],
   loading: true,
   error:{}
};

export default function (state = initialState, action) {
   const { type, payload } = action
   switch (type) {
      case GET_MYBRANCHES:
         return {
            ...state,
            myBranches: [payload],
            // branch: payload,
            // branches:[payload],
            loading: false
         };
      case BRANCH_ERROR:
         return {
            ...state,
            error: payload,
            loading:false
         }
      default:
         return state
   }
}