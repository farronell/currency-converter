// CurrencyWidgetFrom.tsx
import { useCurrency } from '@/state/useCurrency';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

export default function CurrencyWidgetFrom() {
  const dateCard = new Date().toLocaleDateString();
  const { currencyFrom, handleCurrencyFromChange } = useCurrency();

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>From {currencyFrom} UAH</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type='number'
          placeholder='Press your value...'
          value={currencyFrom ?? ''}
          onChange={handleCurrencyFromChange}
        />
      </CardContent>
      <CardFooter>
        <CardDescription>{dateCard}</CardDescription>
      </CardFooter>
    </Card>
  );
}
