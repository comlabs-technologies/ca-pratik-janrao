"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { useFormSubmit } from "./use-form-submit";

const roles = ["Articleship", "Internship", "Employee", "Professional"] as const;
// Applications are stored by /api/careers; set to "false" to fall back to a mailto draft.
const formEnabled = process.env.NEXT_PUBLIC_CAREER_FORM_ENABLED !== "false";

export function CareerForm() {
  const [role, setRole] = useState<(typeof roles)[number]>("Articleship");
  const { state, onSubmit } = useFormSubmit("/api/careers", "Thank you. Your application has been received and will be reviewed by the team.");

  return (
    <div className="enquiry-panel career-form">
      {!formEnabled ? (
        <p className="form-note">
          Resume upload is not yet configured. Please email your CV to{" "}
          <a href={`mailto:${site.emails[1]}?subject=Career%20application`}>{site.emails[1]}</a> with the role in the subject line.
        </p>
      ) : null}

      <form {...(formEnabled ? { onSubmit } : { action: `mailto:${site.emails[1]}`, method: "post", encType: "text/plain" })}>
        <label>
          <span>Role</span>
          <select name="role" value={role} onChange={(event) => setRole(event.target.value as (typeof roles)[number])} required>
            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Your full name" required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" required />
        </label>
        <label className="full-width">
          <span>Message</span>
          <textarea name="message" rows={4} placeholder="Tell us about your background and the role you are interested in" required />
        </label>
        {formEnabled ? (
          <label className="full-width">
            <span>Resume</span>
            <input name="resume" type="file" accept=".pdf,.doc,.docx" />
            <small>PDF or Word document, up to 5 MB.</small>
          </label>
        ) : null}
        <div className="visually-hidden" aria-hidden="true">
          <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {state.message ? (
          <p className={`form-status ${state.phase === "success" ? "is-success" : "is-error"}`} role="status">
            {state.message}
          </p>
        ) : null}
        <button className="submit-button" type="submit" disabled={state.phase === "sending"}>
          {state.phase === "sending" ? "Sending…" : <>{formEnabled ? "Submit application" : "Open email draft"} <ArrowRight size={16} /></>}
        </button>
      </form>
      <p className="form-privacy">By submitting, you consent to the firm reviewing your details for recruitment purposes only.</p>
    </div>
  );
}
