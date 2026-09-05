import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must be taught the Ledger's custom font-size tokens,
 * otherwise it misclassifies `text-display-2` etc. as text-color and lets
 * `text-ink` strip them.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-1",
            "display-2",
            "title",
            "title-sm",
            "body-lg",
            "body",
            "label",
            "stat-lg",
            "stat",
            "machine",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
