import SearchBar from "./Search";
import Catalog from "../pages/Catalog";
function ParentComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <Catalog searchTerm={searchTerm} />
    </div>
  );
}
