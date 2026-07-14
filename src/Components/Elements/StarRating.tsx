export default function StarRating({ rating }: { rating: number }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <span className="flex gap-1">
      {Array.from({ length: filledStars }).map((_, i) => (
        <img
          key={i}
          src="@Assets/filledStar.svg"
          alt="star"
        />
      ))}
      {hasHalfStar && (
        <img
          key="half"
          src="@Assets/halfFilledStar.svg"
          alt="half star"
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <img
          key={i}
          src="@Assets/emptyStar.svg"
          alt="empty star"
        />
      ))}
    </span>
  );
}