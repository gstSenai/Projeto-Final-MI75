import { Suspense } from 'react';

export function LoadingServer() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#DFDAD0]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#702632]"></div>
        </div>
    );
}

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadingServer />}>
            {children}
        </Suspense>
    );
}