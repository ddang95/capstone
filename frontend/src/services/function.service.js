import http from "../http-common";
class FunctionDataService {
  findAllFunctions() {
    return http.post("/functions");
  }

  getAllFuncs() {
    return http.get('/functions');
  };

}
export default new FunctionDataService();