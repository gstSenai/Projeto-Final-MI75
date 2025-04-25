import { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose?: () => void;
}

export function Notification({ 
    message, 
    type = 'success', 
    duration = 3000,
    onClose 
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'info':
                return 'bg-blue-500';
            default:
                return 'bg-green-500';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`${getBackgroundColor()} text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-slide-in`}>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {type === 'success' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    )}
                    {type === 'error' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    )}
                    {type === 'info' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                </svg>
                {message}
            </div>
        </div>
    );
} 