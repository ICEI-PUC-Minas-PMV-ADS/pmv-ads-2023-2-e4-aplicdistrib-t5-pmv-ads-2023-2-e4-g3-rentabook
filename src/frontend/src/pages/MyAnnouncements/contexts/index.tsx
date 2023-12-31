import * as React from 'react';
import { MyAnnouncementsAction, MyAnnouncementsReducer, MyAnnouncementsState, initialState } from '../reducers';



/**
 * MyAnnouncementsContext
 */

export const MyAnnouncementsContext = React.createContext<{
  state: MyAnnouncementsState,
  dispatch: React.Dispatch<MyAnnouncementsAction>,
}>({ state: initialState, dispatch: () => { } });

const Provider = MyAnnouncementsContext.Provider;

/**
 * MyAnnouncementsProviderProps
 */

export type MyAnnouncementsProviderProps = {
  children: JSX.Element,
};

/**
 * MyAnnouncementsProvider
 */

export const MyAnnouncementsProvider = (props: MyAnnouncementsProviderProps) => {
  const [state, dispatch] = React.useReducer(MyAnnouncementsReducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      {props.children}
    </Provider>
  );
};

/**
 * MyAnnouncementsComsumer
 */

export const MyAnnouncementsComsumer = MyAnnouncementsContext.Consumer;

/**
 * useMyAnnouncementsContext
 */

export const useMyAnnouncementsContext = () => {
  return React.useContext(MyAnnouncementsContext);
};