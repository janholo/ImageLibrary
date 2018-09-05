export class Folder {
    isRoot = false;
    constructor(public path: string) {
      if (!path) {
        this.isRoot = true;
      }
    }
    getName(): string {
      if (this.isRoot) {
        return 'Root';
      }
      const l = this.path.split('/');
      return l[l.length - 1];
    }
    getRouterLink(): string {
      return '/folderview/' + this.path;
    }
}
