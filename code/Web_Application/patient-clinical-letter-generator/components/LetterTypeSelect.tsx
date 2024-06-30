import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  letterType: string;
  setLetterType: React.Dispatch<React.SetStateAction<string>>;
}

const LetterTypeSelect: React.FC<Props> = ({ letterType, setLetterType }) => {
  // const [letterType, setLetterType] = React.useState("Discharge");

  const handleChange = (event: SelectChangeEvent) => {
    setLetterType(event.target.value);
  };

  return (
    <Select
      labelId="letter-type-select-label"
      id="letter-type-select"
      value={letterType}
      //   label="LetterType"
      onChange={handleChange}
    >
      <MenuItem value={"Discharge"}>Discharge</MenuItem>
      <MenuItem value={"Referral"}>Referral</MenuItem>
      <MenuItem value={"Consultation"}>Consultation</MenuItem>
    </Select>
  );
};

export default LetterTypeSelect;
