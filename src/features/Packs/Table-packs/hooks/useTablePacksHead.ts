import { useState } from 'react'

import { setSortPacks } from '../../packs-slice'

import { useAppDispatch } from 'common'

type TitlePacksType = {
  name: string
  cardsCount: number
  updated: string
  created: string
}
type OrderSortType = 'asc' | 'desc'
type HeadCell = {
  id: keyof TitlePacksType
  label: string
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'cardsCount',
    label: 'Cards',
  },
  {
    id: 'updated',
    label: 'Last Updated',
  },
  {
    id: 'created',
    label: 'Created by',
  },
]

export const useTablePacksHead = () => {
  const dispatch = useAppDispatch()
  const [order, setOrder] = useState<OrderSortType>('desc')
  const [orderBy, setOrderBy] = useState<keyof TitlePacksType>('updated')

  const setSortHandler = (property: keyof TitlePacksType) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const requestSortHandler = (id: string) => {
    dispatch(setSortPacks((order === 'asc' && orderBy === id ? '0' : '1') + id))
  }

  return { order, orderBy, headCells, setSortHandler, requestSortHandler }
}
