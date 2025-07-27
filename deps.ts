// deps.ts - Centralized external dependencies using esm.sh for ESM compatibility
// export { Vec3 } from "https://esm.sh/molstar@5.0.0-dev.0/lib/mol-math/linear-algebra/3d/vec3";
// export { MVSData } from "https://esm.sh/molstar@5.0.0-dev.0/lib/extensions/mvs/mvs-data";
// export type { Snapshot } from "https://esm.sh/molstar@5.0.0-dev.0/lib/extensions/mvs/mvs-data";

// export {
//   deflate,
//   inflate,
//   Zip,
// } from "https://esm.sh/molstar@5.0.0-dev.0/lib/mol-util/zip/zip";

export { Vec3 } from "npm:molstar@5.0.0-dev.0/lib/mol-math/linear-algebra/3d/vec3.js";
export { MVSData } from "npm:molstar@5.0.0-dev.0/lib/extensions/mvs/mvs-data.js";
export type { Snapshot } from "npm:molstar@5.0.0-dev.0/lib/extensions/mvs/mvs-data.js";
export {
  deflate,
  inflate,
  Zip,
} from "npm:molstar@5.0.0-dev.0/lib/mol-util/zip/zip.js";
