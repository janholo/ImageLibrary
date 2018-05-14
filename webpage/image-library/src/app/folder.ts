import { DataUriService } from './data-uri.service';

export class Folder {
    path: string;
    isRoot: boolean;
    constructor(private dataUriService: DataUriService, p: string, root: boolean = false) {
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
      return this.dataUriService.getDataUri() + '/preview/' + this.path;
    }
    getRouterLink(): string {
      return '/folderview/' + this.path;
    }
}
