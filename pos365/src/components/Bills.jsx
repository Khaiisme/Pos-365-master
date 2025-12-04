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
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="p-4 w-full max-w-lg"> {/* wider container */}
        <p className="text-2xl font-bold mb-4 text-center">Rechnung</p>

        <div className="space-y-4">
          {bills.map((bill, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow bg-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">
                  Tisch {bill.table}
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

              {/* Items */}
              <div className="mt-2">
                {bill.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-lg border-b py-2 last:border-0"
                  >
                    <span className="truncate w-[65%]">{item.name}</span>
                    <span className="font-medium">{item.price}€</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-right mt-3 font-bold text-green-700 text-xl">
                Total: {bill.total.toFixed(2)}€
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
