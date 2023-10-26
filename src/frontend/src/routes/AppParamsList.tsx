import { CleanAnnouncementView } from "../types/CleanAnnouncementView";

export type AppParamsList = {
  'Anúncios': {};
  'Profile' : {};
  'Meus Anúncios': {};
  RequireAuth: {};
  'Criar Conta': {};
  'Meu Perfil': {};
  'Mensagens': {};
  'Entrar': {};
  'Detalhes do anúncio': { announcement: CleanAnnouncementView }
}