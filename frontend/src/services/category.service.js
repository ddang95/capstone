import http from "../http-common";
class CategoryService {

    getCategoryTypes() {
        return http.get(`/categories`);
    };

    getCategoryById(cat_type) {
        return http.get(`/categories/${cat_type}`);
    }
}
export default new CategoryService();
