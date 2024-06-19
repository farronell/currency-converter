// Currency.tsx
import { CurrencyProvider } from '@/state/CurrencyProvider'
import CurrencyWidgetFrom from '../CurrencyWidgetFrom/CurrencyWidgetFrom';
import CurrencyWidgetTo from '../CurrencyWidgetTo/CurrencyWidgetTo';

export default function Currency() {
  return (
    <CurrencyProvider >
      <section className='flex flex-col justify-center items-center gap-12'>
      <CurrencyWidgetFrom />
      <CurrencyWidgetTo />
      </section>
    </CurrencyProvider>
  );
}
