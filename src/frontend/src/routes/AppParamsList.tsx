import { CleanAnnouncementView } from "../types/CleanAnnouncementView";

export type AppParamsList = {
  'Anúncios': {};
  'Meus Anúncios': {};
  RequireAuth: {};
  'Criar Conta': {};
  'Meu Perfil': {};
  'Mensagens': {};
  'Entrar': {};
  'Detalhes do anúncio': { announcement: CleanAnnouncementView }
}