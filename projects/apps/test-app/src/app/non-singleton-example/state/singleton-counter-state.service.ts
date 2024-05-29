import { Injectable } from '@angular/core';
import { StateService } from 'projects/libs/ngx-simple-state/src/lib/state-service';
import { initialValue } from './singleton-counter.model';

@Injectable({ providedIn: 'root' })
export class SingletonCounterStateService extends StateService(initialValue) {
   increment() {
      this.state.count.update((c) => c + 1);
   }
}