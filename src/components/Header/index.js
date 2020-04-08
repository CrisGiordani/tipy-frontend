import React from "react";
import { Link } from "react-router-dom";

import Notifications from "../Notifications";

import logo from "../../assets/logo.svg";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Tipy" />
          <Link to="/">Home</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>Cristian Giordani</strong>
              <Link to="/profile">Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/CristianGiordani.png"
              alt="Cristian Giordani"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
