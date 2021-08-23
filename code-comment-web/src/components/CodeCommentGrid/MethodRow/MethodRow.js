import React from "react";
import ArgumentRow from "../ArgumentRow/ArgumentRow";
import { jcss } from "../../../utils";
import TextBox from "../../TextBox/TextBox";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const MethodRow = ({
  file,
  meth,
  iifMethChange,
  handleMethChange,
  collapsed,
  markup,
  set,
  setArgProp,
  handleArgChange,
  odd,
  last,
}) => {
  const classes = CodeCommentGridStyles();
  return (
    <>
      <li className={jcss({ odd, last })}>
        <div
          className={jcss({
            [classes.flex]: !0,
            [classes.path]: !0,
          })}
        >
          <div
            onClick={() => {
              iifMethChange(file, meth);
            }}
            className={jcss({
              [classes.file]: !0,
              [classes.meth]: !0,
              [classes.nowrap]: !0,
            })}
          >
            &#119891; <b>{meth.name}</b>
          </div>
          <div
            className={jcss({
              [classes.text]: !0,
              collapsed: collapsed && !!markup,
            })}
          >
            <TextBox
              fullWidth
              variant="standard"
              onChange={(e) => handleMethChange(file.path, meth.name, e)}
              placeholder={`[enter description for ${meth.name}]`}
              size="small"
              initial={meth.desc}
              set={set}
            />
          </div>
        </div>
        {/* arguments { arg, file, meth, setArgProp, handleArgChange } */}
        <ul className={classes.ul}>
          {meth?.args?.map((arg, g) => (
            <ArgumentRow
              key={g}
              arg={arg}
              file={file}
              meth={meth}
              setArgProp={setArgProp}
              handleArgChange={handleArgChange}
            />
          ))}
        </ul>
      </li>
    </>
  );
};

MethodRow.defaultProps = {};
export default MethodRow;
