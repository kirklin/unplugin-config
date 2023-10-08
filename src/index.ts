import { createUnplugin } from "unplugin";
import { unpluginFactory } from "./core/unplugin";

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
