
import axiosClient from "./axiosClient";

class PriorityService {
 
  getPriority() {
    return axiosClient.get(`/api/Priority/getAll`);
  }
}

export default PriorityService;
