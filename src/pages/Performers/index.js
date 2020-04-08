import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
//import { toast } from "react-toastify";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

import { signOut } from "../../store/modules/auth/actions";

export default function Profile(req, res) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [performers, setPerformers] = useState([]);
  //const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(signOut());
  }

  useEffect(() => {
    api.get("performers").then((response) => {
      setPerformers(response.data);
    });
  }, []);

  return (
    <div classNames="page-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem-vindo(a), {user.name}</span>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <div className="profile-container">
        <h1>Meus dados</h1>
      </div>
      <div className="performers-container">
        <h1>Artistas</h1>
        <ul>
          {performers.map((performer) => (
            <li key={performer.id}>
              <strong>Nome:</strong>
              <p>{performer.name}</p>

              <strong>Descrição:</strong>
              <p>{performer.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
