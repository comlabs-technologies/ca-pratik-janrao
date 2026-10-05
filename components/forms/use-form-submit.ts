"use client";

import { useState, type FormEvent } from "react";

type State = { phase: "idle" | "sending" | "success" | "error"; message?: string };

/** Posts a form to `endpoint` with fetch and tracks the outcome. */
export function useFormSubmit(endpoint: string, successMessage: string) {
  const [state, setState] = useState<State>({ phase: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ phase: "sending" });
    try {
      const response = await fetch(endpoint, { method: "POST", body: new FormData(form) });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      form.reset();
      setState({ phase: "success", message: successMessage });
    } catch (error) {
      setState({ phase: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    }
  }

  return { state, onSubmit };
}
