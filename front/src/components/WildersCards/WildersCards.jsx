import "./wildersCards.css";
import Skills from "../Skills/Skills";

const WildersCards = ({
  wilder,
  setWilders,
  toggleWilderUpdate,
  setCurrentWilder,
}) => {

  return (
    <div className="containerWildersCards">
      <div className="wildersCards">
        <div className="wildersCardsTop">

          <button
            onClick={() => {
              console.log("ok");
            }}
          >
            X
          </button>
        </div>

        <h1>{wilder.name}</h1>
        <h1>{wilder.city}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam magni
          quisquam nesciunt incidunt deleniti dolore voluptas assumenda
          temporibus enim eum autem, expedita pariatur sit ut rem rerum
          laboriosam neque itaque! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nam magni quisquam nesciunt incidunt deleniti dolore
          voluptas assumenda temporibus enim eum autem, expedita pariatur sit ut
          rem rerum laboriosam neque itaque!
        </p>
        <h2>Wild Skills</h2>
        <Skills skills={wilder.skills} />
        <button
          onClick={() => {
            setCurrentWilder(wilder);
            toggleWilderUpdate();
          }}
        >
          update Wilder
        </button>
      </div>
    </div>
  );
};

export default WildersCards;