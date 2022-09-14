// import "./wilders.css";

// // Packages
// import { useState, useEffect } from "react";

// //Components
// import WildersCards from "../WildersCards/WildersCards";
// import LogiqueModale from "../Modals/LogiqueModal";
// import ModalWilderNew from "../Modals/ModalWilderNew";
// import ModalWilderUpdate from "../Modals/ModalWilderUpdate";

// const Wilders = ({ wilders, setWilders }) => {
//   const [currentWilder, setCurrentWilder] = useState(null);

//   useEffect(() => {
//     // console.log("currentWilder", currentWilder);
//   }, [currentWilder]);

//   const {
//     reveleWilderNew,
//     toggleWilderNew,
//     changeReveleWilderNew,
//     reveleWilderUpdate,
//     toggleWilderUpdate,
//     changeReveleWilderUpdate,
//   } = LogiqueModale();

//   return (
//     <div className="wilders">
//       <div className="titleButton">
//         <h1>Wilders</h1>
//         <button onClick={toggleWilderNew}>Add Wilder</button>
//       </div>

//       <ModalWilderNew
//         reveleWilderNew={reveleWilderNew}
//         cache={toggleWilderNew}
//         changeReveleWilderNew={changeReveleWilderNew}
//         setWilders={setWilders}
//         wilders={wilders}
//       />

//       <ModalWilderUpdate
//         reveleWilderUpdate={reveleWilderUpdate}
//         cache={toggleWilderUpdate}
//         changeReveleWilderUpdate={changeReveleWilderUpdate}
//         currentWilder={currentWilder}
//         setWilders={setWilders}
//       />

//       <div className="cards">
//         {wilders.map((wilder, idx) => {
//           return (
//             <div key={idx}>
//               <WildersCards
//                 wilder={wilder}
//                 setWilders={setWilders}
//                 toggleWilderUpdate={toggleWilderUpdate}
//                 setCurrentWilder={setCurrentWilder}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Wilders;