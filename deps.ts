// deps.ts - Centralized external dependencies using npm: specifiers
export { Vec3 } from "npm:molstar@5.0.0-dev.8/lib/mol-math/linear-algebra/3d/vec3.js";
export { MVSData } from "npm:molstar@5.0.0-dev.8/lib/extensions/mvs/mvs-data.js";
export type { Snapshot } from "npm:molstar@5.0.0-dev.8/lib/extensions/mvs/mvs-data.js";
export {
  deflate,
  inflate,
  Zip,
} from "npm:molstar@5.0.0-dev.8/lib/mol-util/zip/zip.js";

export { encodeMsgPack } from "npm:molstar@5.0.0-dev.8/lib/mol-io/common/msgpack/encode.js";
export { Task } from "npm:molstar@5.0.0-dev.8/lib/mol-task/task.js";
