import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://ip-api.com/json/"
})

class IpApi {
    async Geolocation(ip) {
        try {
            const response = await axiosClient.get(ip)
            return response.data
        }
        catch (err) {
            console.error(err)
            return null
        }
    }
}

const instance = new IpApi()
export default instance;