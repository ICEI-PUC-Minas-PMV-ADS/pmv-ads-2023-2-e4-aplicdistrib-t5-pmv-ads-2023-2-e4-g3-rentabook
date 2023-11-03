import { CleanAnnouncementView } from "../types/CleanAnnouncementView";
import { Negotiations } from "../types/Negotiations";
import { RentView } from "../types/RentView";
import { SaleView } from "../types/SaleView";
import { TradeView } from "../types/TradeView";

export type AppParamsList = {

  'Anúncios': {};
  'Profile': {};
  'Meus Anúncios': { reset?: boolean };
  'Criar Anúncio': { announcementId?: string };
  'RequireAuth': {};
  'Criar Conta': {};
  'Meu Perfil': {};
  'Entrar': {};
  'Avalie a negociação': { negotiation: "RENT" | "SALE" | "TRADE", idNegotiation: string };
  'Detalhes do anúncio': { announcement: CleanAnnouncementView };
  'Pesquisar por livro': {};
  'Chat': { chatId?: string };

}

