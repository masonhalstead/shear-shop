export const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 220,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 220px)`,
    },
    boxShadow: 'none',
  },
  appBarClosed: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 75px)`,
    },
    boxShadow: 'none',
  },
});
