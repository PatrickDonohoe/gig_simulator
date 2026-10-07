import PageButton from '@/components/search_results/PageButton';
import type { SearchResultsProps } from '@/types/SearchResultsProps';

const PaginationFooter = ({
  results,
  isFetching,
  onPageChange,
}: SearchResultsProps) => {
  return (
    // TODO: return to add jump to first and last page buttons
    <div className="flex items-center justify-center gap-4">
      <span>
        Page {results.page + 1} of {results.totalPages}
      </span>

      <div className="flex items-center justify-center gap-4">
        <PageButton
          isDisabled={results.page === 0 || isFetching}
          onClick={() => onPageChange(results.page - 1)}
          direction="prev"
        />

        <span className="px-2">{results.page + 1}</span>

        <PageButton
          isDisabled={results.page >= results.totalPages - 1 || isFetching}
          onClick={() => onPageChange(results.page + 1)}
          direction="next"
        />
      </div>
    </div>
  );
};
export default PaginationFooter;
