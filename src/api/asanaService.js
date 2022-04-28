import http from "./http-common";

class AsanaService {
  async getDefaultAsanas() {
    return await (
      await http().get(`/asana/?default=true`)
    ).data;
  }

  async getRandomAsanas(count = 5) {
    const asanas = await this.getDefaultAsanas();
    const rng = Math.floor(Math.random() * asanas.length) - count;
    return asanas.slice(rng, rng + count);
  }

  async getUserAsanas(userId) {
    return await (
      await http().get(`/asana/?user=${userId}`)
    ).data;
  }

  async getAsana(id) {
    return await (
      await http().get(`/asana/${id}`)
    ).data;
  }

  async getUserSequences(userId) {
    return await (
      await http().get(`/sequence/?user=${userId}`)
    ).data;
  }

  async getSequence(id) {
    return await (
      await http().get(`/sequence/${id}`)
    ).data;
  }

  async createSequence(sequenceObj) {
    const res = await http().post("/sequence", sequenceObj);
    return res;
  }

  async saveSequence(sequenceObj) {
    const res = await http().put("/sequence", sequenceObj);
    return res;
  }

  async deleteSequence(id) {
    return await (
      await http().delete(`/sequence/${id}`)
    ).data;
  }

  async getUserClasses(userId) {
    return await (
      await http().get(`/class/?user=${userId}`)
    ).data;
  }

  async getClass(id) {
    return await (
      await http().get(`/class/${id}`)
    ).data;
  }

  async createClass(classObj) {
    const res = await http().post("/class", classObj);
    return res;
  }

  async saveClass(classObj) {
    const res = await http().put("/class", classObj);
    return res;
  }

  async deleteClass(id) {
    return await (
      await http().delete(`/class/${id}`)
    ).data;
  }
}

export default new AsanaService();
