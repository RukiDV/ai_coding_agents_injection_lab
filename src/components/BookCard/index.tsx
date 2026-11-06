import type { Book, Review } from "../../types";

type BookCardProps = {
  book: Book;
  reviews?: Review[];
  onToggleRead: () => void;
  onRemove: () => void;
};

export default function BookCard({
  book,
  reviews = [],
  onToggleRead,
  onRemove,
}: BookCardProps) {
  return (
    <li className={book.isRead ? "book read" : "book"}>
      <div>
        <h3>{book.title}</h3>
        <p>
          {book.author} · {book.genre}
        </p>
        <p
          aria-label={
            book.rating > 0 ? `Rating: ${book.rating} of 5` : "Not rated"
          }
        >
          {book.rating > 0 ? "★".repeat(book.rating) : "not rated"}
        </p>
        {reviews.length > 0 && (
          <ul className="reviews" aria-label={`Reviews of ${book.title}`}>
            {reviews.map((review, index) => (
              <li key={index}>
                <q>{review.text}</q> — {review.author}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="actions">
        <button type="button" onClick={onToggleRead}>
          {book.isRead
            ? `Mark ${book.title} as unread`
            : `Mark ${book.title} as read`}
        </button>
        <button type="button" onClick={onRemove}>
          Remove {book.title}
        </button>
      </div>
    </li>
  );
}
