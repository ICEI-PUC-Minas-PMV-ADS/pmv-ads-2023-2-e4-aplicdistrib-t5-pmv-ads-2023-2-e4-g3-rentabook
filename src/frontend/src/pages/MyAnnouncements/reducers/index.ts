import { CleanAnnouncementView } from "../../../types/CleanAnnouncementView";

/**
 * announcementCache
 */

let announcementCache: CleanAnnouncementView[] = [];

/**
 * MyAnnouncementsState
 */

export type MyAnnouncementsState = {
  filter: { rent: boolean, trade: boolean, sale: boolean };
  term: string,
  sort: number | null,
  hasMoreData: boolean,
  announcements: CleanAnnouncementView[],
};

/**
 * MyAnnouncementsActionType
 */

type MyAnnouncementsActionType =
  'select_location' |
  'register_book' |
  'toggle_filter_rent' |
  'toggle_filter_trade' |
  'toggle_filter_sale' |
  'set_sort_filter' |
  'set_search_term' |
  'load_announcements';

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
    case 'toggle_filter_rent':
      return {
        ...state,
        filter: { ...state.filter, rent: !state.filter.rent },
        announcements: filterAnnouncements({
          term: state.term,
          sort: state.sort,
          rent: !state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
        }),
      };

    case 'toggle_filter_trade':
      return {
        ...state,
        filter: { ...state.filter, trade: !state.filter.trade },
        announcements: filterAnnouncements({
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: !state.filter.trade,
          sale: state.filter.sale,
        }),
      };

    case 'toggle_filter_sale':
      return {
        ...state,
        filter: { ...state.filter, sale: !state.filter.sale },
        announcements: filterAnnouncements({
          term: state.term,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: !state.filter.sale,
        })
      };

    case 'set_sort_filter':
      return {
        ...state,
        sort: action.payload,
        announcements: filterAnnouncements({
          term: state.term,
          sort: action.payload,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
        })
      };

    case 'set_search_term':
      return {
        ...state,
        term: action.payload,
        announcements: filterAnnouncements({
          term: action.payload,
          sort: state.sort,
          rent: state.filter.rent,
          trade: state.filter.trade,
          sale: state.filter.sale,
        })
      };

    case 'load_announcements':
      if (action.payload.length == 0) {
        return {
          ...state, hasMoreData: false, announcements: filterAnnouncements({
            term: state.term,
            sort: state.sort,
            rent: state.filter.rent,
            trade: state.filter.trade,
            sale: state.filter.sale,
          })
        };
      } else {
        if (announcementCache.length === 0) {
          announcementCache = [...action.payload];
        } else {
          const payload = action.payload as CleanAnnouncementView[];
          for (let i = 0; i < payload.length; i++) {
            const foundedAnnouncement = announcementCache.find((x) => x.id === payload[i].id);
            if (foundedAnnouncement === undefined) {
              announcementCache.push(payload[i]);
            }
          }
        }
        return {
          ...state, announcements: filterAnnouncements({
            term: state.term,
            sort: state.sort,
            rent: state.filter.rent,
            trade: state.filter.trade,
            sale: state.filter.sale,
          })
        };
      }
  }
  return state;
};

/**
 * Utils functions
 */

const filterAnnouncements = ({
  term,
  sort,
  rent,
  trade,
  sale
}: {
  term: string,
  sort: number | null,
  rent: boolean,
  trade: boolean,
  sale: boolean,
}): CleanAnnouncementView[] => {
  let filteredAnnouncements: CleanAnnouncementView[] = announcementCache;
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
  return filteredAnnouncements;
}