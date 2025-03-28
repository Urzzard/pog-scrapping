import axios from 'axios'

const epicdata = axios.create({
    baseURL: "http://localhost:8000/datagame/api/v1/Epic/",
})

export const getAllEpicData = () => epicdata.get("/");