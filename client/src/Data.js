import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    }


    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  /**
   * Create user funtion
   * @param {string} user 
   * @returns 
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Create user with course object
   * 
   * Authenticate required
   * @param {object} course 
   * @param {string} username 
   * @param {string} password 
   * @returns 
   */
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { 
      username, 
      password 
    });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Update  course with id and course object
   * Authenticate required
   * 
   * @param {num} id 
   * @param {object} course 
   * @param {string} username 
   * @param {string} password 
   * @returns 
   */
  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { 
      username, 
      password 
    });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * Delete course with course id
   * 
   * Authenticate required
   * @param {num} id 
   * @param {string} username 
   * @param {string} password 
   * @returns 
   */
  async deleteC(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { 
      username, 
      password 
    });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}