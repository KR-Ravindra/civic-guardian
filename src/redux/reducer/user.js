import {USER_NAME_REQUEST, USER_NAME_SUCCESS, USER_NAME_ERROR} from '../actions/types';

const initialState = {
  isLoading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userName:action.username
      };
    case USER_NAME_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
