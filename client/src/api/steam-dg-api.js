import axios from 'axios'

const steamdata = axios.create({
    baseURL: "http://localhost:8000/datagame/api/v1/Steam/",
})

export const getAllSteamData = () => steamdata.get("/");