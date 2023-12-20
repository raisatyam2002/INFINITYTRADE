import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Search(props) {
  const [ticker, setTicker] = useState("");
  function handleClick(e) {
    e.preventDefault();
    console.log(ticker);
    props.handleSearch(ticker);
  }
  return (
    <div class="flex justify-center mt-4 space-x-4">
      {/* {ticker} */}
      <TextField
        id="outlined-basic"
        label="Want to trade? Enter ticker"
        variant="outlined"
        value={ticker}
        onChange={(e) => {
          setTicker(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={handleClick}>
        Search
      </Button>
    </div>
  );
}
export default Search;
