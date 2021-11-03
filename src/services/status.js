
import axiosClient from "./axiosClient";

class StatusService {
 
  getStatus() {
    return axiosClient.get(`/api/Status/getAll`);
  }
}

export default StatusService;
