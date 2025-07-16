import { useState, useEffect } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { FiRotateCcw } from 'react-icons/fi';
// Sample dish data (name and price)
const dishes = [
  { name: "M1", price: 11.9 },
  { name: "M2a.Mit Tofu", price: 10.9 },
  { name: "M2b.Mit gebratem Hähnchen", price: 11.9 },
  { name: "M3", price: 9.5 },
  { name: "M4", price: 9.5 },
  { name: "M5", price: 8.5 },
  { name: "M6", price: 10.5 },
  { name: "M7", price: 10.9 },
  { name: "M8a.Mit Tofu", price: 10.5 },
  { name: "M8b.Mit Tofu", price: 11.9 },
  { name: "M9", price: 11.9 },
  { name: "Kinder Menu 1", price: 8 },
  { name: "Kinder Menu 2", price: 9 },
  { name: "B1.Duftreis", price: 2 },
  { name: "B2.SüBkartoffel", price: 2.5 },
  { name: "B3.Reisnudeln", price: 2 },
  { name: "B4.Udon Nudeln", price: 3 },
  { name: "B5.Extra Sauce", price: 1 },
  { name: "D1.Mochi Eis", price: 7.5 },
  { name: "D2.Grüntee Eis", price: 6.9 },
  { name: "D3.Mango Reis", price: 8.5 },
  { name: "D4.Chuoi chien", price: 7.5 },


  { name: "1a.Kokossupe Tofu", price: 5.5 },
  { name: "1b.Kokossuppe Hähnchen", price: 6.5 },
  { name: "1c.Kokossuppe Garnelen", price: 7 },
  { name: "2a.Misosuppe Tofu", price: 5 },
  { name: "2b.Misosuppe Lachs", price: 7.5 },
  { name: "3.Tom Yum Suppe ", price: 7.5 },
  { name: "4a.Sommerrollen", price: 6.5 },
  { name: "4b.Sommerrollen", price: 7 },
  { name: "4c.Sommerrollen", price: 7.5 },
  { name: "5.Frühlingsrollen", price: 6.9 },
  { name: "6.Frühlingsrollen Vegan", price: 6.5 },
  { name: "6a.Gyoza Vegan", price: 6.5 },
  { name: "6a.Gyoza Hähnchen", price: 6.9 },

  { name: "7a.Ha Cao ", price: 7.5 },
  { name: "7b.Ha Cao ", price: 8.5 },
  { name: "8.Ca Vien Chien", price: 7.5 },
  { name: "9.Ebi Tempura", price: 7.5 },
  { name: "10.Tom Chien Com", price: 8.5 },
  { name: "11.Chichken Tempura", price: 7.9 },
  { name: "12.Yakitori", price: 7.5 },
  { name: "13a.Tataki", price: 11 },
  { name: "13b.Tataki", price: 16 },
  { name: "13c.Tataki", price: 13 },
  { name: "14a.Carpaccio", price: 13 },
  { name: "14b.Carpaccio", price: 14 },
  { name: "15.Edamame", price: 6.5 },
  { name: "16.Seetangsalat ", price: 7 },
  { name: "17.Avocadosalat", price: 8.5 },
  { name: "18.Tofu-Tempura Salat", price: 8.5 },
  { name: "19.Mango-Salat mit Hähnchen", price: 9.5 },
  { name: "20.Kimchi-Salat", price: 5.5 },
  { name: "21.Lachssalat", price: 13.2 },
  { name: "22a.Pho Tofu", price: 13.5 },
  { name: "22b.Pho Hühner", price: 14.5 },
  { name: "22c.Pho Rind", price: 15.5 },
  { name: "23a.Pho Curry Tofu", price: 13.9 },
  { name: "23b.Pho Curry Hühner", price: 14.9 },
  { name: "23c.Pho Curry Rind", price: 15.9 },
  { name: "23d.Pho Curry Garnelen", price: 16.9 },

  { name: "24a.Bun Nem Schweinehackfleisch", price: 15.5 },
  { name: "24a.Bun Nem Vegan", price: 14.5 },
  { name: "25.Bun Bo Nam Bo", price: 15.5 },
  { name: "26.Bun Tofu", price: 14.5 },
  { name: "27.Bun Thit Nuong", price: 15.9 },
  { name: "28.Bun Hai San", price: 16.9 },


  { name: "29a.Udon Kokos-Suppe Tofu", price: 13.9 },
  { name: "29b.Udon Kokos-Suppe gegrillte Hähnchen", price: 16.9 },
  { name: "29b.Udon Kokos-Suppe gebraten Hähnchen", price: 14.9 },
  { name: "29c.Udon Kokos-Suppe Rind", price: 15.9 },
  { name: "29d.Udon Kokos-Suppe Garnelen", price: 16.9 },
  { name: "30.Udon Tom-Yum-Suppe", price: 16.5 },

  { name: "31a.Gebraten Udon-Nudeln Tofu", price: 13.9 },
  { name: "31b.Gebraten Udon-Nudeln gegrillte Hähnchen", price: 16.9 },
  { name: "31b.Gebraten Udon-Nudeln gebacken Hähnchen", price: 15.5 },
  { name: "31c.Gebraten Udon-Nudeln Rind", price: 15.9 },
  { name: "31d.Gebraten Udon-Nudeln Garnelen", price: 16.9 },
  { name: "31e.Gebraten Udon-Nudeln Ente", price: 16.9 },


  { name: "32a.Ramen Tofu", price: 14.5 },
  { name: "32b.Ramen Hühner", price: 15.5 },
  { name: "32c.Ramen Rind", price: 16.5 },
  { name: "32d.Ramen Garnelen", price: 17.5 },

  { name: "33.Rindersteak Pfeffersauce", price: 23.5 },
  { name: "34.Rindersteak Teriyaki", price: 24.5 },
  { name: "35.Mai-Hähnchen gegrillt", price: 20.5 },
  { name: "36.Thot Aubergine Basilikum", price: 18.5 },
  { name: "37.Französische Entenbrust", price: 23.5 },

  { name: "38.Französische Entenbrust mit Pferffersauce", price: 24.5 },

  { name: "39.Gegrillter Lachs", price: 22.5 },
  { name: "40.Gegrillter Lachs mit Teriyaki", price: 22.9 },

  { name: "41a.Curry Tofu", price: 13.9 },
  { name: "41a.Curry Tofu Tempura", price: 14.5 },
  { name: "41b.Curry gegrillte Hähnchen", price: 16.5 },
  { name: "41b.Curry gebacken Hähnchen", price: 15.5 },
  { name: "41b.Curry gebraten Hähnchen", price: 14.5 },
  { name: "41c.Curry Rind", price: 15.5 },
  { name: "41d.Curry Garnelen", price: 16.9 },
  { name: "41e.Curry Ente", price: 16.9 },

  { name: "42a.Erdnuss Tofu", price: 13.5 },
  { name: "42a.Erdnuss Tofu Tempura", price: 14.5 },
  { name: "42b.Erdnuss gegrillte Hähnchen", price: 16.5 },
  { name: "42b.Erdnuss gebacken Hähnchen", price: 15.5 },
  { name: "42c.Erdnuss Ente", price: 16.9 },

  { name: "43a.Sot Xa Tofu", price: 13.5 },
  { name: "43a.Sot Xa Tofu Tempura", price: 14.5 },
  { name: "43b.Sot Xa gegrillte Hähnchen", price: 16.5 },
  { name: "43b.Sot Xa gebacken Hähnchen", price: 15.5 },
  { name: "43b.Sot Xa gebraten Hähnchen", price: 14.5 },
  { name: "43c.Sot Xa Ente", price: 16.9 },
  { name: "43d.Sot Xa Garnelen", price: 16.9 },

  { name: "44a.Teriyaki gebacken Hähnchen", price: 15.9 },
  { name: "44a.Teriyaki gebraten Hähnchen", price: 14.5 },
  { name: "44b.Teriyaki Garnelen", price: 17.9 },
  { name: "44c.Teriyaki Ente", price: 17.5 },

  { name: "45a.Teriyaki Tofu", price: 13.5 },
  { name: "45b.Teriyaki Hähnchen", price: 14.5 },
  { name: "45c.Teriyaki Rind", price: 14.9 },
  { name: "45d.Teriyaki Garnelen", price: 15.9 },

  { name: "60.Futo Big", price: 8.9 },
  { name: "61.Futo Big Roll", price: 8.2 },
  { name: "62.Tetsu", price: 5.9 },
  { name: "63.Tekka", price: 5.9 },
  { name: "64.Sake", price: 5.4 },
  { name: "65.Surimi", price: 4.5 },
  { name: "66.Kappa", price: 4.2 },
  { name: "67.Avocado", price: 4.7 },

  { name: "68.Ebi", price: 5.9 },
  { name: "69.Inari Avocado", price: 5.2 },
  { name: "70.Inari", price: 4.5 },
  { name: "71.Oshinko", price: 4.2 },
  { name: "72.Sake", price: 5.8 },
  { name: "73.Hot Sake", price: 5.5 },
  { name: "74.Hot Tekka", price: 5.9 },
  { name: "75.Spicy Tekka", price: 5.9 },
  { name: "76.Crunchy", price: 8.2 },
  { name: "77.Unagi Maki", price: 5.9 },

  { name: "80.Sake", price: 5.2 },
  { name: "81.Maguro", price: 5.5 },
  { name: "82.Tobiko", price: 5.5 },
  { name: "83.Tamago", price: 4.6 },
  { name: "84.Oshinko", price: 4.6 },
  { name: "85.Inari", price: 4.5 },
  { name: "86.Ebi", price: 5.5 },
  { name: "87.Avocado", price: 4.9 },
  { name: "88.Unagi", price: 5.4 },
  { name: "89.Lachs", price: 5.2 },
  { name: "90.Thunfisch", price: 5.5 },
  { name: "91.Anh Nigiri", price: 7.5 },
  { name: "92.Loop", price: 9.2 },
  { name: "93.Sake Mango", price: 9.9 },
  { name: "94.Alaska", price: 9.9 },
  { name: "95.Sake Avocado", price: 10.5 },
  { name: "96.Tamago", price: 9 },
  { name: "97.Hot Sake", price: 10.5 },
  { name: "98.Hot Maguro", price: 11 },
  { name: "99.Yakitori", price: 10.5 },
  { name: "100.Philadelphia", price: 10.5 },
  { name: "101.Tempura", price: 10.9 },
  { name: "102.Unagi", price: 10.9 },
  { name: "103.Spicy Tuna", price: 10.9 },
  { name: "104.Kani Avocado ", price: 9.2 },
  { name: "105.Maguro & Avocado", price: 10.5 },
  { name: "106.California", price: 10.9 },

  { name: "107.Salmon Special Roll", price: 13.9 },
  { name: "108.Tuna Special Roll", price: 14.9 },
  { name: "109.Tai Rolle", price: 13.9 },
  { name: "110.Lachs Tempura Roll", price: 14.2 },
  { name: "111.Asia Spezialrolle", price: 16.9 },
  { name: "112.Lunge Rolle ", price: 13.9 },
  { name: "113.Inari Roll ", price: 12.9 },
  { name: "114.Avocado Roll", price: 12.9 },
  { name: "115.Unagi Special Roll ", price: 14.9 },

  { name: "116.Crunchy Chicken ", price: 9.5 },
  { name: "117.Crunchy Lachs Roll", price: 10.5 },
  { name: "118.Crunchy Ebi", price: 10.5 },
  { name: "119.Crunchy Tuna", price: 10.9 },
  { name: "120.Crunchy Veggie ", price: 9.5 },
  { name: "121.Crunchy Sake Maki ", price: 7.9 },
  { name: "122.Crunchy Avocado Maki", price: 7 },
  { name: "123.Asia Crunchy Spezialität", price: 11.5 },

  { name: "124.Chicken Yakitori Bowl", price: 16.9 },
  { name: "125.Gyoza Bowl", price: 15.9 },
  { name: "126.Green Bowl ", price: 14.9 },
  { name: "127.Scampi Bowl ", price: 17.9 },
  { name: "128.Lachs Sashimi Bowl ", price: 17.9 },
  { name: "129.Ebi Tempura Bowl", price: 18.2 },
  { name: "130.Unagi Bowl", price: 18.2 },
  { name: "131.Tuna Sashimi Bowl", price: 18.2 },
  { name: "132.Lachs", price: 12.2 },
  { name: "133.Thunfisch ", price: 13.2 },
  { name: "134.Butterfisch", price: 11.5 },
  { name: "135.Sashimi Mix", price: 23 },

  { name: "SB1.Sake Box", price: 20.2 },
  { name: "SB2.Veggie Menu 1", price: 16.5 },
  { name: "SB3.Veggie Menu 2", price: 17.5 },
  { name: "SB4.Gambas Box", price: 22.5 },
  { name: "SB5.Tuna Menu", price: 26 },
  { name: "SB6.Crunchy Menu", price: 18.5 },
  { name: "SB7.Sake Menu", price: 29 },
  { name: "SB8.Anh Menu", price: 18.9 },
  { name: "SB9.Osaka Menu", price: 20.9 },
  { name: "SB10.Deluxe Box", price: 22 },
  { name: "SB11.Asia Loop Menu", price: 36.5 },
  { name: "SB12.Asia Loop Menu ", price: 46.5 },
  { name: "SB13.Asia Loop Menu", price: 49.5 },
  { name: "SB14.Asia Loop Menu", price: 99.5 },





  { name: "221.Tra Chanh", price: 6 },
  { name: "222.Holunder Limonade", price: 6.5 },
  { name: "223.Himbeere Limonade ", price: 6.5 },
  { name: "224.Mango Lassi", price: 6 },
  { name: "225.Blue Asia", price: 6.5 },
  { name: "226.Maracuja Komblumen", price: 7 },
  { name: "227.Tra Chanh Komblume", price: 7 },
  { name: "228.Red Drink", price: 7 },
  { name: "229.Blue TRee", price: 7 },
  { name: "230.Mai Tai", price: 7.5 },
  { name: "231.Asia Colour", price: 7.5 },
  { name: "232.Singaposing", price: 7.5 },

  { name: "233.Ingwer Tee", price: 3.9 },
  { name: "234.Minztee", price: 3.9 },
  { name: "235.SchwarzTee", price: 3.2 },
  { name: "236.Pfefferminztee", price: 3.2 },
  { name: "237.Kamillentee", price: 3.2 },
  { name: "238.Honig Tee", price: 3.9 },
  { name: "239.Roseblumen Tee", price: 3.9 },

  { name: "240.Ca Phe Vietnam", price: 4.9 },
  { name: "Espresso", price: 2.9 },
  { name: "Kaffee Crema", price: 3.9 },
  { name: "Cappuccino", price: 4.5 },
  { name: "Latte Macchiato", price: 4.5 },
  { name: "Milchkaffe", price: 4.5 },


  { name: "Flasche Wasser", price: 7.5 },

  { name: "Wasser Still", price: 4.5 },
  { name: "Mineralwasser", price: 4.5 },
  { name: "Coca Cola ", price: 4.5 },
  { name: "Cola Light ", price: 4.5 },
  { name: "Cola Zero ", price: 4.5 },
  { name: "Spezi ", price: 4.5 },
  { name: "Fanta ", price: 4.5 },
  { name: "Sprite ", price: 4.5 },
  { name: "Wasser Still", price: 3.2 },
  { name: "Mineralwasser", price: 3.2 },
  { name: "Coca Cola ", price: 3.2 },
  { name: "Cola Light ", price: 3.2 },
  { name: "Cola Zero ", price: 3.2 },
  { name: "Spezi ", price: 3.2 },
  { name: "Fanta ", price: 3.2 },
  { name: "Sprite ", price: 3.2 },
  { name: "Ginger Ale", price: 3.2 },
  { name: "Bitte Lemon", price: 3.2 },
  { name: "Tonic Wasser", price: 3.2 },
  { name: "Apfelschorle", price: 3.5 },
  { name: "Ginger Ale", price: 4.7 },
  { name: "Bitte Lemon", price: 4.7 },
  { name: "Tonic Wasser", price: 4.5 },
  { name: "Apfelschorle", price: 4.7 },

  { name: "Orangesaft", price: 3.5 },
  { name: "Apfelsaft", price: 3.5 },
  { name: "Annasaft", price: 3.5 },
  { name: "Bananasaft", price: 3.5 },
  { name: "Kirschsaft", price: 3.5 },
  { name: "Mangosaft", price: 3.5 },
  { name: "Maracujasaft", price: 3.5 },
  { name: "Guavensaft", price: 3.5 },
  { name: "Litschisaft", price: 3.5 },
  { name: "Kiba", price: 3.5 },
  { name: "Orangesaft", price: 4.7 },
  { name: "Apfelsaft", price: 4.7 },
  { name: "Annasaft", price: 4.7 },
  { name: "Bananasaft", price: 4.7 },
  { name: "Kirschsaft", price: 4.7 },
  { name: "Mangosaft", price: 4.7 },
  { name: "Maracujasaft", price: 4.7 },
  { name: "Guavensaft", price: 4.7 },
  { name: "Litschisaft", price: 4.7 },
  { name: "Kiba", price: 4.7 },

  { name: "Bitburger Klein", price: 3.9 },
  { name: "Radler Klein ", price: 3.9 },
  { name: "Diesel Klein", price: 3.9 },
  { name: "Bitburger Groß", price: 5.5 },
  { name: "Radler Groß", price: 5.5 },
  { name: "Diesel Groß", price: 5.5 },

  { name: "Taiger Bier ", price: 4.5 },
  { name: "Saigon Bier", price: 4.5 },
  { name: "Hefeweizen ", price: 5.5 },
  { name: "Hefeweizen Alkoholfrei", price: 5.5 },
  { name: "Hanoi Bier ", price: 4.5 },

  { name: "Chardonay ", price: 6.5 },
  { name: "Riesling ", price: 6.5 },
  { name: "Riesling Halbtrocken", price: 5.5 },
  { name: "Sauvignon ", price: 6 },
  { name: "Grauburgrunder ", price: 7 },
  { name: "Rose trocken", price: 5.5 },
  { name: "Flasche Rose wein", price: 18 },
  { name: "Flasche Riesling", price: 21.5 },
  { name: "Flasche Chardonay", price: 20 },
  { name: "Flasche Sauvignon", price: 20 },
  { name: "Flasche Grauburgrunder", price: 23.5 },
  { name: "Flasche Merlot", price: 20 },
  { name: "Merlot", price: 6.5 },
];

