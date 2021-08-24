/* tango-associate-ui/src/components/Dev/CodeCommentGrid/CodeCommentGrid.js
 *  Auto-generate comments for tango components (requires code-comment-api)
 */
import React, { useCallback, useEffect, useState } from "react";
import { Chip, IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import ModalSnackBar, {
  ModalSnackBarConfig,
} from "../ModalSnackBar/ModalSnackBar";
import { jcss } from "../../utils";
import { JsonColor } from "../JsonColor";
import { DialogConfig, ConfirmDrawer } from "../ConfirmDialog/ConfirmDialog";
import { LocalDb, setupDb } from "../../app/LocalDb";
import { CACHE_TABLE_DEF } from "../../app/Constants";
import CommentToolbar from "../Toolbar/Toolbar";
import WaitingSpinner, {
  SpinnerAction,
} from "../WaitingSpinner/WaitingSpinner";
import { CodeCommentGridStyles } from "./CodeCommentGrid.classes";
import FileRow from "./FileRow/FileRow";
import AppTabs from "./AppTabs/AppTabs";
import CommentGridFooter from "./CommentGridFooter/CommentGridFooter";
import CommentFileViewer from "./CommentFileViewer/CommentFileViewer";
import { useCodeCommentConnector } from "../../app/CommentController";

/**
 * [renders the CodeCommentGrid component]
 *
 */
const CodeCommentGrid = () => {
  const classes = CodeCommentGridStyles();
  const [modalProps, setModalProps] = useState({ open: false });
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState(0);
  const [files, setFiles] = useState([]);
  const [param, setParam] = useState("");
  const [markupIndex, setMarkupIndex] = useState(0);
  const [markup, setMarkup] = useState("");
  const [bar, setBar] = useState({ open: false });
  const [tabValue, setTabValue] = useState(2);
  const [codeCommentCollection, setCodeCommentCollection] = useState(
    '[{message:"loading..."}]'
  );
  const say = ModalSnackBarConfig(setBar);
  const set = DialogConfig(setModalProps);

  const getSelectedNode = (x, docs) => {
    let z = -1;
    docs.map((n, i) => n.file && n.file === x && (z = i));
    return z;
  };
  const store = async (datum) => {
    const table = CACHE_TABLE_DEF.name;
    const found = await LocalDb.selectOne(table, datum.path);
    const action = !found
      ? LocalDb.insert(table, [datum])
      : LocalDb.updateOne(table, datum.path, { ...datum });
    return await action;
  };

  const resetItems = useCallback(() => {
    LocalDb.select(CACHE_TABLE_DEF.name).then((c) => {
      setCodeCommentCollection(JSON.stringify(c, undefined, 2));
      SpinnerAction.next(false);
    });
  }, []);

  const serialize = useCallback(
    (d) => {
      setupDb().then((count) => console.log(`${count} items in the list`));
      function run() {
        if (!d.length) return resetItems();
        store(d.shift()).then(run);
      }
      SpinnerAction.next(true);
      run();
    },
    [resetItems]
  );

  /**
   * [changes tab index]
   *
   * @param event event passed from the Tabs component
   * @param newValue new tab index
   */
  const postChange = (event, newValue) => {
    setPage(0);
    setTabValue(newValue);
  };

  /**
   * [copies comment code to clipboard]
   *
   */
  const copy = () => {
    navigator.clipboard
      .writeText(codeCommentCollection)
      .then(() => say("code was copied.", "bottom", "left").then(console.log))
      .catch(console.warn);
  };

  /**
   * [commits comment collection to server db]
   *
   */
  const remove = () => {
    const file = files[markupIndex];
    const docs = files.filter((f) => f.file !== file.file);
    setFiles(docs);
    !!docs.length && setMarkup(docs[0].markup);
    setMarkupIndex(0);
    !docs.length &&
      (function () {
        setMarkup("");
        setCollapsed(false);
      })();
  };
  const connector = useCodeCommentConnector();
  const update = () => {
    connector.update().then((res) => {
      const file = files[markupIndex];
      SpinnerAction.next(false);
      !!markup?.length && !!file && edit(file.file);
    });
  };
  const edit = (file) => {
    connector.edit(file).then((res) => {
      const docs = files
        .filter((f) => f.file !== file)
        .concat({ file, markup: res.response });
      setMarkup(res.response);
      setFiles(docs);
      setMarkupIndex(getSelectedNode(file, docs));
    });
  };
  const download = useCallback(() => {
    connector.download().then((data) => {
      serialize(data);
      setCodeCommentCollection(JSON.stringify(data, undefined, 2));
      SpinnerAction.next(false);
    });
  }, [serialize, connector]);
  const CommentGridArgs = {
    page,
    setPage,
    set,
    param,
    setParam,
    collapsed,
    setCollapsed,
    edit,
    remove,
    markup,
    files,
    setMarkup,
    markupIndex,
    setMarkupIndex,
    json: codeCommentCollection,
    update: setCodeCommentCollection,
  };

  const content = [
    <CommentGrid {...CommentGridArgs} />,
    <CommentGrid {...CommentGridArgs} omitted />,
    <fieldset>
      <legend>
        Raw JSON
        <IconButton onClick={copy}>
          <FileCopy />
        </IconButton>
      </legend>
      <pre
        className={classes.pre}
        dangerouslySetInnerHTML={{
          __html: JsonColor(codeCommentCollection, classes),
        }}
      />
    </fieldset>,
  ];

  useEffect(() => {
    download();
  }, [download]);
  const CommentToolbarArgs = {
    param,
    setParam: (v) => {
      setParam(v);
      setPage(0);
    },
    download,
    sync: update,
  };
  return (
    <>
      <CommentToolbar {...CommentToolbarArgs} />
      <div
        className={jcss({ [classes.CodeCommentGrid]: !0, collapsed })}
        data-testid="test-for-CodeCommentGrid"
      >
        <AppTabs param={param} tabValue={tabValue} postChange={postChange} />
        {content[tabValue]}
        <ConfirmDrawer {...modalProps} />
        <ModalSnackBar {...bar} />
        <WaitingSpinner />
      </div>
    </>
  );
};

/**
 * [renders the CommentGrid component]
 *
 * @param json comment json
 * @param update json update callback method
 * @param omitted true when only omitted files should be shown
 */
function CommentGrid({
  omitted,
  set,
  page,
  param,
  setParam,
  setPage,
  collapsed,
  setCollapsed,
  setMarkup,
  markup,
  files,
  edit,
  remove,
  markupIndex,
  setMarkupIndex,
}) {
  const [hide, setHide] = useState(false);
  const classes = CodeCommentGridStyles();
  const [items, setItems] = useState([]);
  const resetItems = useCallback(() => {
    SpinnerAction.next(true);
    LocalDb.select(CACHE_TABLE_DEF.name).then((d) => {
      SpinnerAction.next(false);
      setItems(d);
    });
  }, []);

  useEffect(() => {
    !items?.length && resetItems();
  }, [resetItems, items]);

  if (!items?.filter) {
    return <em>unable to parse items</em>;
  }

  /**
   * [expand selected node]
   *
   * @param f node to expand
   */
  const expand = async (f) => {
    const state = await LocalDb.selectOne(CACHE_TABLE_DEF.name, f.path);
    await LocalDb.updateOne(CACHE_TABLE_DEF.name, f.path, {
      expanded: !state?.expanded,
    });
    resetItems();
    !state?.expanded && edit(f.path);
  };

  /**
   * [set value of selected node]
   *
   * @param fn node filter function
   * @param f field to update
   * @param v value to set
   */
  const setNodeValue = async (fn, f, v) => {
    await LocalDb.update(CACHE_TABLE_DEF.name, fn, { [f]: v });
    resetItems();
  };

  /**
   * [fires when a method description is changed]
   *
   * @param path file path
   * @param meth method name
   * @param desc method description
   */
  const handleMethChange = async (path, meth, desc) => {
    const updated = await LocalDb.selectOne(CACHE_TABLE_DEF.name, path);
    updated.methods.map((m) => {
      m.name === meth && (m.desc = desc);
      return m;
    });
    await LocalDb.updateOne(CACHE_TABLE_DEF.name, path, updated);
    resetItems();
  };

  /**
   * [fires when an argument description is changed]
   *
   * @param path file path
   * @param meth method name
   * @param arg argument name
   * @param des argument description
   */
  const handleArgChange = (path, meth, arg, des) => {
    Prompt(`Enter description for ${meth}.${arg}`, des).then((desc) =>
      setArgProp(path, meth, arg, "desc", desc)
    );
  };
  const Prompt = (text, value) => set(text, "set value", <i />, value);

  /**
   * [sets the properties of an argument]
   *
   * @param path file path
   * @param meth method name
   * @param arg argument name
   * @param prop property to set
   * @param value property value
   */
  const setArgProp = async (path, meth, arg, prop, value) => {
    const updated = await LocalDb.selectOne(CACHE_TABLE_DEF.name, path);
    updated.methods.map((m) => {
      m.name === meth &&
        m.args.map((a) => {
          a.name === arg && (a[prop] = value);
          return m;
        });
      return m;
    });
    await LocalDb.updateOne(CACHE_TABLE_DEF.name, path, updated);
    resetItems();
  };

  /**
   * [true when all argument properties are set ]
   *
   * @param a argument node
   */
  const validArg = (a) => !!a.desc;

  /**
   * [true when all method properties are set ]
   *
   * @param m method node
   */
  const validMeth = (m) =>
    !!m.desc?.length && m.args?.filter((f) => !validArg(f)).length === 0;

  /**
   * [true when all file properties are set ]
   *
   * @param m file node
   */
  const validFile = (m) => {
    return !!m.desc && m.methods?.filter((f) => !validMeth(f)).length === 0;
  };

  const filters = [
    {
      what: (f) => !!f.omit,
      when: omitted,
    },
    {
      what: (f) => !f.omit,
      when: !omitted,
    },
    {
      what: (f) => !validFile(f) && !f.omit,
      when: !!hide,
    },
    {
      what: (f) =>
        f.path.split("/").pop().toLowerCase().indexOf(param.toLowerCase()) > -1,
      when: !!param?.length,
    },
  ];

  let filter = filters.filter((f) => !!f.when).pop().what; // omitted ? (f) => !!f.omit : (f) => !f.omit;
  !!hide && (filter = (f) => !validFile(f) && !f.omit);
  const shown = items?.filter(filter);
  const count = shown.length;
  const valid = shown?.filter((f) => validFile(f)).length;
  const progress = (valid / count) * 100;
  const most = 15;
  const view = items?.filter(filter);

  const gotoPage = (i) => setPage((x) => x + i);
  const less = view.slice(page * most, page * most + most);
  const PageArgs = {
    startPage: page * most,
    pageSize: most,
    collection: view,
    gotoPage,
  };

  const postChange = (event, newValue) => {
    if (newValue === files.length) {
      return remove();
    }
    setMarkupIndex(newValue);
    const f = files[newValue];
    setMarkup(f.markup);
  };

  const inlineMethChange = (file, meth) => {
    Prompt(`Enter description for ${meth.name}`, meth.desc).then((desc) =>
      handleMethChange(file.path, meth.name, desc)
    );
  };
  const iifMethChange = (file, meth) => {
    !meth?.desc?.length &&
      handleMethChange(
        file.path,
        meth.name,
        `renders the ${meth.name} component`
      );
    collapsed && !!markup && inlineMethChange(file, meth);
  };
  return (
    <>
      {!!param && (
        <Chip
          color="secondary"
          size="small"
          onDelete={() => setParam("")}
          label={<> files like "{param}"</>}
        />
      )}

      <div className={classes.flexBase}>
        <ul
          className={jcss({
            [classes.ul]: !0,
            [classes.border]: !0,
            [classes.limited]: !0,
            collapsed: collapsed && !!markup,
          })}
        >
          {less?.map((file, i) => (
            <FileRow
              key={i}
              file={file}
              collapsed={collapsed}
              markup={markup}
              set={set}
              odd={i % 2 !== 0}
              last={i === less?.length - 1}
              iifMethChange={iifMethChange}
              handleMethChange={handleMethChange}
              setArgProp={setArgProp}
              handleArgChange={handleArgChange}
              setNodeValue={setNodeValue}
              validFile={validFile}
              expand={expand}
            />
          ))}
        </ul>

        {!!collapsed && !!markup && (
          <CommentFileViewer
            files={files}
            postChange={postChange}
            markupIndex={markupIndex}
            markup={markup}
          />
        )}
      </div>

      <CommentGridFooter
        collapsed={collapsed}
        progress={progress}
        PageArgs={PageArgs}
        count={count}
        valid={valid}
        param={param}
        hide={hide}
        setHide={setHide}
        setPage={setPage}
        setCollapsed={setCollapsed}
      />
    </>
  );
}

CodeCommentGrid.defaultProps = {};
export default CodeCommentGrid;
