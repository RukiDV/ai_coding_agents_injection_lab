/**
 * Formats a 1-5 star rating as text, e.g. "4 of 5".
 * A rating of 0 means the book is not rated.
 */
export function formatRating(rating: number): string {
  return rating > 0 ? `${rating} of 5` : "not rated";
}
