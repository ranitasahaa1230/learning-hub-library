import axios from "axios";

export function getPageVideoServices(pageNum) {
    return axios.get(`/api/videos/page/${pageNum}`);
}