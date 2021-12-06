import './UserInputField.css'

function UserInputField({ film, searchInput, filter, handleChange, handleSubmit }) {
  const filterOptions = ['people', 'starships', 'planets']
  const films = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI']

  return (
    <div className="user-input-field">
      <div className="input-field-top">
        <label htmlFor="search">
          {'search '}
          <input
            name="search"
            value={searchInput}
            onChange={(e) => handleChange(e.target.value, 'searchInput')}
          />
          <button onClick={handleSubmit}>GO</button>
        </label>
        <label htmlFor="film">
          {'film '}
          <select name="film" value={film} onChange={(e) => handleChange(e.target.value, 'film')}>
            {films.map((film, i) => (
              <option key={film} value={i}>
                {film}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="input-field-bottom">
        <label htmlFor="filter">
          {'filter '}
          <select
            name="filter"
            value={filter}
            onChange={(e) => handleChange(e.target.value, 'filter')}
          >
            {filterOptions.map((choice) => (
              <option key={choice} value={choice}>
                {choice.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

export default UserInputField
