import React from "react";

import * as S from "./styles";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";
import { useAuth } from "../../hooks/auth";

const Aside: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <S.Container menuIsOpen={false}>
      <S.Header>
        <S.Title>DATAVIZ</S.Title>
      </S.Header>

      <S.MenuContainer>
        <S.MenuItemLink href="/dashboard">
          <MdDashboard />
          Dashboard
        </S.MenuItemLink>

        <S.MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </S.MenuItemButton>
      </S.MenuContainer>
    </S.Container>
  );
};

export default Aside;
