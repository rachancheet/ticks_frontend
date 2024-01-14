// "use server";
// export default async function Times() {
//   // const handlclick = () => {

//   //   const [first, setfirst] = useState("");
//   let first = "hello";

//   const responce = await fetch(
//     "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
//   );
//   first = await responce.json();
//   first = first.datetime;

//   return <div>{first}</div>;
// }

// //   fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata").then(
// //     async (responce) => {
// //       let text = await responce.json();
// //       console.log(text);
// //       setfirst(text.datetime);
// //     }
// //   );
// // };
