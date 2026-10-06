import type { SongReturn } from "@/types/SearchSong";

export interface SearchResultsProps {
  results: SearchResultsPage;
  isFetching: boolean;
  isPlaceholderData: boolean;
  onPageChange: (page: number) => void;
}

export interface SearchResultRow {
  id: string;
  title: string;
  artists: SongReturn['artists'];
  durationSec: number;
}

export interface SearchResultsPage {
  rows: SearchResultRow[];
  page: number; // 0-indexed
  totalPages: number;
  totalResults: number;
  pageSize: number;
}
