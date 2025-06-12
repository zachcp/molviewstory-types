import { Vec3 } from "molstar/lib/mol-math/linear-algebra";

/**
 * Container for a complete story with version information
 */
export type StoryContainer = {
  /** Version of the story format */
  version: 1;
  /** The story data */
  story: Story;
};

/**
 * Metadata information for a story
 */
export type StoryMetadata = {
  /** The title of the story */
  title: string;
};

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
 * Represents a file asset used in the story (e.g., PDB files, images, etc.)
 */
export type SceneAsset = {
  /** Name/filename of the asset */
  name: string;
  /** Binary content of the asset file */
  content: Uint8Array;
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

/**
 * Complete data for a single scene in the story
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
 * Partial update data for a scene (excludes id which cannot be changed)
 */
export type SceneUpdate = Partial<Omit<SceneData, "id">>;

/**
 * Data required to create a new scene (excludes id which will be generated)
 */
export type CreateSceneData = Omit<SceneData, "id">;

/**
 * Represents the current view/navigation state in the story editor
 */
export type CurrentView =
  | {
      /** Story-level options view */
      type: "story-options";
      /** Specific story options subview */
      subview: "story-metadata" | "story-wide-code" | "asset-upload";
    }
  | {
      /** Scene-specific view */
      type: "scene";
      /** ID of the scene being viewed */
      id: string;
      /** Specific scene subview */
      subview: "scene-options" | "3d-view";
    }
  | {
      /** Preview mode view */
      type: "preview";
      /** Previous view to return to when exiting preview (optional) */
      previous?: CurrentView;
    };
