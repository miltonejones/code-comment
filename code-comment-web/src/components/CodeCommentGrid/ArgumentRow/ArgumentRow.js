import React from "react";
import TypeMenu from "../../TypeMenu/TypeMenu";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const ArgumentRow = ({ arg, file, meth, setArgProp, handleArgChange }) => {
  const classes = CodeCommentGridStyles();
  return (
    <>
      <li>
        <div className={classes.meth}>
          <div className={classes.ArgButton}>
            <em className={classes.type}>{arg.type}</em>{" "}
            <div
              className="argName"
              onClick={() =>
                handleArgChange(file.path, meth.name, arg.name, arg.desc)
              }
            >
              {arg.name}
            </div>
            <div className="argMenu">
              <TypeMenu
                arg={arg}
                setValue={(t) => {
                  setArgProp(file.path, meth.name, arg.name, "type", t);
                }}
              />
            </div>
          </div>
          <small className={classes.argDesc}>{arg.desc}</small>
        </div>
      </li>
    </>
  );
};

ArgumentRow.defaultProps = {};
export default ArgumentRow;
