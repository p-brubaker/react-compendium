import './App.css'
import { useEffect } from 'react'
import UserInputField from '../../components/user-input-field/UserInputField'
import CharacterCard from '../../components/character-card/CharacterCard'
// import fetchWikiImage from '../../services/fetchWikiImage'
// import fetchCharacters from '../../services/swapiService'

function App() {
  useEffect(() => {
    // async function getImageUrl(name = 'bail organa') {
    //   const url = await fetchWikiImage(name)
    //   return url
    // }
    // getImageUrl()
    // async function getCharacters() {
    //   const res = await fetchCharacters({ type: 'starships' })
    //   return res
    // }
    // proof of concept
    // works
    // finish static layout and come back to using these
  }, [])

  return (
    <div className="App">
      <h1>Character Compendium</h1>
      <UserInputField />
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
