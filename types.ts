import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { MVSData, Snapshot } from "molstar/lib/extensions/mvs/mvs-data";

function adjustedCameraPosition(camera: CameraData) {
  // MVS uses FOV-adjusted camera position, need to apply inverse here so it doesn't offset the view when loaded
  const f =
    camera.mode === "orthographic"
      ? 1 / (2 * Math.tan(camera.fov / 2))
      : 1 / (2 * Math.sin(camera.fov / 2));
  const delta = Vec3.sub(
    Vec3(),
    camera.position as Vec3,
    camera.target as Vec3,
  );
  return Vec3.scaleAndAdd(
    Vec3(),
    camera.target as Vec3,
    delta,
    1 / f,
  ) as unknown as [number, number, number];
}

const createStateProvider = (code: string) => {
  return new Function("builder", code);
};

async function getMVSSnapshot(story: Story, scene: SceneData) {
  try {
    const stateProvider = createStateProvider(`
async function _run_builder() {
      ${story.javascript}\n\n${scene.javascript}
}
return _run_builder();
`);
    const builder = MVSData.createBuilder();
    await stateProvider(builder);
    if (scene.camera) {
      builder.camera({
        position: adjustedCameraPosition(scene.camera),
        target: scene.camera.target as unknown as [number, number, number],
        up: scene.camera.up as unknown as [number, number, number],
      });
    }
    const snapshot = builder.getSnapshot({
      key: scene.key.trim() || undefined,
      title: scene.header,
      description: scene.description,
      linger_duration_ms: scene.linger_duration_ms || 5000,
      transition_duration_ms: scene.transition_duration_ms || 500,
    });

    return snapshot;
  } catch (error) {
    console.error("Error creating state provider:", error);
    throw error;
  }
}

/**
 * Container for a complete story with version information
 */
export class StoryContainer {
  /** Version of the story format */
  readonly version: 1 = 1;
  /** The story data */
  story: Story;

  constructor(story: Story) {
    this.story = story;
  }

  /**
   * Generates snapshots for all scenes in the story
   * @returns Promise resolving to array of MVS snapshots
   */
  async generate(): Promise<Snapshot[]> {
    const snapshots: Snapshot[] = [];

    for (const scene of this.story.scenes) {
      const snapshot = await getMVSSnapshot(this.story, scene);
      snapshots.push(snapshot);
    }

    return snapshots;
  }
}

/**
 * Complete story definition containing metadata, code, scenes, and assets
 */
export type Story = {
  /** Story metadata including title and other information */
  metadata: StoryMetadata;
  /** JavaScript code that applies to the entire story */
  javascript: string;
  /** Array of scenes that make up the story */
  scenes: SceneData[];
  /** Array of assets (files) used by the story */
  assets: SceneAsset[];
};

/**
 * Metadata information for a story
 */
export type StoryMetadata = {
  /** The title of the story */
  title: string;
};

/**
 * Represents a file asset used in the story (e.g., PDB files, images, etc.)
 */
export type SceneAsset = {
  /** Name/filename of the asset */
  name: string;
  /** Binary content of the asset file */
  content: Uint8Array;
};

/**
 * Complete data for a single scene in the story
 *
 * similar to SnapshotMetadata in
 *  https://github.com/molstar/molstar/blob/master/src/extensions/mvs/mvs-data.ts
 */
export type SceneData = {
  /** Unique identifier for the scene */
  id: string;
  /** Display header/title for the scene */
  header: string;
  /** Short key/identifier for the scene */
  key: string;
  /** Detailed description of the scene */
  description: string;
  /** JavaScript code specific to this scene */
  javascript: string;
  /** Camera configuration for this scene (optional) */
  camera?: CameraData | null;
  /** How long to stay on this scene in milliseconds (optional) */
  linger_duration_ms?: number;
  /** Duration of transition to this scene in milliseconds (optional) */
  transition_duration_ms?: number;
};

/**
 * Camera configuration for 3D scene viewing
 */
export type CameraData = {
  /** Camera projection mode */
  mode: "perspective" | "orthographic";
  /** Point the camera is looking at in 3D space */
  target: [number, number, number] | Vec3;
  /** Camera position in 3D space */
  position: [number, number, number] | Vec3;
  /** Camera up vector defining the orientation */
  up: [number, number, number] | Vec3;
  /** Field of view angle in degrees (for perspective mode) */
  fov: number;
};
