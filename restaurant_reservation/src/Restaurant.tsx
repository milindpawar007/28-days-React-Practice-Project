
import React, { useState } from 'react'

const Restaurant = () => {
    const [showGuestPopup, setShowGuestPopup] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState("12:00");
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6" >
                <h1 className="text-black font-bold text-2xl mb-2 text-left w-full">Book a table</h1>
                <p className="text-black mb-4 text-left w-full">This is where you'll add the details of your booking.</p>
                <form className="flex flex-col items-center justify-center w-full">
                    <div className="flex items-center w-full mb-2">
                        <label className="text-left text-black font-medium mr-2 w-1/3" htmlFor="guests">
                            Number of guests
                        </label>
                        <div className="relative w-2/3">
                            <button
                                type="button"
                                className="border-2 border-gray-300 rounded-md p-2 bg-white text-black cursor-pointer select-none w-full text-left"
                                aria-haspopup="listbox"
                                aria-expanded={showGuestPopup ? "true" : "false"}
                                onClick={() => setShowGuestPopup(!showGuestPopup)}
                            >
                                {selectedGuests} {selectedGuests === 1 ? "person" : "people"}
                            </button>
                            {showGuestPopup && (
                                <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 w-full">
                                    <div className="grid grid-cols-5 gap-2">
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <div
                                                key={i + 1}
                                                className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer border-2 ${
                                                    selectedGuests === i + 1
                                                        ? "bg-blue-500 text-white border-blue-500"
                                                        : "bg-gray-100 text-black border-gray-300"
                                                } hover:bg-blue-100`}
                                                onClick={() => {
                                                    setSelectedGuests(i + 1);
                                                    setShowGuestPopup(false);
                                                }}
                                            >
                                                {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center w-full mb-2">
                        <label className="text-left text-black font-medium mr-2 w-1/3" htmlFor="date">
                            Select date
                        </label>
                        <input
                            id="date"
                            type="date"
                            placeholder="Select date"
                            className="border-2 border-gray-300 rounded-md p-2 w-2/3 text-black bg-white"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]} // Disable past dates
                        />
                    </div>

                    <div className="flex items-center w-full mb-4">
                        <label className="text-left text-black font-medium mr-2 w-1/3" htmlFor="time">
                            Time
                        </label>
                        <select
                            id="time"
                            className="border-2 border-gray-300 rounded-md p-2 w-2/3 text-black bg-white"
                            defaultValue={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            {Array.from({ length: 17 }, (_, i) => {
                                const hour = 12 + Math.floor(i / 2);
                                const minute = i % 2 === 0 ? "00" : "30";
                                const ampm = hour < 12 ? "am" : "pm";
                                const displayHour = hour > 12 ? hour - 12 : hour;
                                const label = `${displayHour}:${minute} ${ampm}`;
                                const value = `${hour.toString().padStart(2, "0")}:${minute}`;
                                return (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-2 m-2 w-full"
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Restaurant
