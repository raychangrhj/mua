import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysToArray'
})
export class KeysToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const keyArr: string[] = Object.keys(value);
    const dataArr: any[] = [];

    keyArr.forEach((key: string) => {
      dataArr.push(
        {
          key,
          value: value[key]
        }
      );
    });

    return dataArr;
  }
}
