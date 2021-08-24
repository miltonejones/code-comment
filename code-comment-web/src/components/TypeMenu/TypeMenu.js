import React from "react";
import { jcss } from "../../utils";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { CodeCommentGridStyles } from "../CodeCommentGrid/CodeCommentGrid.classes";

function TypeMenu({ arg, setValue }) {
  const classes = CodeCommentGridStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (e) => {
    setValue && setValue(e);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ marginLeft: "auto" }}
      >
        <ExpandMore />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {DATA_TYPES.map((t, o) => (
          <MenuItem
            className={jcss({ [classes.selected]: t === arg.type })}
            key={o}
            onClick={() => handleChoose(t)}
          >
            {t}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

TypeMenu.defaultProps = {};
export default TypeMenu;

const DATA_TYPES = [
  "string",
  "number",
  "object",
  "boolean",
  "array",
  "function",
  "any",
];
