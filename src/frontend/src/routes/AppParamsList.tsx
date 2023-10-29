import { CleanAnnouncementView } from "../types/CleanAnnouncementView";

export type AppParamsList = {

  'Anúncios': { searchBookId?: string | null, bookName?: string | null };
  'Profile': {};
  'Meus Anúncios': {};
  'Criar Anúncio': { announcementId?: string };
  RequireAuth: {};
  'Criar Conta': {};
  'Meu Perfil': {};
  'Mensagens': {};
  'Entrar': {};
  'Detalhes do anúncio': { announcement: CleanAnnouncementView };
  'Pesquisar por livro': {};
   Chat: { chatId: string };     
}

