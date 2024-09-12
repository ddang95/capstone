import http from "../http-common";
class UserDataService {
  getAll() {
    // console.log("hello from service");
    return http.get("/users");
  }
  get(id) {
    return http.get(`/users/${id}`);
  }
  create(data) {
    return http.post("/users", data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
  deleteAll() {
    return http.delete(`/users`);
  }
  
  findByUsername(title) {
    return http.post(`/users?username=${title}`);
  }
  
}
export default new UserDataService();