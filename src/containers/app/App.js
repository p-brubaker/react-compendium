/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState } from 'react'
import UserInputField from '../../components/user-input-field/UserInputField'
import CharacterCard from '../../components/character-card/CharacterCard'
import Paginator from '../../components/paginator/Paginator'
// import fetchWikiImage from '../../services/fetchWikiImage'
import fetchCharacters from '../../services/swapiService'

function App() {
  // input field params
  const [searchInput, setSearchInput] = useState('')
  const [film, setFilm] = useState('all')
  const [filter, setFilter] = useState('people')
  const [query, setQuery] = useState('')
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const handleSetCriteria = (value, field) => {
    if (field === 'searchInput') setSearchInput(value)
    if (field === 'film') setFilm(value)
    if (field === 'filter') setFilter(value)
  }

  const handleSubmit = () => {
    setQuery(searchInput)
  }

  const handleChangePage = (direction) => {
    if (direction === 'left' && currentPage > 1) setCurrentPage((prev) => prev - 1)
    if (direction === 'right' && currentPage < characters.length) setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    async function getCharacters() {
      const res = await fetchCharacters({ name: query, type: filter })
      return res
    }
    if (query) {
      const newCharacters = getCharacters()
      setCharacters(newCharacters)
      setQuery('')
    } else return
  }, [query])

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
        handleSubmit={handleSubmit}
      />
      <Paginator
        handleClick={handleChangePage}
        isFirst={currentPage === 1}
        isLast={currentPage === characters.length}
      />
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
