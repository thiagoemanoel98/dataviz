import React from "react";

import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";

import * as S from "./styles";

interface IBarChartProps {
  title: string;
  data: {
    country: string;
    value: number;
    color: string;
  }[];
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => (
  <S.Container>
    <S.SideLeft>
      <h2>{title}</h2>

      <S.LegendContainer>
        {data.map((indicator) => (
          <S.Legend color={indicator.color} key={indicator.country}>
            <div></div>
            <span>{indicator.country}</span>
          </S.Legend>
        ))}
      </S.LegendContainer>
    </S.SideLeft>

    <S.SideRight>
      <ResponsiveContainer>
        <BarChart data={data}>
          <Bar dataKey="value" name="Valor">
            {data.map((indicator) => (
              <Cell
                key={indicator.country}
                cursor={"pointer"}
                fill={indicator.color}
              />
            ))}
          </Bar>
          <Tooltip
            formatter={(value) => Number(value)}
            cursor={{ fill: "none" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </S.SideRight>
  </S.Container>
);

export default BarChartBox;
