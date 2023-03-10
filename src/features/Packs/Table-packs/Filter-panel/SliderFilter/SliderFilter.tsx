import React, { useEffect, useState } from 'react'

import { Box, Paper, Slider, Typography } from '@mui/material'

import { setBetweenValueFilter } from '../../../packs-slice'

import {
  numberBlockSx,
  sliderBlockSx,
  sliderSx,
  textPaperBlockSx,
  titleSx,
} from './SliderFilter.muiSx'

import {
  appStatusSelector,
  isFilterResetSelector,
  maxCardsCountSelector,
  minCardsCountSelector,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const SliderFilter = () => {
  const dispatch = useAppDispatch()
  const statusLoad = useAppSelector(appStatusSelector)

  const minCardsCount = useAppSelector(minCardsCountSelector)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const isFilterReset = useAppSelector(isFilterResetSelector)

  const [value, setValue] = useState<[number, number]>([minCardsCount, maxCardsCount])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number])
  }

  const handleChangeCommitted = () => {
    dispatch(setBetweenValueFilter({ min: value[0], max: value[1] }))
  }

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount, isFilterReset])

  return (
    <Box>
      <Typography sx={titleSx} component="h2">
        Number of cards
      </Typography>

      <Box sx={sliderBlockSx}>
        <Paper sx={numberBlockSx}>
          <Typography sx={textPaperBlockSx} component="p">
            {value[0]}
          </Typography>
        </Paper>
        <Slider
          disabled={statusLoad === 'loading'}
          sx={sliderSx}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          max={maxCardsCount}
          min={minCardsCount}
          onChangeCommitted={handleChangeCommitted}
        />
        <Paper sx={numberBlockSx}>
          <Typography sx={textPaperBlockSx} component="p">
            {value[1]}
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
