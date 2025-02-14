import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { names } from '../state/names';
import {
   AsyncLoadWithCallStateStore,
   CallStateStore,
} from './state/async-load.model';

@Component({
   selector: 'ngxss-nested-stores-example',
   templateUrl: './nested-stores-example.component.html',
   styleUrls: [
      './nested-stores-example.component.scss',
      './../../styles/example-page.scss',
   ],
   standalone: true,
   imports: [CommonModule],
   providers: [AsyncLoadWithCallStateStore, CallStateStore],
})
export class NestedStoresComponent {
   readonly store = inject(AsyncLoadWithCallStateStore);

   constructor() {
      const {
         loadEntity,
         loadEntitySuccess,
         loadEntityFailure,
         callStateStore,
      } = this.store.events;

      loadEntity.subscribe(({ id }) => {
         console.log(`Loading Entity ${id}`);
      });
      loadEntitySuccess.subscribe(({ entityId, entityName }) => {
         console.log(`Entity ${entityId} (${entityName}) has loaded`);
      });
      loadEntityFailure.subscribe(({ error }) => {
         console.log(`Error: ${error}`);
      });
   }

   onLoad() {
      this.store.loadEntity({
         id: Math.floor(Math.random() * (names.length - 1)),
      });
   }

   onReset() {
      this.store.reset();
   }

   onResetCallState() {
      this.store.callStateStore.reset();
      this.store.callStateStore2.reset();
   }
}
