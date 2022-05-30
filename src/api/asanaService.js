import http from './http-common';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { dataURItoBlob } from '../custom/utils';

class AsanaService {
  constructor() {
    this.addErrorMessage = () => {};
  }

  setAddErrorMessage(callback) {
    console.log('setAddErrorMessage', callback);
    this.addErrorMessage = callback;
  }

  async doApiCall(apiCallback) {
    try {
      const resp = await apiCallback();
      return resp;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.errors?.length > 0) {
          this.addErrorMessage(
            `${error.response.data.errors[0].msg} - ${error.response.data.errors[0].param}`
          );
          throw new Error(
            `❌ Input Error: ${error.response.data.errors[0].msg} -
              ${error.response.data.errors[0].param}`
          );
        }
        this.addErrorMessage(error.response.data);
        console.log('❌', error?.response?.data, error.message);
        throw new Error(`❌ Input Error: ${error.response.data}`);
      } else {
        this.addErrorMessage(error.message);
        console.log('❌', error.message);
        throw new Error(`❌ ${error.message}`);
      }
    }
  }

  async validateUser(token) {
    const resp = await this.doApiCall(
      async () => await http().get(`/auth/validate/${token}`)
    );

    return resp.data;
  }

  async getUser(id) {
    const resp = await this.doApiCall(
      async () => await http(localStorage.getItem('token')).get(`/user/${id}`)
    );

    return resp.data;
  }

  async saveUser(id, user) {
    console.log('saveUser', id, user);
    // throw new Error('Not implemented');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(`/user/${id}`, user)
    );

    return resp.data;
  }

  async changeUsername(id, user) {
    console.log('changeUsername', id, user);
    // throw new Error('Not implemented');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/user/${id}/change-username`,
          user
        )
    );

    return resp.data;
  }

  async changeUserPassword(id, user) {
    console.log('changeUserPassword', id, user);
    // throw new Error('Not implemented');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/user/${id}/change-password`,
          user
        )
    );

    return resp.data;
  }

  async changeUserEmail(id, user) {
    console.log('changeUserEmail', id, user);
    // throw new Error('Not implemented');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/auth/${id}/change-email`,
          user
        )
    );

    return resp.data;
  }

  async changeUserAvatar(id, user) {
    console.log('changeUserAvatar', id, user);
    // throw new Error('Not implemented');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/user/${id}/change-avatar`,
          user
        )
    );

    return resp.data;
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
      async () =>
        await http(localStorage.getItem('token')).post('/asana', asanaObj)
    );

    return resp.data;
  }

  async saveAsana(asanaObj) {
    if (!asanaObj._id) throw new Error('Asana must have an _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/asana/${asanaObj._id}`,
          asanaObj
        )
    );

    return resp.data;
  }

  async deleteAsana(asanaObj) {
    if (!asanaObj._id) throw new Error('Asana must have an _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).delete(
          `/asana/${asanaObj._id}`
        )
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
      async () =>
        await http(localStorage.getItem('token')).post('/sequence', sequenceObj)
    );

    return resp.data;
  }

  async saveSequence(sequenceObj) {
    if (!sequenceObj._id) throw new Error('Sequence must have an _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/sequence/${sequenceObj._id}`,
          sequenceObj
        )
    );

    return resp.data;
  }

  async deleteSequence(id) {
    if (!id) throw new Error('invalid _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).delete(`/sequence/${id}`)
    );

    return resp.data;
  }

  async getUserClasses(userId, favouritesOnly = false) {
    const resp = await this.doApiCall(
      async () =>
        await http().get(
          `/class/?user=${userId}${favouritesOnly ? '&favourite=true' : ''}`
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
      async () =>
        await http(localStorage.getItem('token')).post('/class', classObj)
    );

    return resp.data;
  }

  async saveClass(classObj) {
    if (!classObj._id) throw new Error('Class must have an _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/class/${classObj._id}`,
          classObj
        )
    );

    return resp.data;
  }

  //  #########

  async getUserCalendar(userId) {
    const resp = await this.doApiCall(
      async () => await http().get(`/calendar/?user=${userId}`)
    );

    return resp.data.sort((a, b) => b.modifiedAt - a.modifiedAt);
  }

  async getCalendarEntry(id) {
    const resp = await this.doApiCall(
      async () => await http().get(`/calendar/${id}`)
    );

    return resp.data;
  }

  async createCalendarEntry(calendarObj) {
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).post('/calendar', calendarObj)
    );

    return resp.data;
  }

  async saveCalendarEntry(calendarObj) {
    if (!calendarObj._id) throw new Error('Calendar must have an _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).put(
          `/calendar/${calendarObj._id}`,
          calendarObj
        )
    );

    return resp.data;
  }

  async deleteCalendarEntry(id) {
    if (!id) throw new Error('invalid _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).delete(`/calendar/${id}`)
    );

    return resp.data;
  }
  //  #########

  async uploadPreview(classId, image) {
    console.log('🙈 uploading preview');
    let fd = new FormData();
    fd.append('preview_pic', dataURItoBlob(image), `preview_${classId}.png`);

    const resp = await this.doApiCall(async () => {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/class/${classId}/upload-preview`,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=MyBoundary'
        }
      })
        .then((resp) => {
          console.log(resp);
          return resp.data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    });
  }

  async deleteClass(id) {
    if (!id) throw new Error('invalid _id');
    const resp = await this.doApiCall(
      async () =>
        await http(localStorage.getItem('token')).delete(`/class/${id}`)
    );

    return resp.data;
  }

  /**
   * Saves a Preview Image to the backend
   *
   * @param {*} elementRef reference to the element to be captured as image
   * @param {*} classId mongo _id of the class
   * @returns
   */
  async createClassPreview(elementRef, classId) {
    console.log('🙈 ref', elementRef);

    if (!elementRef || !classId) return;

    domtoimage
      .toPng(elementRef)
      .then(function (dataUrl) {
        new AsanaService().uploadPreview(classId, dataUrl).catch((err) => {
          throw err;
        });
        return true;
      })
      .catch(function (error) {
        console.error('oopsie, something went wrong!', error);
        throw error;
      });
  }
}

export default new AsanaService();
