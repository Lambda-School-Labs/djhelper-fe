import * as ActionTypes from './actionTypes';

export const toggleLoginModal = () => dispatch => {
  dispatch({
    type: ActionTypes.TOGGLE_LOGIN_MODLA_SUCCESS
  });
};

export const toggleRegisterModal = () => dispatch => {
  dispatch({
    type: ActionTypes.TOGGLE_REGISTER_MODAL_SUCCESS
  });
};

export const toggleHelpModal = () => dispatch => {
  dispatch({
    type: ActionTypes.TOGGLE_HELP_MODAL_SUCCESS
  });
};
