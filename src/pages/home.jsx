
import React, { useState } from "npm:react";

const HomePage = () => {
    const [country, setCountry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (country.trim() !== "") {
            window.location.href=`/pages/${country}`;
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">GDP Data Viewer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Enter Country Code (e.g., CN, US)</span>
                        </label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input input-bordered"
                            placeholder="Country Code"
                            required
                        />
                    </div>
                    <button className="btn btn-primary w-full" type="submit">
                        View GDP Data
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;