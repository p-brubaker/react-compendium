export default async function fetchWikiImage(name) {
  const fixName = (name) =>
    name
      .replace('-', ' ')
      .split(' ')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('_')

  // const wikiUrl = `https://en.wikipedia.org/wiki/${fixName(name)}`
  const url = `https://glacial-journey-79252.herokuapp.com/puppeteer?name=${fixName(name)}`
  // const url = `http://localhost:7890/puppeteer?name=${fixName(name)}`

  // const res = await fetch(url)
  // const text = await res.text()
  const res = await fetch(url)
  const json = await res.json()

  // const imageUrlPattern = /(?<=og:image).*/
  // const imageUrl = text.match(imageUrlPattern)[0].slice(11)
  return json
}

/*
  returns an object with name, imageUrl, and id if a new
  entry was added to the database
*/
