import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import formatCurrency from "../../utils/formatCurrency";

import * as S from "./styles";
import { CountryData } from "../../repositories/inflation";

interface IHistoryBoxProps {
  title: string;
  data: CountryData[];
  lineColor1: string;
  lineColor2: string;
  lineColor3: string;
}

const MultipleHistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColor1,
  lineColor2,
  lineColor3,
  title,
}) => (
  <S.Container>
    <S.Header>
      <h2>{title}</h2>

      <S.LegendContainer>
        <S.Legend color={lineColor1}>
          <div>20%</div>
          <span>Entradas</span>
        </S.Legend>

        <S.Legend color={lineColor2}>
          <div>30%</div>
          <span>Saídas</span>
        </S.Legend>
      </S.LegendContainer>
    </S.Header>
    <S.ChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray={"3 3"} stroke="#cecece" />
          <XAxis dataKey={"year"} stroke="#cecece" />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />

          <Line
            type={"monotone"}
            dataKey="eua_value"
            name="EUA"
            stroke={lineColor1}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type={"monotone"}
            dataKey="brazil_value"
            name="Brasil"
            stroke={lineColor2}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type={"monotone"}
            dataKey="noruega_value"
            name="Noruega"
            stroke={lineColor3}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  </S.Container>
);

export default MultipleHistoryBox;
