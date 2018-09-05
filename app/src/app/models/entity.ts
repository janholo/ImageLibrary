export enum EntityType {
    folder = 0,
    image,
    video,
    other
  }

export class Entity {
    constructor(public path: string,
                public type: EntityType,
                public previewPath: string,
                public sourcePath: string) {
    }
    getName(): string {
        const l = this.path.split('/');
        return l[l.length - 1];
    }
}
