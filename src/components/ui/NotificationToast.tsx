"use client";

import { useEffect } from "react";
import { AlertCircle, Check, Info, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NotificationType = "success" | "error" | "info";

interface NotificationToastProps {
  visible: boolean;
  type: NotificationType;
  title: string;
  message: React.ReactNode;
  onClose: () => void;
  /** Auto-dismiss after this many ms. Set to 0 to disable. Defaults to 5000. */
  autoDismissMs?: number;
}

type VariantStyle = {
  border: string;
  bg: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  messageColor: string;
  Icon: LucideIcon;
};

const VARIANT_STYLES: Record<NotificationType, VariantStyle> = {
  success: {
    border: "border-[#2d3023]",
    bg: "bg-[#111111]",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-500",
    titleColor: "text-white",
    messageColor: "text-zinc-400",
    Icon: Check,
  },
  error: {
    border: "border-red-900/40",
    bg: "bg-[#1a1010]",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    titleColor: "text-red-300",
    messageColor: "text-red-200",
    Icon: AlertCircle,
  },
  info: {
    border: "border-sky-900/40",
    bg: "bg-[#0d1520]",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    titleColor: "text-sky-300",
    messageColor: "text-sky-200",
    Icon: Info,
  },
};

/**
 * The one notification/confirmation popup style used across every form on the
 * site (registration, contact, mentor, project listing, ...). Fixed banner
 * pinned near the top of the viewport — not a full-screen modal — with a
 * proper icon-based close button (never a raw "×" text glyph: that's exactly
 * what got mangled into "├ù" in a previous version of this component).
 * Auto-dismisses after `autoDismissMs` (default 5s); the user can also close
 * it early at any time via the X button.
 */
export default function NotificationToast({
  visible,
  type,
  title,
  message,
  onClose,
  autoDismissMs = 5000,
}: NotificationToastProps) {
  useEffect(() => {
    if (!visible || autoDismissMs <= 0) {
      return;
    }

    const timer = window.setTimeout(onClose, autoDismissMs);
    return () => window.clearTimeout(timer);
    // Intentionally keyed only on `visible` (not `message`/`title`) so that
    // inline JSX passed as `message` — which gets a new reference on every
    // parent re-render — can't keep resetting the countdown and never close.
  }, [visible, autoDismissMs, onClose]);

  if (!visible) {
    return null;
  }

  const variant = VARIANT_STYLES[type];
  const { Icon } = variant;

  return (
    <div className="fixed left-1/2 top-24 sm:top-28 z-[80] w-[calc(100%-2rem)] sm:w-auto sm:max-w-2xl -translate-x-1/2">
      <div
        className={`rounded-xl border p-4 shadow-2xl flex items-start justify-between gap-3 sm:gap-4 ${variant.border} ${variant.bg}`}
      >
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${variant.iconBg}`}
          >
            <Icon className={`w-5 h-5 ${variant.iconColor}`} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className={`font-semibold truncate ${variant.titleColor}`}>{title}</p>
            <p className={`text-sm mt-1 break-words ${variant.messageColor}`}>{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors flex-shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
