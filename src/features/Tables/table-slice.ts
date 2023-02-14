import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../App/app-slice'
import { RootState } from '../../App/store'
import { handleServerNetworkError } from '../../common'

import {
  CardsPack,
  RequestCreatePack,
  RequestUpdatePack,
  ResponseGetPacks,
  tableAPI,
} from './table-api'

export const getPacks = createAsyncThunk('packs/getPacks', async (_, { dispatch, getState }) => {
  dispatch(setAppStatus('loading'))
  const { pageCount, page, packName, sortPacks, max, min, user_id } = (getState() as RootState)
    .packs.packsQueryParams

  const queryParams = {
    pageCount,
    page,
    packName,
    sortPacks,
    max,
    min,
    user_id,
  }

  try {
    const { data } = await tableAPI.getPack(queryParams)

    dispatch(setDataPack(data))
    dispatch(setAppStatus('success'))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})

export const createNewPack = createAsyncThunk(
  'create/newPack',
  async (dataParams: RequestCreatePack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.createPack(dataParams)
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('Pack added successfully'))
      dispatch(getPacks())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)
export const deletePack = createAsyncThunk('delete/pack', async (idPack: string, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  console.log(idPack)
  try {
    await tableAPI.deletePack(idPack)
    dispatch(setAppMessage('Pack delete successfully'))
    dispatch(getPacks())
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
})
export const updatePack = createAsyncThunk(
  'update/pack',
  async (updateData: RequestUpdatePack, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await tableAPI.updatePack(updateData)
      dispatch(setAppStatus('success'))
      dispatch(setAppMessage('PackName change successfully'))
      dispatch(getPacks())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }
)

const initialState = {
  cardPacks: [] as CardsPack[],
  cardPacksTotalCount: 0,
  maxCardsCount: 50,
  minCardsCount: 0,
  packsQueryParams: {
    packName: '',
    sortPacks: '0updated',
    min: 0,
    max: 9,
    page: 1,
    pageCount: 10,
    user_id: '',
  },
}

type InitialStatePacksType = typeof initialState

export const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState as InitialStatePacksType,
  reducers: {
    setDataPack: (state, action: PayloadAction<ResponseGetPacks>) => {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.maxCardsCount = action.payload.maxCardsCount
      state.minCardsCount = action.payload.minCardsCount
    },
    setSortPacks: (state, action: PayloadAction<string>) => {
      state.packsQueryParams.sortPacks = action.payload
    },
  },
})

export const { setDataPack, setSortPacks } = packsSlice.actions
export const packsReducer = packsSlice.reducer
