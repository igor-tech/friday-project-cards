import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { ThunkDispatch } from 'redux-thunk'

import { appReducer } from './app-slice'
import { cardsPersistConfig, packsPersistConfig, persistConfig } from './persist-config'

import {
  authReducer,
  setNewPasswordReducer,
  recoveryPasswordReducer,
  CardsReducer,
  packsReducer,
  profileReducer,
} from 'features'

const rootReducer = combineReducers({
  auth: authReducer,
  recoveryPassword: recoveryPasswordReducer,
  setNewPassword: setNewPasswordReducer,
  profile: profileReducer,
  app: appReducer,
  packs: persistReducer(packsPersistConfig, packsReducer),
  cards: persistReducer(cardsPersistConfig, CardsReducer),
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
