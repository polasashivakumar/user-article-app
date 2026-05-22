import {
  cardClass,
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
} from "../styles/common";

function AdminDashboard() {
  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <div className={`${cardClass} max-w-3xl`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Administration</p>
          <h2 className={headingClass}>Admin Dashboard</h2>
          <p className={`${bodyText} mt-3`}>
            Centralized moderation, article oversight, and user management can live here once the admin flows are wired in.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;