import React from "react";

const Loader: React.FC = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "40px 0",
        }}
    >
        <div
            className="loader"
            style={{
                border: "6px solid #f3f3f3",
                borderTop: "6px solid #007bff",
                borderRadius: "50%",
                width: 48,
                height: 48,
                animation: "spin 1s linear infinite",
            }}
        />
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}
        </style>
        <span
            style={{
                marginTop: 16,
                color: "#007bff",
                fontWeight: 500,
                fontSize: 18,
            }}
        >
            Loading movies...
        </span>
    </div>
);

export default Loader;