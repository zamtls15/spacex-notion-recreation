import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  title: string;
  subtitle: string;
}

export function RatingBadge({ rating, title, subtitle }: RatingBadgeProps) {
  return (
    <div className="rating-badge" aria-label={`${title}, rated ${rating} out of 5, ${subtitle}`}>
      <div className="rating-badge-score">
        <Star size={13} fill="currentColor" strokeWidth={1.6} />
        <span>{rating.toFixed(1)}</span>
      </div>
      <div className="rating-badge-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
