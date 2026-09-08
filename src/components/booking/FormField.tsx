"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

interface BaseProps {
  label: string;
  helper?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  /** returns an error string, or null if valid; run on blur */
  validate?: (value: string) => string | null;
  placeholder?: string;
  className?: string;
}

type FieldProps = BaseProps &
  ({ as?: "input"; type?: string; rows?: never } | { as: "textarea"; rows?: number; type?: never });

/**
 * Labelled field with persistent helper text and blur validation.
 * Label is always visible (never placeholder-as-label). Error is announced.
 */
export function FormField(props: FieldProps) {
  const { label, helper, required, value, onChange, validate, placeholder, className } = props;
  const id = useId();
  const helpId = `${id}-help`;
  const errId = `${id}-err`;
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const runValidate = () => {
    setTouched(true);
    if (validate) setError(validate(value));
  };

  const describedBy = [helper ? helpId : null, error ? errId : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    value,
    placeholder,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-required": required || undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value);
      if (touched && validate) setError(validate(e.target.value));
    },
    onBlur: runValidate,
    className: cn(
      "w-full rounded-md border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30",
      error ? "border-destructive" : "border-border",
    ),
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {props.as === "textarea" ? (
        <textarea {...shared} rows={props.rows ?? 4} />
      ) : (
        <input {...shared} type={props.type ?? "text"} />
      )}

      {helper && !error && (
        <p id={helpId} className="text-xs text-ink-muted">
          {helper}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
