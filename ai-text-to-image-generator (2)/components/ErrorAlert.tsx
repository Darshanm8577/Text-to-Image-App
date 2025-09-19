
import React from 'react';

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    return (
        <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg relative my-4" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default ErrorAlert;
