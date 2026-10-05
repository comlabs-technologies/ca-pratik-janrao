"use client";

import { useState } from "react";
import { ImagePlus, X } from "lucide-react";

export function ImageField({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error ?? "Upload failed");
      setValue(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-image-field">
      <input type="hidden" name={name} value={value} />
      {value ? (
        <div className="adm-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" />
          <button type="button" onClick={() => setValue("")} aria-label="Remove image"><X size={14} /></button>
        </div>
      ) : null}
      <label className="adm-btn">
        <ImagePlus size={15} /> {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      </label>
      {error ? <p className="adm-alert">{error}</p> : null}
    </div>
  );
}
