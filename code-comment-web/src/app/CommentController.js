import React from "react";
import { SpinnerAction } from "../components/WaitingSpinner/WaitingSpinner";
import { CACHE_TABLE_DEF } from "./Constants";
import { LocalDb } from "./LocalDb";

const ENDPOINT = "http://localhost:7007/";

export const useCodeCommentConnector = () => {
  const apiMemoized = React.useMemo(
    () => ({
      update: () => {
        return new Promise((callback) => {
          SpinnerAction.next(true);
          deserialize().then((json) => {
            postData(ENDPOINT, { codeCommentCollection: json }).then((res) => {
              SpinnerAction.next(false);
              callback(res);
            });
          });
        });
      },
      edit: (file) => {
        return new Promise((callback) => {
          SpinnerAction.next(true);
          postData(ENDPOINT, { file }, "PUT").then((res) => {
            SpinnerAction.next(false);
            callback(res);
          });
        });
      },
      download: () => {
        return new Promise((callback) => {
          SpinnerAction.next(true);
          fetch(ENDPOINT, {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              SpinnerAction.next(false);
              callback(data);
            });
        });
      },
    }),
    []
  );
  return apiMemoized;
};

const deserialize = async () => {
  const rows = await LocalDb.select(CACHE_TABLE_DEF.name);
  return JSON.stringify(rows, undefined, 2);
};

const postData = async (url = "", data = {}, method = "POST") => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
