import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './App.css';

function App () {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  
const getData = async () => {
  try {
    Swal.fire({
      title: 'Loading',
      text: 'Please wait',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    })
    const response = await axios.get('https://imdb.iamidiotareyoutoo.com/search?q=barbie');
    setData(response.data.description);
    setFiltered(response.data.description);
    Swal.close();
    Swal.fire('Success', 'Movie loaded successfully', 'success')
  } catch (error) {
    Swal.close()
    Swal.fire('Error', 'Failed to loaded movie', 'error')
    console.log(error);
  }
}

const handleSearch = (e) => {
  setSearch(e.target.value);
}

const filteredMovies = () => {
  const filtering = data.filter((movie) => {
    return movie['#TITLE'].toLowerCase().includes(search.toLowerCase());
  })
  setFiltered(filtering);
}

useEffect (() => {
  getData();
}, []);

return (
  <>
  <div>
    <h1 className='Title'>Movie Collection</h1>
    <div className='Search-Button'>
      <input type='search' placeholder='Search a movie' onChange={handleSearch} value={search}/> 
      <button onClick={filteredMovies}>Search</button>
    </div>
    <div className='Movie-Container'>
      {filtered.map((movie) => {
        return (
          <div className='Movie-Card' key={movie['#IMBD_ID']}>
            <img style={{width: '200px'}} src={movie['#IMG_POSTER']} />
            <h1> {movie['#TITLE']} </h1>
            <div className='Year-Rank-Cast'>
              <p> {movie['#YEAR']} </p>
              <p> #{movie['#RANK']} </p>
            </div>
            <p className='Cast'> Cast: {movie['#ACTORS']} </p>
          </div>
        );
      })}
    </div>
  </div>
  </>
)

}

export default App