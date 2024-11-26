import { Injector, Signal, Type, WritableSignal } from '@angular/core';

import {
   Action,
   ActionType,
   CreateAction,
} from '../../actions/types/action-types';
import { CreateSelector, Selector } from '../../selectors/types/selector-types';
import {
   NGX_SIMPLE_STATE_INJECTOR_TOKEN,
   NGX_SIMPLE_STATE_STORE_TOKEN,
} from '../tokens/store-tokens';
import {
   ExcludeStoreSignalHelperMethods,
   StoreSignalHelperMethods,
} from './helper-method-types';

export interface InjectableConfig {
   providedIn: Type<any> | 'root' | 'platform' | 'any' | null; // Pulled from angulars Injectable interface options
}

export type StoreSignalConfig = {
   injector?: Injector | null;
};

export type Store<T> = {
   [x in keyof T]: T[x] extends Selector<infer R>
      ? CreateSelector<Store<T>, R>
      : T[x] extends Action<infer P>
      ? CreateAction<Store<T>, P>
      : T[x] extends Store<infer T2>
      ? StoreSignal<Store<T2>>
      : x extends keyof StoreSignalHelperMethods<any>
      ? never
      : T[x];
};

type StoreSignalType<T, Readonly extends boolean = false> = {
   [x in ExcludeStoreSignalHelperMethods<T>]: T[x] extends CreateSelector<
      T,
      infer R
   >
      ? Signal<R>
      : T[x] extends CreateAction<T, infer P>
      ? ActionType<T, P>
      : T[x] extends StoreSignal<Store<infer T2>, infer Readonly2>
      ? StoreSignal<Store<T2>, Readonly2>
      : Readonly extends true
      ? Signal<T[x]>
      : WritableSignal<T[x]>;
};

export type StoreSignal<T, Readonly extends boolean = false> = StoreSignalType<
   T,
   Readonly
> &
   StoreSignalHelperMethods<T, Readonly> & {
      [NGX_SIMPLE_STATE_STORE_TOKEN]: true;
      [NGX_SIMPLE_STATE_INJECTOR_TOKEN]: WritableSignal<Injector | null>;
   };
