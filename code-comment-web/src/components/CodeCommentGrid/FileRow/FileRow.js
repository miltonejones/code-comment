import React from "react";
import MethodRow from "../MethodRow/MethodRow";
import ReadinessSectionHeader from "../../ReadinessSectionHeader/ReadinessSectionHeader";
import { jcss } from "../../../utils";
import PathName from "../PathName/PathName";
import { Collapse } from "@material-ui/core";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const FileRow = ({
  file,
  iifMethChange,
  handleMethChange,
  collapsed,
  markup,
  set,
  setArgProp,
  handleArgChange,
  setNodeValue,
  validFile,
  expand,
  odd,
  last,
}) => {
  const classes = CodeCommentGridStyles();
  return (
    <>
      <li className={jcss({ odd, last })}>
        <PathName
          valid={validFile(file)}
          omitted={file.omit}
          setNodeValue={setNodeValue}
          onClick={() => expand(file)}
          {...file}
          set={set}
          collapsed={collapsed && !!markup}
        />
        <Collapse in={file.expanded}>
          <>
            {!!file?.methods?.length && (
              <ReadinessSectionHeader
                className={jcss({
                  [classes.meth]: !0,
                  [classes.keyCode]: !0,
                })}
              >
                methods
              </ReadinessSectionHeader>
            )}
            {/* methods */}
            <ul className={classes.ul}>
              {file?.methods?.map((meth, k) => (
                <MethodRow
                  key={k}
                  file={file}
                  meth={meth}
                  collapsed={collapsed}
                  markup={markup}
                  odd={k % 2 !== 0}
                  last={k === file?.methods?.length - 1}
                  set={set}
                  iifMethChange={iifMethChange}
                  handleMethChange={handleMethChange}
                  setArgProp={setArgProp}
                  handleArgChange={handleArgChange}
                />
              ))}
            </ul>
          </>
        </Collapse>
      </li>
    </>
  );
};

FileRow.defaultProps = {};
export default FileRow;
