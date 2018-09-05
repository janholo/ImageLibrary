import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { FileUploadState } from '../file-upload/file-upload-state';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FilesRepository {
    UploadFile(folderPath: string, fileUploadState: FileUploadState): Observable<HttpEvent<{}>> {
        const url = environment.fileSystemApiUrl + '/files/' + folderPath + '/' + fileUploadState.file.name;

        const formData: FormData = new FormData();
        formData.append('file', fileUploadState.file, fileUploadState.file.name);

        const req = new HttpRequest('PUT', url, formData, { reportProgress: true });

        fileUploadState.isStarted = true;

        const observableRequest = this.http.request(req).pipe(share());
        observableRequest.subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                fileUploadState.progress = 100 * event.loaded / event.total;
            }
        }, error => fileUploadState.error = true, () => fileUploadState.isDone = true);

        return observableRequest;
    }
    constructor(private http: HttpClient) { }
}
