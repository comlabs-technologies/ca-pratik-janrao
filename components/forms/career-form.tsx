"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

const roles = ["Articleship", "Internship", "Employee", "Professional"] as const;
const formEnabled = process.env.NEXT_PUBLIC_CAREER_FORM_ENABLED === "true";

export function CareerForm() {
  const [role, setRole] = useState<(typeof roles)[number]>("Articleship");

  return (
    <div className="enquiry-panel career-form">
      {!formEnabled ? (
        <p className="form-note">
          Resume upload is not yet configured. Please email your CV to{" "}
          <a href={`mailto:${site.emails[1]}?subject=Career%20application`}>{site.emails[1]}</a> with the role in the subject line.
        </p>
      ) : null}

      <form action={formEnabled ? "/api/careers" : `mailto:${site.emails[1]}`} method={formEnabled ? "post" : "post"} encType={formEnabled ? "multipart/form-data" : "text/plain"}>
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
        <button className="submit-button" type="submit">
          {formEnabled ? "Submit application" : "Open email draft"} <ArrowRight size={16} />
        </button>
      </form>
      <p className="form-privacy">By submitting, you consent to the firm reviewing your details for recruitment purposes only.</p>
    </div>
  );
}
