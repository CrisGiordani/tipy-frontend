import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";

import { updateUserSuccess, updateUserFailure } from "./actions";

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload.data.user;

    const user = Object.assign({ name, email }, rest.oldPassword ? rest : {});

    const response = yield call(api.put, "users", user);

    toast("Perfil atualizado com sucesso!", {
      className: ".tipy-toast tipy-toast-success",
      bodyClassName: "tipy-toast-success-body",
      progressClassName: "tipy-toast-success-bar",
    });

    yield put(updateUserSuccess(response.data));
  } catch (error) {
    toast(error.response.data.error, {
      className: ".tipy-toast tipy-toast-alert",
      bodyClassName: "tipy-toast-alert-body",
      progressClassName: "tipy-toast-alert-bar",
    });
    yield put(updateUserFailure());
  }
}

export default all([takeLatest("@user/UPDATE_USER_REQUEST", updateUser)]);
