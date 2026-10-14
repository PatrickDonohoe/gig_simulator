import type { SongType } from "@/types/SongType";

interface SongAttributeProps {
  icon: React.ReactNode;
  attributeId: keyof SongType;
  attributeText: string;
}
    const SongAttribute = ({ icon, attributeId, attributeText }: SongAttributeProps) => (
      <div id={attributeId} className="flex items-center p-1 gap-4">
        {icon}{' '}
        <span className="text-text-main">{attributeText}</span>
      </div>
    );

export default SongAttribute