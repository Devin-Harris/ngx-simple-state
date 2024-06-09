import {
   Action,
   Store,
   createAction,
   store,
} from 'projects/libs/ngx-simple-state/src/public-api';

export type CounterStoreType = Store<{
   count: number;
   increment: Action;
}>;

export const counterStoreInitialValue: CounterStoreType = {
   count: 0,
   increment: createAction((state) => state.count.update((c) => c + 1)),
};

export const SingletonCounterStore = store<CounterStoreType>(
   counterStoreInitialValue,
   {
      providedIn: 'root',
   }
);
export const NonSingletonCounterStore = store<CounterStoreType>(
   counterStoreInitialValue,
   {
      providedIn: 'root',
   }
);
