import Location from "../../public/marker.svg";
import Image from "next/image";
import { Trash2 } from "react-feather";

const Favourite = ({ id, name, country, onRemove, onSelect }) => {
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove(id);
  };

  const handleSelect = () => {
    if (onSelect) onSelect(id);
  };

  return (
    <div className="fav flex flex-row gap-2 w-full" onClick={handleSelect}>
      <Image alt="" src={Location} width={20} height={20} />
      <div className="flex-grow">
        {name}, {country}
      </div>
      <button
        onClick={handleRemove}
        className="ml-auto"
        aria-label="Remove favorite"
      >
        <Trash2 color="red" size={20} />
      </button>
    </div>
  );
};

export default Favourite;
