import { useEffect, useState } from "react";

export default function BillsPage() {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("bills")) || [];

        // Sort by date (newest first)
        saved.sort((a, b) => new Date(b.date) - new Date(a.date));

        setBills(saved);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rechnung</h1>



            <div className="space-y-4">
                {bills.map((bill, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-3 shadow bg-white"
                    >
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">
                                Table {bill.table}
                            </h2>
                            <span className="text-sm text-gray-500">
                                {new Date(bill.date).toLocaleString("de-DE", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>

                        <div className="mt-2">
                            {bill.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between text-lg border-b py-1 last:border-0"
                                >
                                    <span>{item.name}</span>
                                    <span>{item.price}€</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-right mt-3 font-bold text-green-700 text-xl">
                            Total: {bill.total.toFixed(2)}€
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
