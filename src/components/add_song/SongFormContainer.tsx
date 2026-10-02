import useSongForm from '@/hooks/useSongForm';
import AddSongForm from '@/components/add_song/AddSongForm';
import type { SongType } from '@/types/SongType';
import type { SongFormValues } from '@/types/SongFormType';

interface SongFormContainerProps {
  defaultValues: SongFormValues;
  onSave: (song: SongType) => void;
  title: string;
  submitLabel: string;
}
const SongFormContainer = ({
  defaultValues,
  onSave,
  title,
  submitLabel,
}: SongFormContainerProps) => {
  const formData = useSongForm(defaultValues, onSave);
  return <AddSongForm {...formData} title={title} submitLabel={submitLabel} />;
};
export default SongFormContainer;
