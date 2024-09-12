import http from "../http-common";
const getAll = () => {
    return http.get("/incidents");
  };
  
  const get = id => {
    return http.get(`/incidents/${id}`);
  };
  
  const create = data => {
    return http.post("/incidents", data);
  };
  
  const update = (id, data) => {
    return http.put(`/incidents/${id}`, data);
  };
  
  const remove = id => {
    return http.delete(`/incidents/${id}`);
  };
  
  const removeAll = () => {
    return http.delete(`/incidents`);
  };

  const insert = (incident) =>  {
    return http.post('/incidents/insert', incident);
  };
  
  const IncidentService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    insert,
  };


  
  export default IncidentService;