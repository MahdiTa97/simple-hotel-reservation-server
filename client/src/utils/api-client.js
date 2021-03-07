import axios from "axios";

const apiPath = "http://localhost:4000";

const methods = ["get", "post", "put", "patch", "delete"];

export function formatUrl(path) {
  return `${apiPath}` + path;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return { responseData: response.data, responseHeader: response.headers };
  }
  return Promise.reject(response);
}

function fetchCreator(method, url, options = {}) {
  options.method = method;

  return this.request(url, options).then(checkStatus);
}

class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = fetchCreator.bind(this, method);
    });
  }

  request(url, { data, ...options } = {}) {
    const fetchOptions = options;
    fetchOptions.headers = fetchOptions.headers || {};
    fetchOptions.headers["platform"] = fetchOptions.headers.platform
      ? fetchOptions.headers.platform
      : "";
    fetchOptions.headers["Accept"] = "application/json";
    fetchOptions.headers["Content-Type"] = "application/json";

    if (data) {
      if (fetchOptions.type === "formdata") {
        fetchOptions.body = new FormData();

        for (const key in data) {
          if (
            typeof key === "string" &&
            data.hasOwnProperty(key) &&
            typeof data[key] !== "undefined"
          ) {
            fetchOptions.body.append(key, data[key]);
          }
        }
      } else {
        fetchOptions.body = JSON.stringify(data);
      }
    }

    const instance = axios.create({
      baseURL: apiPath,
      headers: fetchOptions.headers,
      validateStatus: () => {
        return true;
      },
    });
    if (data) {
      return instance[options.method](formatUrl(url), data);
    }
    return instance[options.method](formatUrl(url));
  }
}

export default new ApiClient();
