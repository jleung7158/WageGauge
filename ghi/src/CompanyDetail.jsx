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
      <div className="container">
        {positions.map((position) => {
          return <div key={position.id}>{position.name}</div>;
        })}
      </div>
      <div className="chat-notification">
        <div className="chat-notification-content">
          <h4 className="chat-notification-title">ChitChat</h4>
          <p className="chat-notification-message">You have a new message!</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
