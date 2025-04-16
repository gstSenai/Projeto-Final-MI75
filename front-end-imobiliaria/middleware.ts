import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const tipoConta = request.cookies.get('tipo_conta')?.value;

    const paginasBloqueadas: { [key: string]: string[] } = {
        'Administrador': ['/paginaCorretor', '/paginaEditor', '/paginaInicial'],
        'Corretor': ['/paginaAdministrador', '/paginaEditor', '/paginaInicial'],
        'Editor': ['/paginaAdministrador', '/paginaCorretor', '/paginaInicial'],
        'Usuario': ['/paginaAdministrador', '/paginaCorretor', '/paginaEditor'],
    };

    if (tipoConta && paginasBloqueadas[tipoConta]?.includes(pathname)) {
        return NextResponse.redirect(new URL('/nao-autorizado', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/paginaAdministrador',
    '/paginaCorretor',
    '/paginaEditor',
    '/paginaInicial',
    '/ola',
  ],
};
