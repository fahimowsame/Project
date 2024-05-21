import axios from "axios";

export const apiRequest = axios.create({baseUrl : 'http://localhost:8800/api', withCredentials : true });

