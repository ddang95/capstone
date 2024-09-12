import http from "../http-common";

class AdminProviderDataService {
    findByUsernameAdmin(title) {
      return http.get(`/admins?username=${title}`);
    }
    
  }
  export default new AdminProviderDataService();