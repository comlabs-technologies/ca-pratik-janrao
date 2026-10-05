import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { adminConfigured, isAdmin } from "@/lib/admin/auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <div className="adm-brand">
          <span className="adm-brand-mark">PJA</span>
          <span>Admin</span>
        </div>
        <h1>Sign in</h1>
        <p className="adm-muted">Manage enquiries, blogs and case studies.</p>
        {adminConfigured() ? null : <p className="adm-alert">ADMIN_PASSWORD is not set, so sign-in is disabled. See the README.</p>}
        <LoginForm />
      </div>
    </div>
  );
}
