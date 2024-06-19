
import { useCurrency } from '@/state/useCurrency'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

export default function CurrencyWidgetTo() {
  const { currencyTo, selectedCC, handleSelectCC, handleCurrencyToChange, rate } = useCurrency();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          To {currencyTo} {selectedCC}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Command>
          <CommandInput placeholder='Search currency' />
          <CommandList className='max-h-36 p-3 bg-gray-100'>
            <CommandEmpty>Not Found</CommandEmpty>
            {rate?.map((el, index) => (
              <CommandItem key={index} onSelect={() => handleSelectCC(el.cc)}>
                {el.txt} {el.cc} {el.rate}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
        <Separator className='my-3' />
        <Input
          type='number'
          placeholder='Press your value...'
          value={currencyTo ?? ''}
          onChange={handleCurrencyToChange}
        />
      </CardContent>
    </Card>
  );
}
