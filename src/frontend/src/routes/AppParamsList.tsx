import { CleanAnnouncementView } from "../types/CleanAnnouncementView";

export type AppParamsList = {

  'Anúncios': { searchBookId?: string | null, bookName?: string | null };
  'Profile': {};
  'Meus Anúncios': {};
  RequireAuth: {};
  'Criar Conta': {};
  'Meu Perfil': {};
  'Entrar': {};
  'Detalhes do anúncio': { announcement: CleanAnnouncementView };
  'Pesquisar por livro': {};
   "Chat": { chatId?: string };     
}

