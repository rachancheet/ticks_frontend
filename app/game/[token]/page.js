"use client";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";

export default function Board({ params }) {
  const [board, setboard] = useState(Array(9).fill(null));
  // const [winner, setwinner] = useState(null);
  const [turn, setturn] = useState(false);
  const [data, setdata] = useState("");
  const [gamebutton, setgamebutton] = useState(false);
  const router = useRouter();
  let user = "";

  const [socket, _] = useState(
    new WebSocket("ws://15.235.162.175:80/ticks/game/" + params.token)
  );
  useEffect(() => {
    console.log(user);
    if (Object.is(parseInt(params.token), NaN)) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    user = localStorage.getItem("user");
    setturn(false);

    socket.addEventListener("open", (event) => {
      socket.send(user);
    });

    socket.addEventListener("message", (e) => {
      console.log(e.data);
      const op_code = e.data;
      console.log(op_code.slice(0, 3));
      if (op_code == "setup1") {
        console.log("turn set to true");
        setdata("Your turn");
        setturn(true);
        // forceUpdate();
      } else if (op_code == "setup2") {
        console.log("turn set to true");
        setdata("wait for your turn");
        // forceUpdate();
      } else if (op_code.slice(0, 4) == "lost") {
        setdata("lost against " + op_code.slice(5));
        setturn(false);
        setgamebutton(true);
        forceUpdate();
      } else if (op_code.slice(0, 3) == "won") {
        setdata("won against " + op_code.slice(4));
        setturn(false);
        setgamebutton(true);
        forceUpdate();
      } else if (op_code == "close") {
        router.push("/");
      } else if (!Object.is(parseInt(e.data), NaN)) {
        console.log(" parseint passed");
        const chap = board;
        chap[parseInt(op_code)] = "0";
        setboard(chap);
        setdata("Your turn");
        setturn(true);
        forceUpdate();
      }
    });
  }, []);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  function handlegamebutton() {
    router.push("/game/" + Math.floor((Math.random() + 1) * 1000));
  }

  function handleclick(index) {
    if (!turn) {
      return;
    }
    const chap = board;
    chap[index] = "X";
    console.log(chap);
    setboard(chap);
    setdata("wait for your turn");
    setturn(false);
    forceUpdate();
    socket.send(index);
  }
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="mb-4 text-2xl font-bold">{data}</div>
      <div className="grid grid-cols-3 gap-4">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              <button
                type="button"
                className="w-16 h-16 bg-[#16a34a] text-white font-bold text-2xl focus:outline-none"
                onClick={() => {
                  handleclick(index);
                }}
              >
                {board[index]}
              </button>
            </div>
          ))}
      </div>
      {gamebutton ? (
        <>
          <button
            type="button"
            onClick={handlegamebutton}
            className="bg-[#16a34a]"
          >
            New Game
          </button>
          <a href="/">
            <button
              type="button"
              // onClick={handlegamebutton}
              className="bg-[#16a34a]"
            >
              Home
            </button>
          </a>
        </>
      ) : null}
    </div>
  );
}
