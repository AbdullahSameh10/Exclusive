import filledStar from "@Assets/filledStar.svg";
import halfStar from "@Assets/halfFilledStar.svg";
import emptyStar from "@Assets/emptyStar.svg";
export default function StarRating({ rating }: { rating: number }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <span className="flex gap-1">
      {Array.from({ length: filledStars }).map((_, i) => (
        <img
          key={i}
          src={filledStar}
          alt="star"
        />
      ))}
      {hasHalfStar && (
        <img
          key="half"
          src={halfStar}
          alt="half star"
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <img
          key={i}
          src={emptyStar}
          alt="empty star"
        />
      ))}
    </span>
  );
}