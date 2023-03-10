import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { updateGrade } from '../../Cards/cards-slice'
import { Cards } from '../../Packs/table-api'

import {
  appStatusSelector,
  cardsSelectors,
  packNameCardSelector,
  useAppDispatch,
  useAppSelector,
} from 'common'

const getNumberCard = (cards: Cards[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

const grades = [
  { id: 1, value: 'Did not know' },
  { id: 2, value: 'Forgot' },
  { id: 3, value: 'A lot of thought' },
  { id: 4, value: 'Сonfused' },
  { id: 5, value: 'Knew the answer' },
]

export const useLearn = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appStatusSelector)
  const cards = useAppSelector(cardsSelectors)
  const packName = useAppSelector(packNameCardSelector)

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const [value, setValue] = useState(5)

  const { id } = useParams()

  const [card, setCard] = useState<Cards>({
    _id: 'fake',
    cardsPack_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,

    type: '',
    rating: 0,
    more_id: '',

    created: '',
    updated: '',
    __v: 0,
    answerImg: '',
    answerVideo: '',
    comments: '',
    questionImg: '',
    questionVideo: '',
    user_id: '',
  })

  const onChangeRadio = (value: number) => setValue(value)

  const onNext = () => {
    dispatch(updateGrade({ grade: value, card_id: card._id }))
    setIsChecked(false)
    setValue(5)
    if (cards.length > 0) {
      setCard(getNumberCard(cards))
    }
  }
  const isLoading = status === 'loading'

  return {
    grades,
    getNumberCard,
    onNext,
    dispatch,
    card,
    setCard,
    id,
    value,
    setValue,
    first,
    setFirst,
    isChecked,
    setIsChecked,
    packName,
    status,
    cards,
    onChangeRadio,
    isLoading,
  }
}
