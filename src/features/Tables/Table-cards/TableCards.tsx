import React, { useEffect } from 'react'

import { Box, Table } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { AppStatusLoader, useAppSelector } from '../../../common'

import { BackToPackList } from './BackToPackList'
import { CardHeaderMenu } from './CardMenu/CardHeaderMenu'
import { createNewCard, getCards, setPacksCardId } from './cards-slice'
import { EmptyPackMenu } from './EmptyPackMenu'
import { useTableCards } from './hooks/useTableCards'
import { TableCardsBody } from './Table-cards-body/TableCardsBody'
import { HeadersCards } from './Table-cards-head/TableCardsHead'

export const TableCards = () => {
  const { dispatch, card, isMy, packName } = useTableCards()

  const { sortCards, cardQuestion, page, pageCount } = useAppSelector(
    state => state.cards.cardsQueryParams
  )
  const resultSearch = useAppSelector(state => state.cards.cardsQueryParams.cardQuestion)
  const isCardLoading = useAppSelector(state => state.cards.isCardLoading)
  const [urlQueryParam] = useSearchParams()
  const { cardsPackId } = Object.fromEntries(urlQueryParam)

  const addNewCard = () => {
    dispatch(createNewCard({}))
  }

  useEffect(() => {
    dispatch(setPacksCardId(cardsPackId))
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [sortCards, cardQuestion, page, pageCount])

  if (!isCardLoading) {
    return <AppStatusLoader />
  }

  if (card?.length === 0 && !resultSearch) {
    return <EmptyPackMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
  }

  return (
    <Box sx={{ margin: '24px 136px' }}>
      <BackToPackList />
      <CardHeaderMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
      {card.length === 0 && resultSearch ? (
        <div>Not result</div>
      ) : (
        <Table aria-labelledby="tableTitle">
          <HeadersCards />
          <TableCardsBody />
        </Table>
      )}
    </Box>
  )
}