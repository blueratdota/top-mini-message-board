import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btn, setBtn] = useState(() => {
    if (window.location.pathname === "/new") {
      return "cancel";
    }
    return "add";
  });
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000");
      const dbData = await response.json();
      if (!ignore) {
        setMessages(dbData);
      }
      console.log(messages);
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-extGray">
      <div className=" bg-extBlack text-extWhite max-w-[800px] mx-auto px-10 py-4">
        <header className="pt-4 pb-8 flex flex-col md:flex-row gap-4 text-center justify-between items-center uppercase border-b">
          <Link to={"/"}>
            <h1 className="text-3xl">Odin Message Board</h1>
          </Link>
          {btn === "add" ? (
            <Link
              to={"/new"}
              onClick={() => {
                setBtn("cancel");
              }}
            >
              <button className="bg-extGreen px-8 py-3 rounded-lg">
                ADD MESSAGE
              </button>
            </Link>
          ) : (
            <Link
              to={"/"}
              onClick={() => {
                setBtn("add");
              }}
            >
              <button className="bg-extGreen px-8 py-3 rounded-lg">
                CANCEL
              </button>
            </Link>
          )}
        </header>
        <Outlet></Outlet>
        <div>
          {messages.map((message) => {
            return <div>{message.content}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
