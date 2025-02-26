import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const estudiantesAPI = axios.create({
  baseURL: `http://172.172.171.133:8003/api/estudiantes`,
});

export const cursosAPI = axios.create({
  baseURL: `http://172.172.171.133:8002/api/cursos`,
});

export const registrosAPI = axios.create({
  baseURL: `http://172.172.171.133:8002/api/cursos/1/estudiantes`,
});