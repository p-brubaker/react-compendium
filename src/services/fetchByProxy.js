export default async function fetchByProxy(url, params) {
  const response = await fetch('https://proxy-fetch.herokuapp.com', {
    method: 'POST',
    body: {
      method: 'GET',
      url,
      params,
    },
  })
  return response
}
