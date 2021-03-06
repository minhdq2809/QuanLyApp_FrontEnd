/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import TextField from "@material-ui/core/TextField";

export function TextFieldCustom(props) {
  const { label, name, value, readOnly, handle, rowsMax } = props;
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    handle(name, value);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      margin="dense"
      name={name}
      multiline={rowsMax ? true : false}
      rowsMax={rowsMax ? rowsMax : 1}
      fullWidth
      InputProps={{
        readOnly: readOnly,
      }}
    />
  );
}
