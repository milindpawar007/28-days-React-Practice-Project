import React from "react";

interface RatingProps {
    value: number; // expects a value from 0 to 10
}

const Rating: React.FC<RatingProps> = ({ value }) => {
    const rating = Math.round(value / 2); // Convert 0-10 scale to 0-5 stars

    return (
        <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={i < rating ? "#FFD700" : "#E0E0E0"}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: 2 }}
                >
                    <polygon points="10,1.5 12.6,7.5 19,8 14,12.5 15.5,18.5 10,15.2 4.5,18.5 6,12.5 1,8 7.4,7.5" />
                </svg>
            ))}
            <span style={{ marginLeft: 6, fontSize: 14, color: "#888" }}>
                {value?.toFixed(1) ?? "N/A"}
            </span>
        </div>
    );
};

export default Rating;