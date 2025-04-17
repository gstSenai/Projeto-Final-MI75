import { RelatoriosAnalises } from '@/components/quadrosRelatorios/relatorio'
import { LoadingWrapper } from '@/components/loading/loadingServer';
import RotaPrivada from '@/components/RotaPrivada';

export default function Relatorio() {
    return (
        <LoadingWrapper>
            <RotaPrivada userAutorizado={['Administrador', 'Corretor', 'Editor']}>
                <RelatoriosAnalises />
            </RotaPrivada>
        </LoadingWrapper>
    )
}