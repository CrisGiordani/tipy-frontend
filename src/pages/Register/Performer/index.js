import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiUser } from "react-icons/fi";
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
  description: Yup.string(),
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

export default function RegisterPerformer() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ name, description, email, mobile, password }) {
    const performer = "1";
    dispatch(
      signUpRequest(name, description, performer, email, mobile, password)
    );
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Tippy" />
          <h1>Cadastro de Artista</h1>
          <p>
            Faça seu cadastro, entre na plataforma e comece a receber apoio.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome artístico" />
          <Input name="description" placeholder="Descrição" />
          <Input name="email" type="email" placeholder="E-mail" />
          <ReactInputMask mask="(99) 99999.9999">
            {() => <Input placeholder="Celular com DDD" name="mobile" />}
          </ReactInputMask>
          <Input name="password" type="password" placeholder="Senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmação de senha"
          />

          <button className="button" type="submit">
            {loading ? "Carregando..." : "Cadastrar artista"}
          </button>
          <Link className="icon-link" to="/register/user">
            <FiUser size={16} color="#E02041" />
            Não sou artista
          </Link>
        </Form>
      </div>
    </div>
  );
}
