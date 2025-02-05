import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'INR'): string {
    const symbols: Record<string, string> = {
      'USD': '$',
      'BDT': '৳',
      'INR': '₹'
      // Add more currency symbols as needed
    };
    const symbol = symbols[currencyCode] || currencyCode;
    return symbol + ' ' + value;
  }
}