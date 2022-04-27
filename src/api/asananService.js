import http from "./http-common";

class AsanaService {
  async createUser(user) {
    try {
      return await http.post(`/user`, user);
    } catch (err) {
      if (err.response?.data?.detail) {
        console.log(err.response?.data);
        console.log(err.response?.data?.detail);
        // throw new Error(err.response.data.detail);
      }
      console.log(err);
      // throw new Error(err);
    }
  }

  async getDefaultAsanas() {
    return await (
      await http.get(`/asana/?user_id=1`)
    ).data;
  }

  async getAsana(id) {
    return await (
      await http.get(`/asana/${id}`)
    ).data;
  }

  async searchAsanas(query = "%", flag = "ALL") {
    return await (
      await http.get(
        `/search/query=${encodeURIComponent(
          query.trim().length === 0 ? "%" : query.trim()
        )}&flag=${flag}`
      )
    ).data;
  }
}

export default new AsanaService();
