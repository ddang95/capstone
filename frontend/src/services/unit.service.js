import http from "../http-common";
class UnitDataService {
  findAllUnits() {
    return http.post("/units");
  }
}
export default new UnitDataService();