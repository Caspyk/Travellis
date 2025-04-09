import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import { useEffect } from "react";
  
  export default function SearchBox({ onPlaceSelect }) {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (description) => {
      setValue(description, false);
      clearSuggestions();
  
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onPlaceSelect({ lat, lng });
    };
  
    return (
      <div className="relative w-full max-w-md mx-auto">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search for places..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        {status === "OK" && (
          <ul className="absolute bg-white border w-full shadow z-10 max-h-48 overflow-y-auto">
            {data.map(({ description }, index) => (
              <li
                key={index}
                onClick={() => handleSelect(description)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  