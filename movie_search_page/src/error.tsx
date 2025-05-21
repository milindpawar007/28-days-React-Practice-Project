import React from 'react';

type ErrorProps = {
    message: string;
};

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => (
    <div
        style={{
            background: '#ffeaea',
            color: '#d8000c',
            border: '1px solid #d8000c',
            borderRadius: 8,
            padding: '18px 24px',
            margin: '24px 0',
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(216,0,12,0.08)'
        }}
    >
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            style={{ verticalAlign: 'middle', marginRight: 8 }}
        >
            <circle cx="12" cy="12" r="12" fill="#d8000c" opacity="0.15" />
            <path d="M12 7v5M12 16h.01" stroke="#d8000c" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {message}
    </div>
);

export default ErrorMessage;