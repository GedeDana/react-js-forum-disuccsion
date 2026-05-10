import React from 'react';

const SideBarContext = React.createContext();

export const SideBarProvider = SideBarContext.Provider;
export const SideBarConsumer = SideBarContext.Consumer;

export default SideBarContext;