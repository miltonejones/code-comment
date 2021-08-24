import React from "react";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";
import { jcss } from "../../../utils";
import {
  CheckCircle,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  RestoreFromTrash,
} from "@material-ui/icons";
import TextBox from "../../TextBox/TextBox";
import { IconButton } from "@material-ui/core";

/**
 * [displays file path and menu]
 *
 * @param desc file description
 * @param path file path
 * @param onClick click event for file path
 * @param setNodeValue set value method for file desc
 * @param expanded true when file node is expanded
 * @param omitted true when file is omitted
 * @param valid true when all comments are complete for all methods in the file
 */
function PathName({
  desc,
  path,
  onClick,
  setNodeValue,
  expanded,
  omitted,
  valid,
  set,
  collapsed,
}) {
  const classes = CodeCommentGridStyles();
  // const relative = path.replace("tango-associate-ui/src/components", "");
  const name = path?.split("/").pop();

  /**
   * [fires when a file description changes]
   *
   * @param e event passed from the text input
   */
  const handleChange = (e) => {
    // const { value } = e.target;
    setNodeValue((n) => n.path === path, "desc", e);
  };
  const placeholder = `[enter description for ${name}]`;
  const Prompt = (text, value) => set(text, "set value", <i />, value);
  const doEdit = () => {
    Prompt(placeholder, desc).then((value) =>
      setNodeValue((n) => path === n.path, "desc", value)
    );
  };
  return (
    <div
      className={jcss({
        [classes.flex]: !collapsed,
        [classes.flexBase]: collapsed,
        [classes.path]: !0,
      })}
    >
      <div
        onClick={onClick}
        className={jcss({
          [classes.file]: !0,
          [classes.nowrap]: !0,
          expanded,
        })}
      >
        <div
          className={jcss({
            [classes.flex]: !0,
          })}
        >
          {/* expand icon */}
          {expanded ? <ExpandLess /> : <ExpandMore />}
          {/* completion  indicator */}
          {valid && <CheckCircle className={classes.check} />}

          {/* file name */}
          {name}
        </div>

        {/* collapsed description */}
        {!!collapsed && (
          <div style={{ marginLeft: 16, fontWeight: 400 }}>{desc}</div>
        )}
      </div>
      {/* expanded description */}
      <div className={jcss({ [classes.text]: !0, collapsed })}>
        <TextBox
          classes={{ root: classes.TextField }}
          fullWidth
          variant="standard"
          placeholder={`[enter description for ${name}]`}
          onChange={handleChange}
          size="small"
          initial={desc}
          set={set}
        />
      </div>
      <IconButton
        onClick={() => setNodeValue((n) => path === n.path, "omit", !omitted)}
      >
        {omitted ? <RestoreFromTrash /> : <Delete />}
      </IconButton>
      {collapsed && (
        <IconButton onClick={doEdit}>
          <Edit />
        </IconButton>
      )}{" "}
    </div>
  );
}

PathName.defaultProps = {};
export default PathName;
