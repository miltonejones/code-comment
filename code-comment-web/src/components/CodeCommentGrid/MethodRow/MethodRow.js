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
  const TextBoxArgs = {
    onChange: (e) => handleMethChange(file.path, meth.name, e),
    placeholder: `[enter description for ${meth.name}]`,
    initial: meth.desc,
    set: set,
  };
  return (
    <>
      <li className={jcss({ odd, last, [classes.MethodRow]: 1 })}>
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
            {/* method name */}
            &#119891; <b>{meth.name}</b>
          </div>

          {/* description textbox */}

          <div
            className={jcss({
              [classes.text]: !0,
              collapsed: collapsed && !!markup,
            })}
          >
            <TextBox {...TextBoxArgs} />
          </div>
        </div>

        {!!collapsed && (
          <div className={classes.methDesc}>
            {" "}
            <TextBox {...TextBoxArgs} small />
          </div>
        )}
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
