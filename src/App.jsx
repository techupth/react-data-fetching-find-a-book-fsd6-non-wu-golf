import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [bookName, setBookName] = useState([]);
  const [bookSearch, setBookSearch] = useState("");

  const handleSearch = (event) => {
    setBookSearch(event.target.value);
  };

  const getBookName = async (bookSearch) => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`
    );
    setBookName(result.data.items);
  };

  useEffect(() => {
    getBookName(bookSearch);
  }, [bookSearch]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" onChange={handleSearch} value={bookSearch} />
      {bookName.map((item) => {
        return (
          <ul key={item.volumeInfo.id}>
            <li>{item.volumeInfo.title}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
