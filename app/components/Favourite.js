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
    <div className="fav" onClick={handleSelect}>
      <div className="fav-section">
      <Image alt="" src={Location} width={20} height={20} />
      <div className="flex-grow">
        {name}, {country}
      </div>
      </div>
      <div className="icon-wrapper" onClick={handleRemove}><Trash2 color="red" size={20}/></div>
    </div>
  );
};

export default Favourite;