import { socket } from "./socket"; // adjust path to your socket file

const App = () => {

  useEffect(() => {
    socket.on('ordersUpdated', (data) => {
      console.log('Received updated orders:', data);

      // Convert array to object format { table: orders[] }
      const ordersObject = {};
      data.forEach(({ table, orders }) => {
        ordersObject[table] = orders;
      });

      // Save to localStorage + state
      localStorage.setItem('orders', JSON.stringify(ordersObject));
      setOrderItems(ordersObject);
    });

    return () => {
      socket.off('ordersUpdated'); // cleanup
    };
  }, []);

  // Read from localStorage and set the initial state for tables and orders
  const storedTables = JSON.parse(localStorage.getItem("tables")) || [
    ...Array.from({ length: 15 }, (_, i) => i + 1),         // 1 to 11
    ...Array.from({ length: 8 }, (_, i) => i + 20)          // 15 to 19
  ];
  let storedOrders = {};
  try {
    const raw = localStorage.getItem("orders");
    storedOrders = raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to parse orders from localStorage:", e);
    storedOrders = {};
  }

  const [tables, setTables] = useState(storedTables);
  const [orderItems, setOrderItems] = useState(storedOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  // Retrieve orders from the backend 
  // 1. Fetch orders from backend when component mounts (page loads)
  useEffect(() => {
    const fetchOrders = () => {
      fetch('https://asianloopserver.onrender.com/api/orders')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const ordersObject = {};
            data.forEach(({ table, orders }) => {
              ordersObject[table] = orders;
            });
            localStorage.setItem('orders', JSON.stringify(ordersObject));
            console.log('Restored orders from DB to localStorage and state');
          }
        })
        .catch(err => {
          console.error('Error fetching orders:', err);
          const fallbackOrders = JSON.parse(localStorage.getItem("orders")) || {};
          setOrderItems(fallbackOrders);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // Initial fetch
    fetchOrders();

    // Polling every 10 seconds
    const interval = setInterval(fetchOrders, 10000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('https://asianloopserver.onrender.com/health');
        if (res.ok) {
          const data = await res.json();
          if (data.db === 'connected') {
            setLoading(false);
          } else {
            setLoading(true);
          }
        } else {
          setLoading(true);
        }
      } catch (error) {
        setLoading(true);
      }
    };

    checkBackend(); // check immediately
    const interval = setInterval(checkBackend, 5000); // check every 5s

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="mt-15 ml-30 text-4xl text-center">Loading...</div>; // You can replace this with a spinner or fancy UI
  }







  // Add an "Abholung" table with a dynamic name (e.g., Abholung 1, Abholung 2

  // Handle clicking on a table to open the modal and reset order items
  const handleTableClick = (tableName) => {
    setCurrentTable(tableName);
    setIsModalOpen(true);
    setOrderItems(storedOrders[tableName] || []); // Load the saved order items for the selected table
  };

  // Add order item (dish) to the list
  const addOrderItem = (name, price) => {
    const newOrderItem = { name, price };
    const updatedOrderItems = [...orderItems, newOrderItem];
    setOrderItems(updatedOrderItems);

    // Save the updated order items to localStorage for the specific table
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    /////////////////////
    // Prepare payload for backend
    console.log(updatedOrders);
    const payload = Object.entries(updatedOrders).map(([table, orders]) => ({
      table,
      orders
    }));
    console.log("Payload to sync:", payload);
    fetch('https://asianloopserver.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log("Synced to DB:", data))
      .catch(err => console.error("Error syncing orders:", err));
  };

  // Remove order item from the list
  const removeOrderItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);

    // Update the order in localStorage for the specific table
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    /////////////////////
    // Prepare payload for backend
    console.log(updatedOrders);
    const payload = Object.entries(updatedOrders).map(([table, orders]) => ({
      table,
      orders
    }));

    fetch('https://asianloopserver.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log("Synced to DB:", data))
      .catch(err => console.error("Error syncing orders:", err));
  };
  const tablesWithOrders = Object.keys(storedOrders).filter(
    (table) => storedOrders[table] && storedOrders[table].length > 0
  ).map(Number); // convert to number if needed

  const totalSales = parseFloat(localStorage.getItem("totalSales")) || 0;

  const handleRefreshTwice = () => {
    // First reload
    window.location.reload();

  };
  return (
    <div className="w-full overflow-y-auto bg-white text-black flex flex-col items-center p-15">
      <h1 className="text-3xl text-green-300 font-bold mb-3">Asian Loop</h1>
      <button onClick={handleRefreshTwice} style={{ fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>
        <FiRotateCcw />
      </button>
      <div className="grid grid-cols-3 gap-4 w-full">
        {tables.map((table, index) => {
          const hasOrder = tablesWithOrders.includes(table);

          return (
            <div
              key={index}
              className={`cursor-pointer rounded-xl p-2 transition-colors ${hasOrder ? "bg-green-200 text-white" : "bg-white"
                }`}
              onClick={() => handleTableClick(table)}
            >
              <Table number={table} />
            </div>
          );
        })}
      </div>


      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableName={currentTable}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        tables={tables}
        setTables={setTables}
        addOrderItem={addOrderItem}
        removeOrderItem={removeOrderItem}
        dishes={dishes}
      />
    </div>
  );
};

export default App;
