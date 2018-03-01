const actionTypes = {
  // Account
  accountUpdated: 'ACCOUNT_UPDATED',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountLocked: 'ACCOUNT_LOCKED',
  accountUnlocked: 'ACCOUNT_UNLOCKED',
  accountSetAsActive: 'ACCOUNT_SET_AS_ACTIVE',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountsStored: 'ACCOUNTS_STORED',
  // Peers
  activePeerSet: 'ACTIVE_PEER_SET',
  activePeerUpdated: 'ACTIVE_PEER_UPDATED',
  // Loading
  loadingStarted: 'LOADING_STARTED',
  loadingFinished: 'LOADING_FINISHED',
};

export default actionTypes;