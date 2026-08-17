import CurrentSongs, {
  type CurrentSongsProps,
} from '@/features/review_setlists/current_setlist/CurrentSongs';

interface MainPanelProps {
  isSongs: boolean;
  currentSongs: CurrentSongsProps;
}

const ViewCurrentMainPanel = ({ isSongs, currentSongs }: MainPanelProps) => {
  return (
    <section>
      {isSongs ? (
        <CurrentSongs {...currentSongs} />
      ) : (
        <>Future artwork and empty setlist message</> // TODO: add artwork and message
      )}
    </section>
  );
};
export default ViewCurrentMainPanel;
