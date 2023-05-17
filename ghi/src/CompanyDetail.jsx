import { useEffect, useState } from "react";

function CompanyDetail() {
  const [positions, setPositions] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/positions/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setPositions(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container text-3xl font-bold">
        <div className="p-6 max-w-sm mx-0 bg-white rounded-xl shadow-lg flex items-center space-x-4">
          Positions
        </div>
        {positions.map((position) => {
          return <div key={position.id}>{position.name}</div>;
        })}
      </div>
      <div class="p-6 max-w-sm mr-0 bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black">ChitChat</div>
          <p class="text-slate-500">You have a new message!</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
