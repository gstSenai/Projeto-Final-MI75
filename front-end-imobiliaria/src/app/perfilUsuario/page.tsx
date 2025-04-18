import { Montserrat } from 'next/font/google';
import EditProfile from '@/components/perfil/EditProfile';
import Appointments from '@/components/agendamentosPerfil/descricaoCard/Appointments';
import { LoadingWrapper } from '@/components/loading/loadingServer';


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export default function PerfilUsuario() {
    return (
        <LoadingWrapper>
            <div className={`${montserrat.className} min-h-screen bg-[#DFDAD0] py-8`}>
                <div className="container mx-auto px-12">
                    <h1 className="text-2xl font-semibold mb-8 pb-2 border-b-2 border-[#702632] w-fit">Perfil do usuário</h1>
                    <EditProfile />
                    <div className="mt-6">
                        <Appointments />
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    );
}