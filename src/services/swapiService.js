async function fetchCharacters({ type, query, page }) {
  let url = `https://swapi.dev/api/${type}`
  if (query) url += `?search=${query}`
  if (page) url += `?page=${page}`

  const res = await fetch(url)
  const json = await res.json()
  return json
}

export default fetchCharacters
