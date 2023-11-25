import { CleanAnnouncementView } from "../../../types/CleanAnnouncementView";

/**
 * MyAnnouncementsState
 */

export type MyAnnouncementsState = {
  announcementCache: CleanAnnouncementView[],
  filter: {
    rent: boolean,
    trade: boolean,
    sale: boolean,
    waitingSend: boolean,
    waitingDelivery: boolean,
    waitingReturn: boolean,
    complete: boolean,
  };
  generalFilter: string;
  term: string;
  sort: number | null;
  hasMoreData: boolean;
  hasReseted: boolean;
  page: number;
  announcements: CleanAnnouncementView[];
};

/**
 * MyAnnouncementsState
 */

export const initialState: MyAnnouncementsState = {
  announcementCache: [],
  filter: {
    rent: false,
    trade: false,
    sale: false,
    waitingSend: false,
    waitingDelivery: false,
    waitingReturn: false,
    complete: false,
  },
  generalFilter: 'todos',
  term: '',
  sort: null,
  page: 0,
  hasMoreData: true,
  hasReseted: false,
  announcements: [],
}

/**
 * MyAnnouncementsActionType
 */

type MyAnnouncementsActionType =
  'initialize' |
  'select_location' |
  'register_book' |
  'toggle_filter_rent' |
  'toggle_filter_trade' |
  'toggle_filter_sale' |
  'set_sort_filter' |
  'set_search_term' |
  'load_announcements' |
  'set_has_reseted' |
  'set_page' |
  'set_general_filter' |
  'toggle_filter_waiting_send' |
  'toggle_filter_waiting_delivery' |
  'toggle_filter_waiting_return' |
  'toggle_filter_complete' |
  'reset';

/**
 * MyAnnouncementsAction
 */

export type MyAnnouncementsAction = {
  type: MyAnnouncementsActionType;
  payload?: any;
};

/**
 * MyAnnouncementsReducer
 */

export const MyAnnouncementsReducer = (
  state: MyAnnouncementsState,
  action: MyAnnouncementsAction,
): MyAnnouncementsState => {
  switch (action.type) {
    case 'initialize':
      return {
        announcementCache: [],
        filter: {
          rent: false,
          trade: false,
          sale: false,
          waitingSend: false,
          waitingDelivery: false,
          waitingReturn: false,
          complete: false,
        },
        generalFilter: 'todos',
        term: '',
        sort: null,
        page: 0,
        hasMoreData: true,
        hasReseted: false,
        announcements: [],
      };

    case 'toggle_filter_rent':
      return {
        ...state,
        filter: { ...state.filter, rent: !state.filter.rent },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: !state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        }),
      };

    case 'toggle_filter_trade':
      return {
        ...state,
        filter: { ...state.filter, trade: !state.filter.trade },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: !state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        }),
      };

    case 'set_has_reseted':
      return { ...state, hasReseted: action.payload };

    case 'toggle_filter_sale':
      return {
        ...state,
        filter: { ...state.filter, sale: !state.filter.sale },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: !state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        })
      };

    case 'set_sort_filter':
      return {
        ...state,
        sort: action.payload,
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: action.payload,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        })
      };

    case 'set_search_term':
      return {
        ...state,
        term: action.payload,
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: action.payload,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        })
      };

    case 'load_announcements':
      if (action.payload.length == 0) {
        return {
          ...state, hasReseted: false, hasMoreData: false, announcements: filterAnnouncements({
            announcementCache: state.announcementCache,
            generalFilter: state.generalFilter,
            term: state.term,
            sort: state.sort,
            rent: state.filter.rent,
            trade: state.filter.trade,
            sale: state.filter.sale,
            waitingSend: state.filter.waitingSend,
            waitingDelivery: state.filter.waitingDelivery,
            waitingReturn: state.filter.waitingReturn,
            complete: state.filter.complete,
          })
        };
      } else {
        if (state.announcementCache.length === 0) {
          state.announcementCache = [...action.payload];
        } else {
          const payload = action.payload as CleanAnnouncementView[];
          for (let i = 0; i < payload.length; i++) {
            const foundedAnnouncement = state.announcementCache.find((x) => x.id === payload[i].id);
            if (foundedAnnouncement === undefined) {
              state.announcementCache.push(payload[i]);
            }
          }
        }
        return {
          ...state, hasReseted: false, hasMoreData: true, announcements: filterAnnouncements({
            announcementCache: state.announcementCache,
            generalFilter: state.generalFilter,
            term: state.term,
            sort: state.sort,
            rent: state.filter.rent,
            trade: state.filter.trade,
            sale: state.filter.sale,
            waitingSend: state.filter.waitingSend,
            waitingDelivery: state.filter.waitingDelivery,
            waitingReturn: state.filter.waitingReturn,
            complete: state.filter.complete,
          })
        };
      }

    case 'set_page':
      return { ...state, page: action.payload };

    case 'set_general_filter':
      const newState = {
        ...state, generalFilter: action.payload, filter: {
          rent: false,
          trade: false,
          sale: false,
          waitingSend: false,
          waitingDelivery: false,
          waitingReturn: false,
          complete: false,
        }
      };

      return {
        ...newState, announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: action.payload as string,
          term: newState.term,
          sort: newState.sort,
          rent: newState.filter.rent,
          trade: newState.filter.trade,
          sale: newState.filter.sale,
          waitingSend: newState.filter.waitingSend,
          waitingDelivery: newState.filter.waitingDelivery,
          waitingReturn: newState.filter.waitingReturn,
          complete: newState.filter.complete,
        })
      };

    case 'toggle_filter_waiting_send':
      return {
        ...state,
        filter: { ...state.filter, waitingSend: !state.filter.waitingSend },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: !state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        })
      };

    case 'toggle_filter_waiting_delivery':
      return {
        ...state,
        filter: { ...state.filter, waitingDelivery: !state.filter.waitingDelivery },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: !state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: state.filter.complete,
        })
      };

    case 'toggle_filter_waiting_return':
      return {
        ...state,
        filter: { ...state.filter, waitingReturn: !state.filter.waitingReturn },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: !state.filter.waitingReturn,
          complete: state.filter.complete,
        })
      };

    case 'toggle_filter_complete':
      return {
        ...state,
        filter: { ...state.filter, complete: !state.filter.complete },
        announcements: filterAnnouncements({
          announcementCache: state.announcementCache,
          generalFilter: state.generalFilter,
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
          waitingSend: state.filter.waitingSend,
          waitingDelivery: state.filter.waitingDelivery,
          waitingReturn: state.filter.waitingReturn,
          complete: !state.filter.complete,
        })
      };

    case 'reset':
      return {
        ...state, announcementCache: [], hasReseted: true, hasMoreData: true, page: 0, announcements: [],
      };
  }
  return state;
};

