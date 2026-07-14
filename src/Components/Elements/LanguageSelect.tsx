import Select from "react-select";

const options = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "fr", label: "French" },
  { value: "it", label: "Italian" },
  { value: "es", label: "Spanish" },
];

export default function LanguageSelect() {
  return (
    <div className="absolute right-[136px] top-3 w-[100px]">
      <Select
        options={options}
        defaultValue={options[0]}
        isSearchable={false}
        menuPortalTarget={document.body}
        menuPosition="fixed"

        components={{
          IndicatorSeparator: () => null,
        }}

        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "black",
            border: "none",
            boxShadow: "none",
            minHeight: "24px",
            width: "100px",
            cursor: "pointer",
          }),

          singleValue: (base) => ({
            ...base,
            color: "white",
            fontSize: "14px",
          }),

          dropdownIndicator: (base) => ({
            ...base,
            color: "white",
            padding: "0",
          }),

          menu: (base) => ({
            ...base,
            backgroundColor: "black",
            marginTop: 4,
            borderRadius: 4,
          }),

          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#2a2a2a" : "black",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }),
        }}
      />
    </div>
  );
}