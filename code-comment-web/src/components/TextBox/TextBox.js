import React from "react";
import { makeStyles } from "@material-ui/styles";
import { grey } from "@material-ui/core/colors";
import { jcss } from "../../utils";

const useStyles = makeStyles((theme) => ({
  TextBox: {
    margin: 0,
    padding: 0,
    "&.small": {
      fontSize: "0.8rem",
    },
  },
  placeholder: {
    color: grey[700],
    fontSize: "0.9rem",
  },
}));

const TextBox = ({ onChange, initial, placeholder, set, small }) => {
  const classes = useStyles();
  const Prompt = (text, value) => set(text, "set value", <i />, value);
  const doEdit = () => {
    Prompt(placeholder, initial).then((value) => onChange && onChange(value));
  };
  return (
    <div
      className={jcss({ [classes.TextBox]: 1, small })}
      onClick={() => doEdit()}
    >
      {initial?.length ? (
        initial
      ) : (
        <em className={classes.placeholder}>{placeholder}</em>
      )}
    </div>
  );
  // return (
  //   <divdata-testid="test-for-TextBox">
  //     <TextField
  //       onBlur={() => setEdit(false)}
  //       fullWidth
  //       autoFocus
  //       variant="standard"
  //       onChange={doChange}
  //       size="small"
  //       value={value}
  //     />
  //   </div>
  // );
};

TextBox.defaultProps = {};
export default TextBox;
