import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MessageEntry from "./component/MessageEntry";

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
      const response = await fetch(process.env.VITE_SERVER);
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
    <div className="bg-extGray ">
      <div className=" bg-extBlack text-extWhite max-w-[800px] mx-auto px-10 py-4 min-h-screen">
        <header className="pt-4 pb-8 flex flex-col md:flex-row gap-4 text-center justify-between items-center uppercase border-b">
          <Link
            to={"/"}
            onClick={() => {
              setBtn("add");
            }}
          >
            <h1 className="text-4xl">Odin Message Board</h1>
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
          <h2 className="text-3xl my-8">All Messages</h2>
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message) => {
              return (
                <MessageEntry
                  key={message.id}
                  messageData={message}
                ></MessageEntry>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
