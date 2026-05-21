import React, { type CSSProperties, type ReactNode, useId } from "react";

type GlassTint = "neutral" | "cool" | "warm" | "violet" | "mint";

interface GlassCardProps {
  children?: ReactNode;
  /** Corner roundness in px. Default 20. */
  radius?: number;
  /** Backdrop blur strength in px. Default 18. */
  blur?: number;
  /** 0–1 surface opacity. Default 0.18. */
  opacity?: number;
  /** Subtle color cast. Default "neutral". */
  tint?: GlassTint;
  /** Plays the drifting specular sheen on hover. Default true. */
  animated?: boolean;
  /** Padding override. */
  padding?: number | string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const TINTS: Record<GlassTint, string> = {
  neutral: "255, 255, 255",
  cool: "180, 210, 255",
  warm: "255, 215, 190",
  violet: "200, 180, 255",
  mint: "190, 245, 220",
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  radius = 20,
  blur = 18,
  opacity = 0.18,
  tint = "neutral",
  animated = true,
  padding = 24,
  className,
  style,
  onClick,
}) => {
  const rgb = TINTS[tint];

  // Unique class so the hover styles only target this instance.
  const rawId = useId();
  const scope = `glass-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const containerStyle: CSSProperties = {
    position: "relative",
    borderRadius: radius,
    padding,
    color: "inherit",
    background: `linear-gradient(135deg,
      rgba(${rgb}, ${opacity + 0.08}) 0%,
      rgba(${rgb}, ${opacity}) 50%,
      rgba(${rgb}, ${Math.max(opacity - 0.05, 0.05)}) 100%)`,
    backdropFilter: `blur(${blur}px) saturate(160%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(160%)`,
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow: [
      "0 8px 32px rgba(0, 0, 0, 0.18)",
      "inset 0 1px 0 rgba(255, 255, 255, 0.4)",
      "inset 0 -1px 0 rgba(255, 255, 255, 0.08)",
    ].join(", "),
    overflow: "hidden",
    cursor: onClick ? "pointer" : "default",
    transition: "transform 200ms ease, box-shadow 200ms ease",
    ...style,
  };

  const sheenStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: radius,
    background:
      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
    pointerEvents: "none",
    opacity: 0,
    transform: "translateX(-30%)",
    transition: "opacity 300ms ease",
  };

  return (
    <>
      <style>{`
        @keyframes ${scope}-sheen {
          0%   { transform: translateX(-30%); opacity: 0.4; }
          50%  { transform: translateX(30%);  opacity: 0.9; }
          100% { transform: translateX(-30%); opacity: 0.4; }
        }
        .${scope}:hover {
          transform: translateY(-2px);
        }
        ${
          animated
            ? `.${scope}:hover .${scope}__sheen {
                 animation: ${scope}-sheen 25s ease-in-out infinite;
                 opacity: 1;
               }`
            : ""
        }
        @media (prefers-reduced-motion: reduce) {
          .${scope}:hover .${scope}__sheen { animation: none; }
        }
      `}</style>
      <div
        className={[scope, className].filter(Boolean).join(" ")}
        style={containerStyle}
        onClick={onClick}
      >
        <div className={`${scope}__sheen`} style={sheenStyle} />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default GlassCard;