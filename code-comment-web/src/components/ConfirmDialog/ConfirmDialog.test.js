import themify from "./../../render.js";
import React from "react";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import ConfirmDialog, { DialogConfig } from "./ConfirmDialog";

afterEach(() => cleanup());

describe("<ConfirmDialog/>", () => {
  it("ConfirmDialog mounts without failing", () => {
    themify(<ConfirmDialog />);
    expect(screen.getByTestId("ConfirmDialog")).toBeInTheDocument();
  });
  it("ConfirmDialog can be configured", () => {
    const state = {};
    const setState = (updated) => {
      Object.assign(state, updated);
      const { getByTestId } = themify(<ConfirmDialog {...state} />);
      fireEvent.keyUp(getByTestId("ConfirmDialogTextField", { code: 13 }));
      fireEvent.click(getByTestId("ConfirmDialogYes"));
    };
    const update = DialogConfig(setState);

    update("Body", "Header", "Footer", "Prompt").then(() => {
      expect(screen.getAllByTestId("ConfirmDialogYes").length).toBeGreaterThan(
        0
      );
    });
  });

  it("ConfirmDialog can be closed", () => {
    const state = {};
    const setState = (updated) => {
      Object.assign(state, updated);
      const { getByTestId } = themify(<ConfirmDialog {...state} />);
      fireEvent.click(getByTestId("ConfirmDialogNo"));
    };
    const update = DialogConfig(setState);

    update("Body", "Header", "Footer", "Prompt").then(() => {
      expect(screen.getAllByTestId("ConfirmDialogNo").length).toBeGreaterThan(
        0
      );
    });
  });
});
