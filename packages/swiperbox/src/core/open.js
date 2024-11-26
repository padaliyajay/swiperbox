import default_config from "./config";
import { Dialog } from "./dialog";
import { Gallery } from "../components/Gallery";
import { Thumbs } from "../components/Thumbs";
import { ThumbsToggle } from "../components/ThumbsToggle";
import { Close } from "../components/Close";
import { Skeleton } from "../components/Skeleton";
import { Zoom } from "../components/Zoom";

export function open(config) {
  // Merge default config with user config
  config = { ...default_config, ...config };

  // Validate config
  if (!Array.isArray(config.items) || config.items.length === 0) {
    throw new Error("Invalid items");
  }
  config.items.forEach((item) => {
    if (typeof item !== "object" || (!item.image && !item.iframe)) {
      throw new Error("Invalid item. Must be an object with image or iframe");
    }
  });

  // Create dialog
  const dialog = Dialog();
  
  // Components
  Skeleton(dialog, config);
  Thumbs(dialog, config);
  ThumbsToggle(dialog, config);
  Gallery(dialog, config);
  Zoom(dialog, config);
  Close(dialog, config);

  document.body.appendChild(dialog);
}
