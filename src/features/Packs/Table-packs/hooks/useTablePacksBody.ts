import { deletePack, updatePack } from '../../packs-slice'

import {
  useAppDispatch,
  useAppSelector,
  userIdSelector,
  cardPacksSelector,
  appStatusSelector,
} from 'common'

export const useTablePacksBody = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardPacksSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const deleteCurrentPack = (idPack: string) => {
    dispatch(deletePack(idPack))
  }
  const updateCurrentPack = (idPack: string) => {
    const updateCurrentPack = {
      _id: idPack,
      name: 'Name Update',
    }

    dispatch(updatePack(updateCurrentPack))
  }

  return { updateCurrentPack, deleteCurrentPack, myProfileId, cardsPack, statusLoad }
}
