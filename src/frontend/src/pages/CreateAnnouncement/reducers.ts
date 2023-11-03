import React from "react";
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView";
import { PrivateAddress } from "../../types/PrivateAddress";
import { BookView } from "../../types/BookView";

/**
 * CreateAnnouncementState
 */

export type CreateAnnouncementState = {
  announcement: CleanAnnouncementView | null,
  sale: boolean,
  trade: boolean,
  rent: boolean,
  saleValue: string | null,
  rentValue: string | null,
  searchTerm: string | null,
  userAddresses: PrivateAddress[],
  selectedAddress: PrivateAddress | null,
  books: BookView[],
  selectedBook: BookView | null,
  validateInput: boolean,
  description: string,
  uploadedFiles: File[],
  hasMoreBookData: boolean,
  nextBooksPage: number,
};

/**
 * CreateAnnouncementAction
 */

export type CreateAnnouncementAction = {
  type: 'set_announcement' | 'set_sale' | 'set_rent' |
  'set_trade' | 'set_sale_value' | 'set_rent_value' |
  'set_search_term' | 'set_user_addresses' | 'set_selected_address' |
  'set_books' | 'set_selected_book' | 'set_validate_input' | 'set_description' |
  'set_uploaded_files' | 'set_has_more_book_data' | 'clear_books',
  payload?: any,
};

/**
 * initialCreateAnnouncementState
 */

export const initialCreateAnnouncementState: CreateAnnouncementState = {
  announcement: null,
  sale: false,
  trade: false,
  rent: false,
  saleValue: null,
  rentValue: null,
  searchTerm: null,
  userAddresses: [],
  selectedAddress: null,
  books: [],
  selectedBook: null,
  validateInput: false,
  description: '',
  uploadedFiles: [],
  hasMoreBookData: false,
  nextBooksPage: 0,
};

/**
 * CreateAnnouncementReducer
 */

export const CreateAnnouncementReducer = (
  state: CreateAnnouncementState,
  action: CreateAnnouncementAction,
): CreateAnnouncementState => {
  switch (action.type) {
    case 'set_announcement':
      {
        const newState: CreateAnnouncementState = { ...state, announcement: action.payload };

        newState.saleValue = newState.announcement?.valueForSale?.toString() ?? null;
        newState.rentValue = newState.announcement?.valueForRent?.toString() ?? null;

        newState.sale = newState.announcement?.sale ?? false;
        newState.rent = newState.announcement?.rent ?? false;
        newState.trade = newState.announcement?.trade ?? false;

        newState.selectedBook = newState.announcement?.book ?? null;

        newState.description = newState.announcement?.description ?? "";

        return newState;
      }

    case 'set_sale':
      {
        const newState = { ...state, sale: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_rent':
      {
        const newState = { ...state, rent: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_trade':
      {
        const newState = { ...state, trade: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_sale_value':
      {
        const newState = { ...state, saleValue: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_rent_value':
      {
        const newState = { ...state, rentValue: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_selected_book':
      {
        const newState = { ...state, selectedBook: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_selected_address':
      {
        const newState = { ...state, selectedAddress: action.payload } as CreateAnnouncementState;
        newState.validateInput = validateInputs(newState);
        return newState;
      }

    case 'set_search_term': return { ...state, searchTerm: action.payload };
    case 'set_user_addresses': return { ...state, userAddresses: [...action.payload] };
    case 'set_books':
      {
        return { ...state, books: [...state.books, ...action.payload.books], nextBooksPage: action.payload.nextBooksPage };
      }
    case 'set_validate_input': return { ...state, validateInput: action.payload };
    case 'set_description': return { ...state, description: action.payload };
    case 'set_uploaded_files': return { ...state, uploadedFiles: [...action.payload] };
    case 'set_has_more_book_data': return { ...state, hasMoreBookData: action.payload };
    case 'clear_books': return { ...state, books: [] };
  }
  return state;
};

const validateInputs = (state: CreateAnnouncementState): boolean => {
  if (!state.selectedBook) {
    return false;
  }
  if (state.rent && !state.rentValue) {
    return false;
  }
  if (state.sale && !state.saleValue) {
    return false;
  }
  if (!state.rent && !state.sale && !state.trade) {
    return false;
  }
  if (!state.selectedAddress) {
    return false;
  }
  return true;
}

/**
 * useCreateAnnouncementReducer
 */

export const useCreateAnnouncementReducer = (): [CreateAnnouncementState, React.Dispatch<CreateAnnouncementAction>] => {
  return React.useReducer(CreateAnnouncementReducer, initialCreateAnnouncementState)
};