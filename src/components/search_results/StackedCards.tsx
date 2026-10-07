import type { SearchResultsProps } from "@/types/SearchResultsProps";
import ResultsTile from "@/components/search_results/ResultsTile";

/**
 * @param results is an array of song search results data.
 * @param isFetching is a boolean for the state of the TanStack fetch.
 * @returns a scrollable series of expandable search result cards.
 */

const StackedCards = ({
  results,
  isFetching,
}: SearchResultsProps) => {
  return (
    <section id="stacked-cards" className="flex flex-col gap-4 bg-bg-main text-text-main">
      <h2 className="pb-4 font-bold text-3xl">Search Results</h2>

      <ul id="card-list" className={`flex flex-col gap-4 ${isFetching ? 'transition-opacity-60' : ''}`}>
        {results.rows.map((song) => (
          <ResultsTile key={song.id} song={song} />
        ))}
      </ul>
    </section>
  )
}
export default StackedCards