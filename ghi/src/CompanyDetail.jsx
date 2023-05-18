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
      <div className="container flex flex-row">
        <div className="flex-col p-6 w-1/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
          <h1 className="text-xl font-bold">Positions</h1>
          <div>
            {positions.map((position) => {
              return <div key={position.id}>{position.name}</div>;
            })}
          </div>
        </div>
        <div className="p-6 w-3/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
          <div>
            <div className="text-xl font-medium text-black">"Position1"</div>
            <p className="text-slate-500">Position data here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
