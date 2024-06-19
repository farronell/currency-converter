import { useContext } from 'react';
import { CurrencyContext, CurrencyContextProps } from './CurrencyProvider'

export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
