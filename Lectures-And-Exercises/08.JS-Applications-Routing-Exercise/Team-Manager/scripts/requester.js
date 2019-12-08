const baseUrl = "https://baas.kinvey.com";
const appKey = "kid_rJJJfU_3B";
const appSecret = "ee627779d3df49eaacc4e367d2c4e5d8";


function createAuthorization(type) {
  return type === "Basic"
    ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
    : `Kinvey ${sessionStorage.getItem("authtoken")}`;
}

function createHeaders(type, httpMethod, data) {
  const headers = {
    method: httpMethod,
    headers: {
      Authorization: createAuthorization(type),
      "Content-Type": "application/json"
    }
  };

  if (httpMethod === "POST" || httpMethod === "PUT") {
    headers.body = JSON.stringify(data);
  }

  return headers;
}

function handleError(res) {
  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        status: res.status,
        statusText: res.statusText
      })
    );
  }

  return res;
}

function serializeData(res) {
  return res.json();
}

function fetchData(kinveyModule, endPoint, headers) {
  const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

  return fetch(url, headers)
    .then(handleError)
    .then(serializeData);
}

// EXPORTS
export function get(kinveyModule, endPoint, type) {
  const headers = createHeaders(type, "GET");
  return fetchData(kinveyModule, endPoint, headers);
}

export function post(kinveyModule, endPoint, data, type) {
  const headers = createHeaders(type, "POST", data);
  return fetchData(kinveyModule, endPoint, headers);
}

export function put(kinveyModule, endPoint, data, type) {
  const headers = createHeaders(type, "PUT", data);
  return fetchData(kinveyModule, endPoint, headers);
}

export function del(kinveyModule, endPoint, type) {
  const headers = createHeaders(type, "DELETE");
  return fetchData(kinveyModule, endPoint, headers);
}