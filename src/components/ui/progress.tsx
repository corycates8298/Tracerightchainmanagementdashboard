import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-purple-100 relative h-2 w-full overflow-hidden rounded-full ${className}`}
        {...props}
      >
        <div
          className="bg-purple-600 h-full w-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