/**
 * Utils functions
 */

const filterAnnouncements = ({
  announcementCache,
  generalFilter,
  term,
  sort,
  rent,
  trade,
  sale,
  waitingSend,
  waitingDelivery,
  waitingReturn,
  complete,
}: {
  announcementCache: CleanAnnouncementView[],
  generalFilter: string,
  term: string,
  sort: number | null,
  rent: boolean,
  trade: boolean,
  sale: boolean,
  waitingSend: boolean,
  waitingDelivery: boolean,
  waitingReturn: boolean,
  complete: boolean,
}): CleanAnnouncementView[] => {
  let filteredAnnouncements: CleanAnnouncementView[] = announcementCache;
  if (generalFilter.length > 0) {
    if (generalFilter === 'disponiveis') {
      filteredAnnouncements = filteredAnnouncements.filter((x) => x.isAvailable);
    }
    if (generalFilter === 'negociados') {
      filteredAnnouncements = filteredAnnouncements.filter((x) => !x.isAvailable);
    }
  }
  if (term.length > 0) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => (
      x.book.title?.toLowerCase().includes(term.toLowerCase()) ||
      x.book.publisher?.toLowerCase().includes(term.toLowerCase())
    ));
  }
  if (sort) {
    filteredAnnouncements = filteredAnnouncements.sort((a, b) => {
      switch (sort) {
        case 1: // Mais recente
          {
            return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
          }

        case 2: // Mais antigo
          {
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          }

        case 3: // Menor preço para aluguel
          {
            if (a.valueForRent && b.valueForRent) {
              return a.valueForRent - b.valueForRent;
            }
          }

        case 4: // Maior preço para aluguel
          {
            if (a.valueForRent && b.valueForRent) {
              return b.valueForRent - b.valueForRent;
            }
          }

        case 5: // Menor preço para compra
          {
            if (a.valueForSale && b.valueForSale) {
              return a.valueForSale - b.valueForSale;
            }
          }

        case 6: // Maior preço para compra
          {
            if (a.valueForSale && b.valueForSale) {
              return b.valueForSale - b.valueForSale;
            }
          }
      }
      return 0;
    });
  }
  if (rent) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => x.rent);
  }
  if (trade) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => x.trade);
  }
  if (sale) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => x.sale);
  }
  if (waitingSend) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => {
      const status = x.status ?? "";
      return status.toLowerCase() === 'aguardando envio'
    });
  }
  if (waitingDelivery) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => {
      const status = x.status ?? "";
      return status.toLowerCase() === 'aguadando entrega'
    });
  }
  if (waitingReturn) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => {
      const status = x.status ?? "";
      return status.toLowerCase() === 'aguardando retorno'
    });
  }
  if (complete) {
    filteredAnnouncements = filteredAnnouncements.filter((x) => {
      const status = x.status ?? "";
      return status.toLowerCase() === 'finalizado'
    });
  }
  return filteredAnnouncements;
}