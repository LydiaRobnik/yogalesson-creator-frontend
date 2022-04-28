import http from "./http-common";

class AsanaService {
  async getDefaultAsanas() {
    return await (
      await http.get(`/asana/?default=true`)
    ).data;
  }

  async getUserAsanas(userId) {
    return await (
      await http.get(`/asana/?user=${userId}`)
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
