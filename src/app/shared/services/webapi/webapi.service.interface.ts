import {HttpMethod} from "../../models/webapi/http-method.enum";

export interface IWebApiService {

  getResponse(url: string, method: HttpMethod, payload?: any): Promise<any>;

}
