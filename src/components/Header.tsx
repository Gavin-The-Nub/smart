import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

const NAV_ITEMS = [
  { label: "Find Tutors", href: "/find-tutors" },
  {
    label: "Learn",
    href: "#",
    dropdown: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog & Resources", href: "/blog" },
    ],
  },
  {
    label: "Programs",
    href: "#",
    dropdown: [
      { label: "Services", href: "/services" },
      { label: "Pricing & Credits", href: "/pricing" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    label: "Get Involved",
    href: "#",
    dropdown: [
      { label: "Sponsors & Partners", href: "/sponsors" },
      { label: "Tutors – Join Our Team", href: "/tutors" },
    ],
  },
  {
    label: "Support",
    href: "#",
    dropdown: [
      { label: "Contact", href: "legal/contact" },
      { label: "Terms", href: "legal/terms" },
      { label: "Privacy", href: "legal/privacy" },
      { label: "Refund", href: "legal/refund" },
      { label: "Accessibility", href: "legal/accessibility" },
    ],
  },
];

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [dropdownPinned, setDropdownPinned] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const { user, profile, signOut } = useAuth();
  useBodyScrollLock(mobileOpen);

  // Trap focus inside mobile menu when open
  useEffect(() => {
    if (!mobileOpen) return;
    const focusable =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const menu = document.getElementById("mobile-nav-panel");
    if (!menu) return;
    const focusEls = menu.querySelectorAll(focusable);
    if (!focusEls.length) return;
    const first = focusEls[0] as HTMLElement;
    const last = focusEls[focusEls.length - 1] as HTMLElement;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    menu.addEventListener("keydown", trap);
    first.focus();
    return () => menu.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Only one dropdown open at a time
  const handleToggleGroup = useCallback((idx: number) => {
    setMobileAccordion((prev) => (prev === idx ? null : idx));
  }, []);

  // Keyboard and mouse accessibility for desktop dropdowns
  const handleNavKeyDown = (
    e: React.KeyboardEvent,
    idx: number,
    hasDropdown: boolean
  ) => {
    if (!hasDropdown) return;
    if (e.key === "Enter" || e.key === " ") {
      setOpenDropdown(idx);
      setDropdownPinned(idx);
    } else if (e.key === "Escape") {
      setOpenDropdown(null);
      setDropdownPinned(null);
      dropdownRefs.current[idx]?.querySelector("button")?.focus();
    }
  };

  // Close dropdown on blur (keyboard navigation)
  const handleNavBlur = (e: React.FocusEvent, idx: number) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenDropdown(null);
      setDropdownPinned(null);
    }
  };

  // Click outside to close pinned dropdown
  useEffect(() => {
    if (dropdownPinned === null) return;
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRefs.current[dropdownPinned]?.contains(e.target as Node)) {
        setOpenDropdown(null);
        setDropdownPinned(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownPinned]);

  // Keyboard accessibility for mobile panel
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-[60] w-full bg-white/80 backdrop-blur border-b border-slate-100"
    >
      <div className="max-w-[1200px] mx-auto h-16 md:h-20 px-4 md:px-6 flex items-center justify-between gap-4 overflow-visible">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center h-full shrink-0 overflow-hidden"
          aria-label="Home"
        >
          <img
            src="/lovable-uploads/dedb8a29-3bfd-47fd-87aa-3442ff73939d.png"
            alt="Smart Brain Tutorial and Learning Center"
            className="object-contain block max-h-12 sm:max-h-16 md:max-h-20 lg:max-h-[80px] w-auto transition-all duration-200"
            width={240}
            height={80}
          />
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 h-full"
        >
          {NAV_ITEMS.map((item, idx) => {
            const hasDropdown = !!item.dropdown;
            const isOpen = openDropdown === idx;
            const isPinned = dropdownPinned === idx;
            // If no dropdown and has href, render as a direct link
            if (!hasDropdown && item.href) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center h-11 px-2 gap-1 rounded-lg text-base font-medium text-slate-700 hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 transition-colors"
                  style={{ minWidth: 44, minHeight: 44 }}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div
                key={item.label}
                className="relative flex items-center h-full"
                ref={(el) => (dropdownRefs.current[idx] = el)}
                onMouseEnter={() =>
                  hasDropdown && !isPinned && setOpenDropdown(idx)
                }
                onMouseLeave={() =>
                  hasDropdown && !isPinned && setOpenDropdown(null)
                }
                onFocus={hasDropdown ? () => setOpenDropdown(idx) : undefined}
                onBlur={hasDropdown ? (e) => handleNavBlur(e, idx) : undefined}
                tabIndex={-1}
              >
                <button
                  type="button"
                  className="flex items-center h-11 px-2 gap-1 rounded-lg text-base font-medium text-slate-700 hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 transition-colors"
                  aria-haspopup={hasDropdown ? "menu" : undefined}
                  aria-expanded={isOpen}
                  aria-controls={hasDropdown ? `nav-popover-${idx}` : undefined}
                  tabIndex={0}
                  onClick={() => {
                    if (hasDropdown) {
                      setOpenDropdown(idx);
                      setDropdownPinned(isPinned ? null : idx);
                    }
                  }}
                  onKeyDown={(e) => handleNavKeyDown(e, idx, hasDropdown)}
                  style={{ minWidth: 44, minHeight: 44 }}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={
                        isOpen
                          ? "rotate-180 transition-transform"
                          : "transition-transform"
                      }
                    />
                  )}
                </button>
                {/* Dropdown Popover */}
                {hasDropdown && (
                  <ul
                    id={`nav-popover-${idx}`}
                    className={`absolute left-0 top-full mt-2 z-50 min-w-[240px] rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-2 transition-all duration-200 ease-in-out ${
                      isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    aria-hidden={!isOpen}
                    style={{
                      visibility: isOpen ? "visible" : "hidden",
                    }}
                  >
                    {item.dropdown.map((sub) => (
                      <li key={sub.label}>
                        {sub.href === "/pricing" ||
                        sub.href === "/sponsors" ||
                        sub.href === "/tutors" ||
                        sub.href === "/about" ||
                        sub.href === "/services" ||
                        sub.href === "/faq" ||
                        sub.href === "/blog" ||
                        sub.href === "/contact" ||
                        sub.href === "/find-tutors" ? (
                          <Link
                            to={sub.href}
                            className="block px-4 py-2 text-base text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] rounded-lg transition-colors"
                            tabIndex={0}
                            style={{ minWidth: 44, minHeight: 44 }}
                            onClick={() => {
                              setOpenDropdown(null);
                              setDropdownPinned(null);
                            }}
                          >
                            {sub.label}
                          </Link>
                        ) : (
                          <a
                            href={sub.href}
                            className="block px-4 py-2 text-base text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] rounded-lg transition-colors"
                            tabIndex={0}
                            style={{ minWidth: 44, minHeight: 44 }}
                            onClick={() => {
                              setOpenDropdown(null);
                              setDropdownPinned(null);
                            }}
                          >
                            {sub.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50">
                <User className="w-4 h-4 text-slate-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    {profile?.full_name || user.email}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {user.id}
                  </span>
                </div>
                {profile?.role && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 capitalize">
                    {profile.role}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-medium border border-slate-300 text-slate-900 bg-white hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                style={{ minWidth: 44 }}
              >
                Log In
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-medium bg-[#2563EB] text-white hover:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                style={{ minWidth: 44 }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger (mobile/tablet) */}
        <button
          ref={burgerRef}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile/Tablet Off-Canvas Menu (Portal) */}
      <MobileMenu
        open={mobileOpen}
        items={NAV_ITEMS}
        expandedIndex={mobileAccordion}
        onToggleGroup={handleToggleGroup}
        onClose={() => {
          setMobileOpen(false);
          burgerRef.current?.focus();
        }}
      />
    </header>
  );
}
