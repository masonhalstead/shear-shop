export const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 240,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 240px)`,
    },
  },
  appBarClosed: {
    marginLeft: 74,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 74px)`,
    },
  },
});
