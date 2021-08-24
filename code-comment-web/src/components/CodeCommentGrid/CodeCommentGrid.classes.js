import { makeStyles } from "@material-ui/styles";
import { blue, deepOrange, green, orange, red } from "@material-ui/core/colors";

export const CodeCommentGridStyles = makeStyles((theme) => ({
  CodeCommentGrid: {
    marginLeft: 40,
    marginTop: 72,
    padding: 0,
    width: "calc(100vw - 80px)",
    height: "75vh",
  },
  ArgButton: {
    maxWidth: 220,
    width: "inherit",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
    cursor: "pointer",
    border: "solid 1px #fff",
    "&:active": {
      backgroundColor: "#e0e0e0",
    },
    "& .argMenu": {
      visibility: "hidden",
    },
    "& .argName": {
      width: 180,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      borderRight: "solid 1px #fff",
    },
    "&:hover": {
      border: "solid 1px #e0e0e0",
      backgroundColor: "antiquewhite",
      "& .argName": {
        borderRight: "solid 1px #e0e0e0",
      },
      "& .argMenu": {
        visibility: "visible",
      },
    },
  },
  MethodRow: {
    padding: "8px 0",
  },
  pre: {
    width: "90vw",
    overflow: "auto",
    maxHeight: "calc(100vh - 230px)",
  },
  Highlight: {
    overflow: "auto",
    maxWidth: "calc(100vw - 550px)",
  },
  code: {
    width: "90vw",
    maxHeight: "calc(100vh - 330px)",
    overflow: "auto",
    fontSize: 12,
    margin: "12px 0 0 12px",
    outline: "solid 1px #777",
    paddingLeft: 12,
    maxWidth: "calc(100vw - 440px)",
  },
  flexBase: {
    display: "flex",
    alignItems: "baseline",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  flexRight: {
    marginLeft: "auto",
  },
  nowrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  file: {
    width: 320,
    fontSize: "0.8rem",
    overflow: "hidden",
    cursor: "pointer",
    "&.expanded": {
      fontWeight: "bold",
    },
    "&:hover": {
      textDecoration: "underline",
    },
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  type: {
    fontSize: "0.7rem",
    fontStyle: "normal",
    textTransform: "uppercase",
    color: "#777",
    marginRight: 4,
  },
  meth: {
    padding: "0 0 0 24px",
  },
  argDesc: {
    padding: "0 0 0 34px",
  },
  methDesc: {
    padding: "0 0 0 32px",
  },
  text: {
    width: 620,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    transition: "width 0.2s linear",
    "&.collapsed": {
      width: 0,
      overflow: "hidden",
    },
  },
  TextField: {
    fontSize: ".9rem",
    "& .MuiOutlinedInput-root": {
      fontFamily: "monospace",
      fontSize: ".9rem",
    },
  },
  border: {
    border: "solid 1px #ddd",
  },
  limited: {
    height: "calc(100vh - 240px)",
    overflow: "auto",
  },
  ul: {
    width: "100%",
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "0.9rem",
    transition: "width 0.2s linear",
    "& li": {
      backgroundColor: "#fff",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      margin: 0,
      "&.odd": {
        backgroundColor: "#f3f3f3",
      },
      "&.last": {
        borderBottom: "none",
      },
    },
    "&.collapsed": {
      width: 320,
    },
  },
  stringCode: { color: green[600] },
  numberCode: { color: deepOrange[600] },
  booleanCode: { color: blue[900], fontWeight: 600 },
  nullCode: { color: orange[600] },
  keyCode: { color: red[800] },
  check: {
    color: green[600],
    fontSize: "16px !important",
  },
  pencil: {
    color: blue[600],
    fontSize: "16px !important",
  },
  selected: {
    fontWeight: "bold",
    color: green[600] + " !important",
  },
  Tab: {
    textTransform: "none !important",
  },
  Tabs: {
    marginLeft: 12,
  },
}));
