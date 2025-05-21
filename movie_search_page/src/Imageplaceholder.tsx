import React from "react";

const ImagePlaceholder: React.FC = () => (
    <div
        style={{
            width: 200,
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            borderRadius: 8,
        }}
    >
        <svg width="120" height="180" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(100, 100)">
                <rect x="40" y="40" width="120" height="80" rx="10" fill="white" />
                <circle cx="100" cy="80" r="20" fill="black" />
                <circle cx="140" cy="60" r="6" fill="black" />
                <line x1="0" y1="0" x2="20" y2="0" stroke="white" strokeWidth="6" />
                <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="6" />
                <line x1="160" y1="0" x2="140" y2="0" stroke="white" strokeWidth="6" />
                <line x1="160" y1="0" x2="160" y2="20" stroke="white" strokeWidth="6" />
                <line x1="0" y1="120" x2="20" y2="120" stroke="white" strokeWidth="6" />
                <line x1="0" y1="120" x2="0" y2="100" stroke="white" strokeWidth="6" />
                <line x1="160" y1="120" x2="160" y2="100" stroke="white" strokeWidth="6" />
                <line x1="160" y1="120" x2="140" y2="120" stroke="white" strokeWidth="6" />
            </g>
        </svg>
    </div>
);

export default ImagePlaceholder;