// deps.ts - Centralized external dependencies using esm.sh with external dependencies
export { Vec3 } from "https://esm.sh/molstar@5.0.0-dev.0/lib/mol-math/linear-algebra/3d/vec3?external=io-ts";
export { MVSData } from "https://esm.sh/molstar@5.0.0-dev.0/lib/extensions/mvs/mvs-data?external=io-ts";
export type { Snapshot } from "https://esm.sh/molstar@5.0.0-dev.0/lib/extensions/mvs/mvs-data?external=io-ts";
export {
  deflate,
  inflate,
  Zip,
} from "https://esm.sh/molstar@5.0.0-dev.0/lib/mol-util/zip/zip?external=io-ts";
