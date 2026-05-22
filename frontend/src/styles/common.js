// src/styles/common.js
// Shared Tailwind tokens for a premium editorial-style interface.

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_42%,_#f8fafc_100%)] text-slate-900"
export const pageWrapper = "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
export const section = "mb-10"
export const surfaceClass = "rounded-[1.75rem] border border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl"

// ─── Cards ────────────────────────────────────────────
export const cardClass = `${surfaceClass} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-44px_rgba(15,23,42,0.55)]`

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
export const headingClass = "text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
export const subHeadingClass = "text-lg font-semibold tracking-tight text-slate-900"
export const bodyText = "text-slate-600 leading-7"
export const mutedText = "text-sm text-slate-500"
export const linkClass = "text-sky-700 transition hover:text-sky-900"

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn = "inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer"
export const secondaryBtn = "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 cursor-pointer"
export const ghostBtn = "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 cursor-pointer"

// ─── Forms ────────────────────────────────────────────
export const formCard = `${surfaceClass} mx-auto w-full max-w-xl p-6 sm:p-8`
export const formTitle = "text-2xl font-semibold tracking-tight text-slate-950"
export const labelClass = "mb-1.5 block text-sm font-medium text-slate-600"
export const inputClass = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
export const formGroup = "mb-4"
export const submitBtn = "inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer"

// ─── Navbar ───────────────────────────────────────────
export const navbarClass = "sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150"
export const navContainerClass = "mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
export const navBrandClass = "inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950"
export const navLinksClass = "flex items-center gap-2 sm:gap-3"
export const navLinkClass = "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
export const navLinkActiveClass = "rounded-full px-4 py-2 text-sm font-medium text-sky-700 bg-sky-50"

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
export const articleCardClass = `${surfaceClass} flex h-full flex-col gap-3 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-44px_rgba(15,23,42,0.55)] cursor-pointer`
export const articleTitle = "text-lg font-semibold leading-snug tracking-tight text-slate-950"
export const articleExcerpt = "text-sm leading-6 text-slate-600"
export const articleMeta = "text-xs font-medium text-slate-500"
export const articleBody = "max-w-3xl text-[0.98rem] leading-8 text-slate-600"
export const timestampClass = "flex items-center gap-2 text-xs text-slate-500"
export const tagClass = "inline-flex w-fit rounded-full bg-sky-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-700"

// ─── Feedback ─────────────────────────────────────────
export const errorClass = "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
export const successClass = "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
export const loadingClass = "py-10 text-center text-sm text-sky-700 animate-pulse"
export const emptyStateClass = "py-16 text-center text-sm text-slate-500"

// ─── Divider ──────────────────────────────────────────
export const divider = "my-10 border-t border-slate-200"