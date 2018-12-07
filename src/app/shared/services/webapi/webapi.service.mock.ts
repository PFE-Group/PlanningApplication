import {IWebApiService} from "./webapi.service.interface";
import {HttpMethod} from "../../models/webapi/http-method.enum";

export class MockWebApiService implements IWebApiService {

  getResponse(url: string, method: HttpMethod, payload?: any): Promise<any> {
    return new Promise(()=> {
    });
  }

}
