import {TranslateService} from '@ngx-translate/core';

export async function translateParamsInObj(obj: {[key: string]: string}, translator: TranslateService){
  const translatedObj: {[key: string]: string} = {};
  for(const key in obj){
    translatedObj[key] = (await translator.get(obj[key]).toPromise()) as string;
  }
  return translatedObj;
}
