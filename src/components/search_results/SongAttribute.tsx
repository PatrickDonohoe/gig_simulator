import type { SongType } from '@/types/SongType';

interface SongAttributeProps {
  icon: React.ReactNode;
  attributeId: keyof SongType;
  attributeText: string;
}
const SongAttribute = ({
  icon,
  attributeId,
  attributeText,
}: SongAttributeProps) => (
  <div id={attributeId} className="flex items-center gap-4 p-1">
    {icon} <span className="text-text-main">{attributeText}</span>
  </div>
);

export default SongAttribute;
