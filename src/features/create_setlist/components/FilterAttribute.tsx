
interface FilterAttProps {
  label: string;
  data: string;
}

const FilterAttribute = ({ label, data }: FilterAttProps) => {
  return (
    <div className="flex gap-2">
      <strong className="capitalize">{label}:</strong>
      <span>{data}</span>
    </div>
  )
}
export default FilterAttribute