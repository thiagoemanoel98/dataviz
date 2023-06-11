import React, { useCallback, useMemo, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import ListOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import opsEmoji from "../../assets/ops.svg";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import * as S from "./styles";

import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChart";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";
import { brazilTaxBurden } from "../../repositories/taxBurden";
import MultipleHistoryBox from "../../components/MultipleHistoryBox";
import { inflationData } from "../../repositories/inflation";
import { internacionalData } from "../../repositories/internacionalDolar";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      const isYearNotIncluded = !uniqueYears.includes(year);

      if (isYearNotIncluded) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return ListOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total = 0;
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid Amount! Amount must be number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;
    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid Amount! Amount must be number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    const total = totalGains - totalExpenses;

    return total;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops!",
        description: "Neste mês, não há registros de entradas ou saídas",
        footerText:
          "Parece que você não fez nenhum registro no mês e ano selecionado",
        icon: opsEmoji,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufa!",
        description: "Neste mês, você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    }
  }, [totalBalance, totalExpenses, totalGains]);

  const relationExpensesGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: "#E44C4E",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: "#F7931B",
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }
        if (gain.frequency === "eventual") {
          return (amountEventual += Number(gain.amount));
        }
      });

    const total = amountEventual + amountRecurrent;
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(2));
    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(2)
    );

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }
        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountEventual + amountRecurrent;
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(2));
    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(2)
    );

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error("Mês inválido");
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error("Mês inválido");
    }
  }, []);

  return (
    <S.Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <S.Content>
        <MessageBox
          title={message.title}
          description={message.description}
          icon={message.icon}
          footerText={message.footerText}
        />
        <PieChartBox data={relationExpensesGains} />

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
