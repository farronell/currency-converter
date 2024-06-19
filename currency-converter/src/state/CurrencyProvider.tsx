import React, { createContext, useEffect, useState } from 'react';
import getDate from './getDate';

export interface CurrencyRate {
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export interface CurrencyContextProps {
  rate: CurrencyRate[] | null;
  currencyFrom: number | null;
  currencyTo: number | null;
  selectedCC: string | null;
  handleCurrencyFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectCC: (cc: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const date = getDate();
  const [rate, setRate] = useState<CurrencyRate[] | null>(null);
  const [currencyFrom, setCurrencyFrom] = useState<number | null>(null);
  const [currencyTo, setCurrencyTo] = useState<number | null>(null);
  const [selectedCC, setSelectedCC] = useState<string | null>(null);

  useEffect(() => {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`;

    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error resp');
        }
        return resp.json();
      })
      .then((data: CurrencyRate[]) => {
        const uahRate = { txt: 'Україньска гривня', rate: 1, cc: 'UAH', exchangedate: date };
        setRate([uahRate, ...data]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [date]);

  const handleCurrencyFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setCurrencyFrom(value);
    if (value !== null && selectedCC !== null) {
      const selectedRate = rate?.find((el) => el.cc === selectedCC)?.rate || 1;
      setCurrencyTo(parseFloat((value / selectedRate).toFixed(2)));
    } else {
      setCurrencyTo(null);
    }
  };

  const handleCurrencyToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setCurrencyTo(value);
    if (value !== null && selectedCC !== null) {
      const selectedRate = rate?.find((el) => el.cc === selectedCC)?.rate || 1;
      setCurrencyFrom(parseFloat((value * selectedRate).toFixed(2)));
    } else {
      setCurrencyFrom(null);
    }
  };

  const handleSelectCC = (cc: string) => {
    setSelectedCC(cc);
    if (currencyFrom !== null) {
      const selectedRate = rate?.find((el) => el.cc === cc)?.rate || 1;
      setCurrencyTo(parseFloat((currencyFrom / selectedRate).toFixed(2)));
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        rate,
        currencyFrom,
        currencyTo,
        selectedCC,
        handleCurrencyFromChange,
        handleCurrencyToChange,
        handleSelectCC,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
