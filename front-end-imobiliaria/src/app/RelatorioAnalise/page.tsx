import { RelatoriosAnalises } from '@/components/quadrosRelatorios/relatorio'
import { LoadingWrapper } from '@/components/loading/loadingServer';

export default function Relatorio() {
    return (
        <LoadingWrapper>
            <RelatoriosAnalises />
        </LoadingWrapper>
    )
}