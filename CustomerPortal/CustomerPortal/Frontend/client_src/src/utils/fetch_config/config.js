export const fetch_config = {
  post: (token, body) => {
    let postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `bearer ${token}` : null
      },
      body: JSON.stringify(body)
    };

    return postConfig;
  },
  get: token => {
    let getConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }
    };

    return getConfig;
  },
  _delete: (token, body) => {
    let deleteConfig = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `bearer ${token}` : null
      },
      body: body ? JSON.stringify(body) : null
    };

    return deleteConfig;
  }
};
