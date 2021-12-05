import './App.css'
import { useEffect, useState } from 'react'
import UserInputField from '../../components/user-input-field/UserInputField'
import CharacterCard from '../../components/character-card/CharacterCard'
import Paginator from '../../components/paginator/Paginator'
// import fetchWikiImage from '../../services/fetchWikiImage'
// import fetchCharacters from '../../services/swapiService'

function App() {
  // input field params
  const [searchInput, setSearchInput] = useState('')
  const [film, setFilm] = useState('all')
  const [filter, setFilter] = useState('people')

  const handleSetCriteria = (value, field) => {
    if (field === 'searchInput') setSearchInput(value)
    if (field === 'film') setFilm(value)
    if (field === 'filter') setFilter(value)
  }

  // useEffect(() => {
  //   // async function getImageUrl(name = 'bail organa') {
  //   //   const url = await fetchWikiImage(name)
  //   //   return url
  //   // }
  //   // getImageUrl()
  //   // async function getCharacters() {
  //   //   const res = await fetchCharacters({ type: 'starships' })
  //   //   return res
  //   // }
  //   // proof of concept
  //   // works
  //   // finish static layout and come back to using these
  // }, [])

  return (
    <div className="App">
      <h1>Character Compendium</h1>
      <UserInputField
        film={film}
        searchInput={searchInput}
        filter={filter}
        handleChange={handleSetCriteria}
      />
      <Paginator />
      <CharacterCard />
    </div>
  )
}

export default App

// So far we have
//   The ability to fetch results by page, query, category
//   The ability to get a url for an image hosted by wikipedia

// Next steps
//   Rendering static data
