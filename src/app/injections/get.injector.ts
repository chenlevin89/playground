import {inject} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from "rxjs";
import {LogService} from "../services/log.service";

export function getAjax(){
  const http = inject(HttpClient);
  const logger = inject(LogService);

  return async (url:string)=>{
    const result = await lastValueFrom(http.get(url, {headers:{Authorization: 'custom auth...'}}));
    logger.info(JSON.stringify(result));
    return result;
  }
}
