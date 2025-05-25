import React, { useState } from "react";

const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 13; hour <= 21; hour++) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
};

const RestaurantBooking: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [guests, setGuests] = useState<number>(2);
    const [showGuestPopup, setShowGuestPopup] = useState<boolean>(false);
    const [date, setDate] = useState<string>(getToday());
    const [time, setTime] = useState<string>("13:00");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const formatDate = (dateStr: string): string => {
        const [year, month, day] = dateStr.split("-");
        return `${parseInt(month)}/${parseInt(day)}/${year}`;
    };

    const resetForm = () => {
        setStep(1);
        setGuests(2);
        setShowGuestPopup(false);
        setDate(getToday());
        setTime("13:00");
        setName("");
        setPhone("");
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Reservation confirmed for ${guests} at ${formatDate(date)} ${time}`);
        resetForm();
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md shadow-md p-6">
                {step === 1 && (
                    <>
                        <h2 className="font-bold text-lg mb-2">Book a table</h2>
                        <p className="mb-4 text-sm text-gray-700">
                            This is where you'll add the details of your booking
                        </p>
                        <div className="mb-3 flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-500 mb-1 block w-24">
                                People
                            </label>
                            <div
                                onClick={() => setShowGuestPopup(!showGuestPopup)}
                                className="bg-blue-100 p-2 rounded-md cursor-pointer flex-1"
                            >
                                {guests} {guests === 1 ? "person" : "persons"}
                            </div>
                            {showGuestPopup && (
                                <div className="grid grid-cols-5 gap-4 bg-white shadow-lg rounded-md p-4 mt-2">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setGuests(i + 1);
                                                setShowGuestPopup(false);
                                            }}
                                            className="bg-blue-50 border rounded-md h-10 w-10 text-sm hover:bg-blue-200"
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-500 mb-1 block w-24">
                                Date
                            </label>
                            <input
                                placeholder="Select date"
                                type="date"
                                className="bg-blue-100 p-2 rounded-md flex-1"
                                value={date}
                                min={getToday()}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-500 mb-1 block w-24">
                                Time
                            </label>
                            <select
                                className="bg-blue-100 p-2 rounded-md flex-1"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                {generateTimeSlots().map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Book now
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="font-bold text-lg mb-4">Contact details</h2>
                        <div className="bg-blue-100 p-4 rounded-md text-sm mb-4">
                            You are making a reservation for <strong>{guests} persons</strong>, on{' '}
                            <strong>{formatDate(date)} at {time}</strong>
                        </div>
                        <form onSubmit={handleConfirm}>
                            <div className="mb-3 flex items-center gap-2">
                                <label className="text-sm font-medium block mb-1 w-24">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div className="mb-3 flex items-center gap-2">
                                <label className="text-sm font-medium block mb-1 w-24">Phone number</label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Confirm reservation
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default RestaurantBooking;
