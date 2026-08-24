import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { button } from "./button.styles.css";

/** Renders the shared styled button used for primary and secondary actions. */
export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx(button, className)} {...props} />;
}
