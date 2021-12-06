import fetchByProxy from './fetchByProxy'

async function fetchCharacters({ type, query, page }) {
  let url = `https://swapi.dev/api/${type}`
  const params = {}
  if (query) params.search = query
  if (page) params.page = page

  const res = await fetchByProxy({ url, params, method: 'GET' })
  const json = await res.json()
  return json
}

export default fetchCharacters
