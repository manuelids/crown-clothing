import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
   currentUser: null
};

//User Reducer, uses default parameter state = INITIAL_STATE
const UserReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER:
         return {
            ...state, //Anything else that was sent in the state
            currentUser: action.payload //specific value from the action.payload related to the current user
         };
      default:
         return state;
   }
};

export default UserReducer;