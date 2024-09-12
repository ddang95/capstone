import http from "../http-common";

class CimtDataService {
    findByUsernameCimt(title) {
      return http.get(`/cimts?username=${title}`);
    }
    
  }
  export default new CimtDataService();