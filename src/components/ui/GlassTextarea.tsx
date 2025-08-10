import React, { forwardRef } from "react";

interface GlassTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  (
    {
      value,
      onChange,
      placeholder = "",
      label,
      disabled = false,
      required = false,
      rows = 4,
      maxLength,
      icon,
      error,
      className = "",
      resize = "vertical",
    },
    ref
  ) => {
    return (
      <div className={`relative ${className}`}>
        {label && (
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
            {icon && <span className="w-4 h-4">{icon}</span>}
            {label}
            {required && <span className="text-primary">*</span>}
          </label>
        )}

        <div
          className={`glass relative overflow-hidden transition-all duration-300 ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-primary/30 hover:shadow-primary/5"
          } ${error ? "border-red-500/50 shadow-red-500/10" : ""}`}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: error
              ? "1px solid rgba(239, 68, 68, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.08)",
            minHeight: "44px",
            boxShadow: error
              ? "0 4px 16px rgba(239, 68, 68, 0.1)"
              : "0 4px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Glass reflection effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)",
            }}
          />

          <textarea
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
            className="relative z-10 w-full bg-transparent outline-none text-white placeholder-neutral-500 text-sm resize-none"
            style={{
              fontFamily: "Inter, sans-serif",
              resize: resize,
            }}
          />
        </div>

        <div className="flex justify-between items-center mt-1">
          {error && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <span className="w-3 h-3">⚠</span>
              {error}
            </p>
          )}
          {maxLength && (
            <p className="text-xs text-neutral-500 ml-auto">
              {value.length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

GlassTextarea.displayName = "GlassTextarea";

export default GlassTextarea;
