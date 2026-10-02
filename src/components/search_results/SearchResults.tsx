import StackedCards from "@/components/search_results/StackedCards";
import ResultsTable from "@/components/search_results/ResultsTable";
import type { SearchResultsProps } from "@/types/SearchResultsProps";

const SearchResults = (props: SearchResultsProps) => {

  return (
    <div id="search-results" className="">
      <div className="hidden md:block"><ResultsTable {...props} /></div>

      <div className="block md:hidden"><StackedCards /></div>
    </div>
  )
}
export default SearchResults