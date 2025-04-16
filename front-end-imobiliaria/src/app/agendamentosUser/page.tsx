import AgendamentosUsuario from "@/components/agendamentosPerfil/descricaoCard/Appointments";
import { LoadingWrapper } from "@/components/loading/loadingServer";
export default function Home() {
  return (
    <main className="bg-[#DFDAD0] min-h-screen flex items-center justify-center">
      <LoadingWrapper>
        <AgendamentosUsuario />
      </LoadingWrapper>
    </main>
  );
}
