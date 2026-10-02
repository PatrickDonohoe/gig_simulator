export interface SearchResultsProps {
  results: SearchResultsPage;
  isFetching: boolean;
  isPlaceholderData: boolean;
  onSelect: (id: string) => void;
  onPageChange: (page: number) => void;
}

export interface SearchResultRow {
  id: string;
  title: string;
  artists: string;
  durationSec: number;
}

export interface SearchResultsPage {
  rows: SearchResultRow[];
  page: number; // 0-indexed
  totalPages: number;
  totalResults: number;
  pageSize: number;
}
