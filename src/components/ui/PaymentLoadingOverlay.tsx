"use client";

import { Loader2 } from "lucide-react";

interface PaymentLoadingOverlayProps {
  visible: boolean;
  message?: string;
  subMessage?: string;
}

/**
 * Full-screen blocking overlay shown from the moment "Proceed to Pay" is
 * clicked until Razorpay's own checkout iframe actually appears. Razorpay's
 * checkout.js script + iframe negotiation is highly variable in practice
 * (observed anywhere from ~6s to 30s+) and shows nothing of its own during
 * that gap, which reads as a dead/broken page and invites users to click
 * around impatiently. This blocks interaction and sets expectations instead.
 */
export default function PaymentLoadingOverlay({
  visible,
  message = "Preparing Secure Payment...",
  subMessage = "Connecting to Razorpay — this can take a few seconds. Please don't refresh or close this page.",
}: PaymentLoadingOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
    >
      <div className="flex flex-col items-center text-center max-w-sm">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-6" strokeWidth={2} />
        <p className="text-white font-semibold text-lg">{message}</p>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{subMessage}</p>
      </div>
    </div>
  );
}
