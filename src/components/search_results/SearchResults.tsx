import PaginationFooter from "@/components/search_results/PaginationFooter";
import StackedCards from "@/components/search_results/StackedCards";
import ResultsTable from "@/components/search_results/ResultsTable";
import type { SearchResultsProps } from "@/types/SearchResultsProps";

interface ExtendedSearchResultsProps extends SearchResultsProps { isPlaceholderData: boolean; }
const SearchResults = (props: ExtendedSearchResultsProps) => {
  const { isPlaceholderData, ...rest } = props;
  return (
    <div id="search-results" className={`${isPlaceholderData ? 'opacity-60' : ''} flex flex-col gap-4`}>
      <div className="hidden md:block"><ResultsTable {...rest} /></div>

      <div className="block md:hidden"><StackedCards {...rest} /></div>

      <PaginationFooter {...rest} />
    </div>
  )
}
export default SearchResults