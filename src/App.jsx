import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [bookName, setBookName] = useState("a");
  const [suggestBooks, setSuggestBooks] = useState([]);

  useEffect(() => {
    GetBook();
  }, [bookName]);

  const GetBook = async () => {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
      );
      let books = await response.data.items;
      setSuggestBooks(books);
      console.log("result", books);
    } catch (err) {
      console.error("error: ", err);
    }
  };

  return (
    <div className="App">
      {/* start coding here */}
      <h1>Find a book</h1>
      <input type="text" onChange={(e) => setBookName(e.target.value)} />
      <div>
        {suggestBooks.map((item) => {
          return <li key={item.id}>{item.volumeInfo.title}</li>;
        })}
      </div>
    </div>
  );
}

export default App;
