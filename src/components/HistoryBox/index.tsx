import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import * as S from "./styles";

interface IHistoryBoxProps {
  data: {
    year: number;
    value: number;
  }[];
  lineColor: string;
  title: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColor,
  title,
}) => (
  <S.Container>
    <S.Header>
      <h2>{title}</h2>

      <S.LegendContainer>
        
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
          <Tooltip formatter={(value) => Number(value).toFixed(2)} />

          <Line
            type={"monotone"}
            dataKey="value"
            name="Receita Tributária"
            stroke={lineColor}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  </S.Container>
);

export default HistoryBox;
