import type { Book, Review } from "../../types";
import BookCard from "../BookCard";

type BookListProps = {
  books: Book[];
  reviewsByBook?: Record<string, Review[]>;
  onToggleRead: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function BookList({
  books,
  reviewsByBook = {},
  onToggleRead,
  onRemove,
}: BookListProps) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          reviews={reviewsByBook[book.id] ?? []}
          onToggleRead={() => onToggleRead(book.id)}
          onRemove={() => onRemove(book.id)}
        />
      ))}
    </ul>
  );
}
