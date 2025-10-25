import React from "react";
// If header has a Logo component, import it (update path accordingly):
// import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-[#F7FAFD]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {/* If you have <Logo />, use it: <Logo /> */}
              {/* Otherwise paste the same <img>/<svg> used in header: */}
              <img 
                src="/lovable-uploads/dedb8a29-3bfd-47fd-87aa-3442ff73939d.png" 
                alt="Smart Brain TLC" 
                className="h-[96px] w-auto" 
                width={288}
                height={96}
              />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-900">Enroll One, Empower Two.</p>
            <p className="mt-2 text-sm text-slate-600">
              To democratize education and empower communities by offering affordable tutoring and
              creating opportunities for underprivileged learners.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="/#learn" className="hover:text-slate-900">Learn</a></li>
              <li><a href="/#programs" className="hover:text-slate-900">Programs</a></li>
              <li><a href="/#get-involved" className="hover:text-slate-900">Get Involved</a></li>
              <li><a href="/#support" className="hover:text-slate-900">Support</a></li>
              <li><a href="/pricing" className="hover:text-slate-900">Pricing &amp; Credits</a></li>
              <li><a href="/sponsors" className="hover:text-slate-900">Sponsors / Partner With Us</a></li>
              <li><a href="/tutors" className="hover:text-slate-900">Tutors</a></li>
              <li><a href="/faq" className="hover:text-slate-900">FAQ</a></li>
              <li><a href="/contact" className="hover:text-slate-900">Contact</a></li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="/legal/terms" className="hover:text-slate-900">Terms</a></li>
              <li><a href="/legal/privacy" className="hover:text-slate-900">Privacy</a></li>
              <li><a href="/legal/refund" className="hover:text-slate-900">Refund</a></li>
              <li><a href="/legal/accessibility" className="hover:text-slate-900">Accessibility</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div aria-label="Contact">
            <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <span className="block font-medium text-slate-700">US Office</span>
                5830 E 2nd St, Ste 7000, Casper, WY 82609, USA<br />
                <span className="text-slate-700">+1 805 317 4524</span>
              </li>
              <li>
                <span className="block font-medium text-slate-700">PH Office</span>
                J and J Arcade Bldg., Lawaan 1, Talisay, Cebu 6045, PH<br />
                <span className="text-slate-700">0908 527 1364</span>
              </li>
              <li className="text-slate-500">Email: <em>coming soon</em></li>
            </ul>
          </div>

          {/* Follow us */}
          <div aria-label="Follow us">
            <h3 className="text-sm font-semibold text-slate-900">Follow</h3>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://www.instagram.com/smartbrainlearning/" target="_blank" rel="noopener" aria-label="Instagram" className="p-2 rounded-full bg-white shadow ring-1 ring-slate-200 hover:shadow-md">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/></svg>
              </a>
              <a href="https://www.facebook.com/sbtlcinc" target="_blank" rel="noopener" aria-label="Facebook" className="p-2 rounded-full bg-white shadow ring-1 ring-slate-200 hover:shadow-md">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7v-3h3.4V9.5c0-3.3 2-5.2 5-5.2 1.5 0 3 .27 3 .27v3.3h-1.7c-1.7 0-2.3 1.1-2.3 2.2V12H18l-.5 3h-2.8v7A10 10 0 0022 12z"/></svg>
              </a>
              {/* Optional placeholders:
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-white shadow ring-1 ring-slate-200 hover:shadow-md">…</a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-full bg-white shadow ring-1 ring-slate-200 hover:shadow-md">…</a>
              */}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {year} Smart Brain TLC, Inc.</p>
          <p>1 credit = 30 minutes</p>
        </div>
      </div>
    </footer>
  );
}