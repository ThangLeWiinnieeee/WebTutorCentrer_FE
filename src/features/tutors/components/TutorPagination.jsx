import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TutorPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push("...");
  }
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Trang trước"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-1.5 text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-10 min-w-10 rounded-lg border px-2.5 text-sm font-medium transition ${
              currentPage === page
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Trang sau"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
