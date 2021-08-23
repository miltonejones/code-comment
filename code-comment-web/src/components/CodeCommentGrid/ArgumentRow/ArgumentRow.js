import React from "react";
import TypeMenu from "../../TypeMenu/TypeMenu";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const ArgumentRow = ({ arg, file, meth, setArgProp, handleArgChange }) => {
  const classes = CodeCommentGridStyles();
  return (
    <>
      <li>
        <div className={classes.meth}>
          <div>
            <TypeMenu
              arg={arg}
              setValue={(t) => {
                setArgProp(file.path, meth.name, arg.name, "type", t);
              }}
            />
            <em className={classes.type}>{arg.type}</em>{" "}
            <span
              onClick={() =>
                handleArgChange(file.path, meth.name, arg.name, arg.desc)
              }
            >
              {arg.name}
            </span>
          </div>
          <small className={classes.methDesc}>{arg.desc}</small>
        </div>
      </li>
    </>
  );
};

ArgumentRow.defaultProps = {};
export default ArgumentRow;
