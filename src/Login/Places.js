import { LocationMarkerIcon } from "@heroicons/react/outline";
import React from "react";
import PhoneInput from "react-phone-input-2";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <div className="form">
          <div className="flex my-4 flex-row  p-1 items-center rounded-md text-gray-600 txt-sm">
          <PhoneInput
                country={"ke"}
                preferredCountries={["ke", "ug", "tz"]}
                placeholder="254799980846"
                
              />
        </div>

        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <div className="flex flex-row my-4 ring-1 ring-gray-300 items-center rounded-md text-gray-600 txt-sm p-2">
                <LocationMarkerIcon className="h-5 text-gray-400 " />

                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input focus:outline-none w-full",
                  })}
                />
              </div>
              <div className="autocomplete-dropdown-container" key={suggestions} >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={suggestion.id}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
