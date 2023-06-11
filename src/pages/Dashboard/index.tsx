import React from "react";

import opsEmoji from "../../assets/ops.svg";
import happy from "../../assets/happy.svg";

import * as S from "./styles";

import MessageBox from "../../components/MessageBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";
import { brazilTaxBurden } from "../../repositories/taxBurden";
import MultipleHistoryBox from "../../components/MultipleHistoryBox";
import { inflationData } from "../../repositories/inflation";
import { internacionalData } from "../../repositories/internacionalDolar";

const Dashboard: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <MessageBox
          title={"Seja Bem vindo!"}
          description={
            "Esse Dashboard apresenta gráficos a respeito do poder de compra, do índice Big Mac, inflação e carga tributária."
          }
          icon={happy}
          footerText={"By: Ednaldo Martins, Ítalo Nicácio e Thiago Emanoel"}
        />

        <MessageBox
          title={"Objetivo"}
          description={
            "O objetivo desse dash é obter insights sobre como as variações de preços dos produtos e serviços afetam o poder de compra da população."
          }
          icon={opsEmoji}
          footerText={"Enjoy!"}
        />

        <HistoryBox
          title="Carga Tributária Brasil"
          data={brazilTaxBurden}
          lineColor={"#F7931B"}
        />

        <MultipleHistoryBox
          title="Inflação Brasil x EUA x Noruega"
          data={inflationData}
          lineColor1={"#4E41F0"}
          lineColor2={"#F7931B"}
          lineColor3={"#E44C4E"}
        />

        <BarChartBox
          title={"Dólar Internacional (Int$)"}
          data={internacionalData}
        />
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
