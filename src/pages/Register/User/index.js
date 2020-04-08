import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMusic } from "react-icons/fi";
//import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { useDispatch, useSelector } from "react-redux";
import { signUpRequest } from "../../../store/modules/auth/actions";

import ReactInputMask from "react-input-mask";

import "./styles.css";

import logoImg from "../../../assets/logo.svg";

var regEx = new RegExp(/\([1-9]{2}\)\s[0-9]{5}\.[0-9]{4}$/);

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O campo e-mail é obrigatório"),
  mobile: Yup.string().matches(regEx, "Número de telefone inválido"),
  password: Yup.string()
    .min(4, "A senha precisa ter no mínimo 4 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field
          .required()
          .oneOf([Yup.ref("password")], "A senha de confirmação está diferente")
      : field
  ),
});

export default function RegisterUser() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ name, email, mobile, password }) {
    const performer = 0;
    const description = "";
    dispatch(
      signUpRequest(name, description, performer, email, mobile, password)
    );
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Tippy" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude artistas
            independentes.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input placeholder="Seu nome" name="name" />
          <Input placeholder="E-mail" name="email" type="email" />

          <ReactInputMask mask="(99) 99999.9999">
            {() => <Input placeholder="Celular com DDD" name="mobile" />}
          </ReactInputMask>
          <Input placeholder="Senha" name="password" type="password" />
          <Input
            placeholder="Confirmação de senha"
            name="confirmPassword"
            type="password"
          />
          <button className="button" type="submit">
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
          <Link className="icon-link" to="/register/performer">
            <FiMusic size={16} color="#E02041" />
            Sou artista
          </Link>
        </Form>
      </div>
    </div>
  );
}
