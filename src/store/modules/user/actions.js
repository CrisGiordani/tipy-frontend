export function updateUserRequest(data) {
  return {
    type: "@user/UPDATE_USER_REQUEST",
    payload: { data },
  };
}

export function updateUserSuccess(user) {
  return {
    type: "@user/UPDATE_USER_SUCCESS",
    payload: { user },
  };
}

export function updateUserFailure() {
  return {
    type: "@user/UPDATE_USER_FAILURE",
  };
}
