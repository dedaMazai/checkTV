import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    counter: counterReducer,

    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  console.log(111111, process.env)
  return configureStore({
    reducer: rootReducers,
    devTools: !!process.env.__IS_DEV__ || true,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
      .concat([rtkApi.middleware]),
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
