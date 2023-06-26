import axios from "axios";

const apiPath = "http://localhost:8000/employee/";


class EmployeeService{

    

    getEmployeesById(id){
        return axios.get(apiPath+id+'/');
    }
}

export default new EmployeeService;