// deps.ts - Centralized external dependencies using esm.sh with external io-ts parameter
export { Vec3 } from "https://esm.sh/molstar@5.0.0-dev.1/lib/mol-math/linear-algebra/3d/vec3";
export { MVSData } from "https://esm.sh/molstar@5.0.0-dev.1/lib/extensions/mvs/mvs-data";
export type { Snapshot } from "https://esm.sh/molstar@5.0.0-dev.1/lib/extensions/mvs/mvs-data";
export {
  deflate,
  inflate,
  Zip,
} from "https://esm.sh/molstar@5.0.0-dev.1/lib/mol-util/zip/zip";
