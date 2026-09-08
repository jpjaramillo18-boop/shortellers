"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/**
 * A button that is intentionally not wired to a real flow in this demo.
 * Clicking it says so, out loud — no silent dead ends.
 */
export function StubButton({
  message,
  children,
  ...props
}: ButtonProps & { message: string }) {
  const { toast } = useToast();
  return (
    <Button {...props} onClick={() => toast(message, "info")}>
      {children}
    </Button>
  );
}
