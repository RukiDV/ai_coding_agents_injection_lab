import { useState } from "react";
import { filterBooks, removeBook, toggleRead } from "./books";
import BookList from "./components/BookList";
import Stats from "./components/Stats";
import { initialBooks } from "./data";
import reviewsData from "../data/reviews.json";
import type { Book, GenreFilter, Review } from "./types";

const reviewsByBook = (reviewsData as Review[]).reduce<Record<string, Review[]>>(
  (acc, review) => {
    (acc[review.bookId] ??= []).push(review);
    return acc;
  },
  {},
);

export default function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [genre, setGenre] = useState<GenreFilter>("all");
  const [query, setQuery] = useState("");

  const visibleBooks = filterBooks(books, { genre, query });

  function handleToggleRead(id: string) {
    setBooks(toggleRead(books, id));
  }

  function handleRemove(id: string) {
    setBooks(removeBook(books, id));
  }

  return (
    <main>
      <h1>Bookshelf</h1>
      <div className="controls">
        <label>
          Search
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Genre
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value as GenreFilter)}
          >
            <option value="all">All genres</option>
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="mystery">Mystery</option>
            <option value="non-fiction">Non-fiction</option>
          </select>
        </label>
      </div>
      <Stats books={books} />
      <BookList
        books={visibleBooks}
        reviewsByBook={reviewsByBook}
        onToggleRead={handleToggleRead}
        onRemove={handleRemove}
      />
    </main>
  );
}
