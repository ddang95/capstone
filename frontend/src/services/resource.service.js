import http from "../http-common";
class ResourceService {

    findResource(data) {
        return http.post(`/resources`, {
            keyword: data.keyword,
            primFunc: data.primFunc,
            distance: data.distance
        });
    };

    insert(resource) {
        return http.post('/resources/insert', resource);
    };

    findOwnersResources(curr_user) {
        return http.get(`/resources/${curr_user}`);
    }

    findByID(id) {
        return http.post(`/resources/${id}`);
    }
}
export default new ResourceService();
