import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  /**
 * Capitalizes the first letter of the given string
 * 
 * @param value string to capitalize
 */
  transform(value: string, ...args: unknown[]): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
