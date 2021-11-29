import axios from 'axios';

const baseURL = "https://gitlab.com/api/v4";
const API_TOKEN = process.env.RAZZLE_GITLAB_ACCESS_TOKEN

const gitlabApi = axios.create({ baseURL });
gitlabApi.defaults.headers.common["PRIVATE-TOKEN"] = API_TOKEN;

export default gitlabApi;