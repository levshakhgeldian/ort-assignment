import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7166/Clients/"
})

class ClientRepository {
    async GetAll(page, field = null, search = null) {
        try {
            const response = await axiosClient.get("", { params: { page, field, search } })
            return response.data
        }
        catch (err) {
            console.error(err)
            return []
        }
    }

    async GetByID(id) {
        try {
            const response = await axiosClient.get(id)
            return response.data
        }
        catch (err) {
            console.error(err)
            return false
        }
    }

    async Create(model) {
        try {
            await axiosClient.post("", model)
            return true
        }
        catch (err) {
            console.error(err)
            return false
        }
    }

    async Update(model) {
        try {
            console.warn(model)
            await axiosClient.put("", model)
            return true
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async Delete(id) {
        const response = await axiosClient.delete(id.toString())
    }
}

const instance = new ClientRepository();
export default instance