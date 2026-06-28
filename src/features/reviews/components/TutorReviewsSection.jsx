import { useCallback, useEffect, useState } from "react";
import { Loader2, MessageSquareText } from "lucide-react";

import reviewService from "@/features/reviews/services/reviewService";
import { StarRating } from "@/features/reviews/components/StarRating";
import Pagination from "@/components/shared/Pagination";

const PAGE_SIZE = 5;

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function TutorReviewsSection({ tutorId, initialSummary }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(
    initialSummary || { averageRating: 0, reviewCount: 0 }
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!tutorId) return;
    try {
      setLoading(true);
      const res = await reviewService.getTutorReviews(tutorId, { page, limit: PAGE_SIZE });
      const data = res.data.data;
      setReviews(data.reviews || []);
      setSummary(data.summary || { averageRating: 0, reviewCount: 0 });
      setTotalPages(data.pagination?.totalPages || 1);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [tutorId, page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const reviewCount = summary.reviewCount || 0;
  const averageRating = summary.averageRating || 0;

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6" data-aos="fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <MessageSquareText className="w-4 h-4 text-green-600" />
          Đánh giá từ học viên
          {reviewCount > 0 && <span className="text-sm font-normal text-gray-400">({reviewCount})</span>}
        </h2>
        {reviewCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-500">{averageRating.toFixed(1)}</span>
            <StarRating value={averageRating} size={18} />
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-sm text-gray-500">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang tải đánh giá...
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <MessageSquareText className="h-9 w-9 text-gray-300" />
          <p className="text-sm font-semibold text-gray-600">Chưa có đánh giá nào</p>
          <p className="text-sm text-gray-400">Gia sư này chưa nhận được đánh giá từ học viên.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-green-400 to-blue-500 text-sm font-bold text-white">
                  {review.reviewerAvatar ? (
                    <img
                      src={review.reviewerAvatar}
                      alt={review.reviewerName}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(review.reviewerName)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">{review.reviewerName}</p>
                    <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                  </div>
                  <StarRating value={review.rating} size={14} className="mt-1" />
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} className="pt-2" />
        </div>
      )}
    </section>
  );
}
