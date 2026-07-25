import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${rating.toFixed(1)} out of 5`}
    >
      {/* Filled Stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <FontAwesomeIcon
          key={`filled-${i}`}
          icon={faStar}
          className="text-sm text-[#FFD43B] sm:text-base"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="text-sm text-[#FFD43B] sm:text-base"
        />
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          className="stroke-[#FFD43B] stroke-[40] text-sm text-white dark:text-neutral-900 sm:text-base"
        />
      ))}
    </div>
  );
}
