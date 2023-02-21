import { deleteCard, updateCard } from '../../cards-slice'

import {
  appStatusSelector,
  CardsSelector,
  useAppDispatch,
  useAppSelector,
  userIdSelector,
} from 'common'

export const useTableCardsBody = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(CardsSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const deleteCurrentCard = (idCard: string) => {
    dispatch(deleteCard({ id: idCard }))
  }
  const updateCurrentCard = (idCard: string) => {
    const updateCurrentPack = {
      _id: idCard,
      question: 'question updated',
    }

    dispatch(updateCard(updateCurrentPack))
  }

  return { updateCurrentCard, deleteCurrentCard, myProfileId, cards, statusLoad }
}