import http from "../http-common";

class ResourceProviderDataService {
    findByUsernameRp(title) {
      return http.get(`/rps?username=${title}`);
    }
    
  }
  export default new ResourceProviderDataService();