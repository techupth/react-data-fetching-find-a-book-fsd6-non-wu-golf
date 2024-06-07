import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getSearchList = async (seachText) => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${seachText}`
      );
      console.log(result);
      setSearchList(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchList(searchText);
  }, [searchText]);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="App">
      <h1>Find A Book</h1>
      <label htmlFor="search-text"></label>
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        input
        id="search-text"
        type="text"
        value={searchText}
        onChange={handleChange}
      />
      <div className="book-list">
        <ul>
          {searchList.map((item) => (
            <li>{item.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
