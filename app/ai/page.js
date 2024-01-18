"use client";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { AI } from "@/app/ai/logic";
import { checkifwon } from "@/app/ai/logic";
import { checkifdraw } from "@/app/ai/logic";

export default function Board({ params }) {
  const [board, setboard] = useState(Array(9).fill(""));
  // const [winner, setwinner] = useState(null);
  const [turn, setturn] = useState(true);
  const [data, setdata] = useState(" Play your move");
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [gamebutton, setgamebutton] = useState(false);
  const router = useRouter();
  // let user = "";

  function handleclick(index) {
    if (!turn) {
      return;
    }
    if (board[index] != "") {
      return;
    }
    const chap = board;
    chap[index] = "X";
    console.log(chap);
    setboard(chap);
    if (checkifwon(board, "X")) {
      setdata("Won");
      setturn(false);
      return;
    }
    if (checkifdraw(board)) {
      setdata("Draw");
      setturn(false);
      return;
    }
    setdata("wait for your turn");
    setturn(false);
    forceUpdate();
    let next = AI(board);
    chap[next] = "0";
    setboard(chap);
    if (checkifwon(board, "0")) {
      setdata("Lost");
      setturn(false);
      return;
    }
    if (checkifdraw(board)) {
      setdata("Draw");
      setturn(false);
      return;
    }
    setdata("Your Turn");
    setturn(true);
    forceUpdate();
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
        <div className="flex flex-col gap-8 justify-center items-center">
          <button
            type="button"
            onClick={handlegamebutton}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
          >
            New Game
          </button>
          <a href="/">
            <button
              type="button"
              // onClick={handlegamebutton}
              className="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              Home
            </button>
          </a>
        </div>
      ) : null}
    </div>
  );
}
