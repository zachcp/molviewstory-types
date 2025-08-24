# mol-story-types

TypeScript/Deno library providing type definitions and utilities for creating
molecular visualization stories compatible with [Mol*](https://molstar.org/) MVS
(Mol* Viewer State) format.

## API Reference

### StoryContainer Class

Main class for creating and managing molecular stories.

#### Constructor

```typescript
new StoryContainer(story: Story)
```

#### Methods

- `generate(): Promise<MVSData | Uint8Array>` - Generates MVS data. Returns
  `MVSData` object if no assets, or `Uint8Array` (ZIP) if assets are present.

### Types

- `Story` - Complete story definition
- `StoryMetadata` - Story metadata (title, etc.)
- `SceneData` - Individual scene configuration
- `SceneAsset` - File asset for stories
- `CameraData` - 3D camera configuration
- `StoryContainer` - Main story container class

## License

MIT

## Related Projects

- [Mol*](https://molstar.org/) - Molecular visualization toolkit
- [MVS Format](https://molstar.org/mol-view-spec/) - Mol* Viewer State
  specification
- [MV-Stories](http://molstar.org/mol-view-stories/) - Live StoryBuilder
