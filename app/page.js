"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // const [user, setuser] = useState();

  const user = useRef("");
  const [nam, setname] = useState("");
  const token = useRef("");
  const router = useRouter();
  const [msg, setmsg] = useState(null);

  useEffect(() => {
    if (!(typeof window === "undefined")) {
      if (localStorage.getItem("user") === null) {
        localStorage.setItem("user", "");
      } else {
        setname(localStorage.getItem("user"));
      }
      console.log(localStorage.getItem("user"));
    }
  }, []);

  function handleuser() {
    if (user.current.value == "") {
      setmsg("Enter name");
    } else {
      // console.log(user.current.value);
      localStorage.setItem("user", user.current.value);
      if (router) {
        router.push("/game/" + Math.floor((Math.random() + 1) * 1000));
      }
    }
  }
  function handlegame() {
    if (token.current.value == "") {
      setmsg("Enter Token");
    } else if (user.current.value == "") {
      setmsg("Enter name as well");
    } else {
      localStorage.setItem("user", user.current.value);
      router.push("/game/" + token.current.value);
    }
  }

  return (
    <div>
      <div className="flex h-screen justify-center items-center">
        <div className="flex p-10 shrink-0 gap-8 align-center border-2 rounded-md border-[#e0f2fe]">
          <div className="flex flex-col gap-8 justify-center items-center">
            <input type="text" ref={user} defaultValue={nam}></input>
            <button
              onClick={handleuser}
              class="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              Create Game
            </button>
          </div>
          <div className="flex flex-col gap-8 justify-center items-center">
            <input type="text" ref={token} placeholder="gametoken"></input>
            <button
              onClick={handleuser}
              class="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
