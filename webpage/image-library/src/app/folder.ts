export class Folder {
    path: string;
    isRoot: boolean;
    constructor(p: string, root: boolean = false) {
      this.path = p;
      this.isRoot = root;
    }
    getName(): string {
      if (this.isRoot) {
        return 'Root';
      }
      const l = this.path.split('/');
      return l[l.length - 1];
    }
    getPreviewPath(): string {
      return 'http://mediaserver.local/data/preview/' + this.path;
    }
    getRouterLink(): string {
      return '/folderview/' + this.path;
    }
}
