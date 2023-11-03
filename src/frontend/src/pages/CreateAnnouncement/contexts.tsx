import React from "react";
import { CreateAnnouncementAction, CreateAnnouncementState, initialCreateAnnouncementState, useCreateAnnouncementReducer } from "./reducers";

/**
 * CreateAnnouncementContextState
 */

type CreateAnnouncementContextState = {
  state: CreateAnnouncementState,
  dispatch: React.Dispatch<CreateAnnouncementAction>,
};

/**
 * CreateAnnouncementContext
 */

const CreateAnnouncementContext = React
  .createContext<CreateAnnouncementContextState>({
    state: initialCreateAnnouncementState,
    dispatch: () => { },
  });

/**
 * CreateAnnouncementProvider
 */

export const CreateAnnouncementProvider = (props: { children: JSX.Element }) => {
  const [state, dispatch] = useCreateAnnouncementReducer();
  return (
    <CreateAnnouncementContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CreateAnnouncementContext.Provider>
  );
};

/**
 * CreateAnnouncementConsumer
 */

export const CreateAnnouncementConsumer = CreateAnnouncementContext.Consumer;

/**
 * useCreateAnnouncementContext
 */

export const useCreateAnnouncementContext = () => {
  return React.useContext(CreateAnnouncementContext);
};