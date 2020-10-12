import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkerManagerService {
  constructor() {}

  public generateWorker(path: string) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(path, { type: 'module' });
      /*worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');*/
      return worker;
    }
    return null;
  }
}
