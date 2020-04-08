//para manipular o state
import produce from "immer";

const INITIAL_STATE = {
  user: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@auth/SIGN_IN_SUCCESS": {
        draft.user = action.payload.user;
        break;
      }
      case "@user/UPDATE_USER_SUCCESS": {
        draft.user = action.payload.user;
        break;
      }
      case "@auth/SIGN_OUT": {
        draft.user = null;
        break;
      }
      default:
    }
  });
}
