import http from "./http-common";

class AsanaService {
  async doApiCall(cb) {
    try {
      const resp = await cb();
      return resp;
    } catch (error) {
      console.log("❌", error?.response?.data, error.message);
    }
  }

  async getDefaultAsanas() {
    const resp = await this.doApiCall(
      async () => await http().get(`/asana/?default=true`)
    );

    return resp.data;
  }

  async getRandomAsanas(count = 5) {
    const asanas = await this.getDefaultAsanas();
    const rng = Math.floor(Math.random() * asanas.length) - count;
    return asanas.slice(rng, rng + count);
  }

  async getUserAsanas(userId) {
    const resp = await this.doApiCall(
      async () => await http().get(`/asana/?user=${userId}`)
    );

    return resp.data;
  }

  async getAsana(id) {
    const resp = await this.doApiCall(
      async () => await http().get(`/asana/${id}`)
    );

    return resp.data;
  }

  async createAsana(asanaObj) {
    const resp = await this.doApiCall(
      async () => await http().post("/asana", asanaObj)
    );

    return resp.data;
  }

  async saveAsana(asanaObj) {
    if (!asanaObj._id) throw new Error("Asana must have an _id");
    const resp = await this.doApiCall(
      async () => await http().put(`/asana/${asanaObj._id}`, asanaObj)
    );

    return resp.data;
  }

  async getUserSequences(userId) {
    const resp = await this.doApiCall(
      async () => await http().get(`/sequence/?user=${userId}`)
    );

    return resp.data.sort(
      (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
    );
  }

  async getSequence(id) {
    const resp = await this.doApiCall(
      async () => await http().get(`/sequence/${id}`)
    );

    return resp.data;
  }

  async createSequence(sequenceObj) {
    const resp = await this.doApiCall(
      async () => await http().post("/sequence", sequenceObj)
    );

    return resp.data;
  }

  async saveSequence(sequenceObj) {
    if (!sequenceObj._id) throw new Error("Sequence must have an _id");
    const resp = await this.doApiCall(
      async () => await http().put(`/sequence/${sequenceObj._id}`, sequenceObj)
    );

    return resp.data;
  }

  async deleteSequence(id) {
    if (!id) throw new Error("invalid _id");
    const resp = await this.doApiCall(
      async () => await http().delete(`/sequence/${id}`)
    );

    return resp.data;
  }

  async getUserClasses(userId, favouritesOnly = false) {
    const resp = await this.doApiCall(
      async () =>
        await http().get(
          `/class/?user=${userId}${favouritesOnly ? "&favourite=true" : ""}`
        )
    );

    return resp.data.sort((a, b) => b.modifiedAt - a.modifiedAt);
  }

  async getClass(id) {
    const resp = await this.doApiCall(
      async () => await http().get(`/class/${id}`)
    );

    return resp.data;
  }

  async createClass(classObj) {
    const resp = await this.doApiCall(
      async () => await http().post("/class", classObj)
    );

    return resp.data;
  }

  async saveClass(classObj) {
    if (!classObj._id) throw new Error("Class must have an _id");
    const resp = await this.doApiCall(
      async () => await http().put("/class", classObj)
    );

    return resp.data;
  }

  async deleteClass(id) {
    if (!id) throw new Error("invalid _id");
    const resp = await this.doApiCall(
      async () => await http().delete(`/class/${id}`)
    );

    return resp.data;
  }
}

export default new AsanaService();
