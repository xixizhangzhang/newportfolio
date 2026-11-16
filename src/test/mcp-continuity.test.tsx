import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import McpContinuityPrinciple from "../components/McpContinuityPrinciple";

describe("Continuity across surfaces", () => {
  it("disables Submit before receipt upload and enables simulated submission after upload", () => {
    render(<McpContinuityPrinciple />);
    const chat = within(screen.getByRole("region", { name: "Copilot continuity example" }));
    fireEvent.click(chat.getByRole("button", { name: "Review expense" }));
    expect(within(screen.getByRole("dialog")).getByRole("button", { name: "Submit" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Close continuity review" }));
    fireEvent.click(chat.getByRole("button", { name: "Upload receipt" }));
    fireEvent.click(chat.getByRole("button", { name: "Review expense" }));
    const panel = within(screen.getByRole("dialog"));
    expect(panel.getByRole("button", { name: "Submit" })).toBeEnabled();
    fireEvent.click(panel.getByRole("button", { name: "Submit" }));
    expect(panel.getByRole("button", { name: "Submitted" })).toBeDisabled();
  });
  it("carries a receipt uploaded in chat into the review panel and retains it on reopening", () => {
    render(<McpContinuityPrinciple />);
    const chat = within(screen.getByRole("region", { name: "Copilot continuity example" }));
    fireEvent.click(chat.getByRole("button", { name: "Upload receipt" }));
    expect(chat.getByRole("button", { name: "Receipt uploaded" })).toBeDisabled();
    fireEvent.click(chat.getByRole("button", { name: "Review expense" }));
    expect(within(screen.getByRole("dialog")).getByRole("status")).toHaveTextContent("Receipt uploaded");
    expect(within(screen.getByRole("dialog")).getByText("Hyatt-Regency-receipt.pdf")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close continuity review" }));
    fireEvent.click(chat.getByRole("button", { name: "Review expense" }));
    expect(within(screen.getByRole("dialog")).getByRole("status")).toHaveTextContent("Receipt uploaded");
  });
  it("preserves draft edits, selection and filter when returning from the pane", () => {
    render(<McpContinuityPrinciple />);
    fireEvent.click(screen.getByRole("button", { name: "Review expense" }));
    const pane = within(screen.getByRole("dialog"));
    fireEvent.change(pane.getByLabelText("Draft cost center"), { target: { value: "Marketing" } });
    fireEvent.change(pane.getByLabelText("Expense filter"), { target: { value: "All open expenses" } });
    fireEvent.click(pane.getByRole("checkbox"));
    fireEvent.click(pane.getByRole("button", { name: "Close continuity review" }));
    const chat = within(screen.getByRole("region", { name: "Copilot continuity example" }));
    expect(chat.getByLabelText("Draft cost center")).toHaveValue("Marketing");
    expect(chat.getByLabelText("Expense filter")).toHaveValue("All open expenses");
    expect(chat.getByRole("checkbox")).not.toBeChecked();
  });
});