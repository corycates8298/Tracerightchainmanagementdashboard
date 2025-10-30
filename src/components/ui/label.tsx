import * as React from "react";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`flex items-center gap-2 text-sm leading-none font-medium select-none ${className}`}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
