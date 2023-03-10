export const containerPackMenuSx = { display: 'flex', alignItems: 'center', textAlign: 'center' }
export const iconButtonSx = {
  ml: 2,
  '&.MuiIconButton-root': {
    padding: 0,
    marginLeft: '9px',
    marginTop: '2px',
  },
}
export const moreVertSx = { width: 24, height: 24 }
export const menuPaperPropsSx = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}
