import React, { useEffect, useState } from "react";
import { useCodeCommentConnector } from "../../../app/CommentController";
import CommentFileViewer from "./CommentFileViewer";
import data from "../../../stories/assets/actual.json";

export default {
  title: "CommentFileViewer",
  component: CommentFileViewer,
};

const Template = (args) => {
  const [markupIndex, setMarkupIndex] = useState(0);
  const [markup, setMarkup] = useState("");
  const [files, setFiles] = useState([]);
  const connector = useCodeCommentConnector();
  useEffect(() => {
    const file = data[12];
    connector.edit(file.path).then((res) => {
      setMarkup(res.response);
      setFiles([{ file: file.path, markup: res.response }]);
      setMarkupIndex(0);
    });
  }, [args, connector]);
  const props = { markupIndex, markup, files };
  return <CommentFileViewer {...args} {...props} />;
};

export const DefaultView = Template.bind({});
DefaultView.args = {};
