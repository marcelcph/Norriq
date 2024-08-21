import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import cardIcon from "../../assets/svg/cards.svg";
import tableIcon from "../../assets/svg/table.svg";

function Cards() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("alle");
  const [progress, setProgress] = useState(0);
  const [visningsType, setvisningsType] = useState("cards"); // Tilføjet til at styre visning
  const samletAntalSider = 9;

  useEffect(() => {
    const fetchAlleSiderPeople = async () => {
      setLoading(true);
      setError(null);
      let allePeople = [];
      let næsteSideURL = "https://swapi.dev/api/people/";
      let loadedeSider = 0;

      try {
        while (næsteSideURL && loadedeSider < samletAntalSider) {
          const response = await axios.get(næsteSideURL);
          allePeople = [...allePeople, ...response.data.results];
          næsteSideURL = response.data.next;
          loadedeSider += 1;
          setProgress(Math.round((loadedeSider / samletAntalSider) * 100));
        }

        setPeople(allePeople);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlleSiderPeople();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <span className="loading loading-ring w-48 h-48 text-secondary"></span>
        <p className="mt-4 text-2xl font-bold text-secondary">{progress}%</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-6 text-red-500">Fejlmeddelelse: {error}</p>
    );
  }

  const filtreretPeople = people.filter((person) => {
    if (filter === "alle") return true;
    if (filter === "mand") return person.gender === "male";
    if (filter === "kvinde") return person.gender === "female";
    if (filter === "alder") {
      const fødselsÅr = person.birth_year;
      if (fødselsÅr && fødselsÅr.endsWith("BBY")) {
        const year = parseFloat(fødselsÅr.replace("BBY", "").trim());
        return year >= 20 && year <= 40;
      }
      return false;
    }
    return true;
  });

  const kønIkon = (gender) => {
    if (gender === "male") return "🚹";
    if (gender === "female") return "🚺";
    if (gender === "n/a") return "🤖";
  };

  return (
    <div className="my-32">
      <div className="flex flex-wrap justify-center mb-4 gap-2">
        <h1 className="text-3xl font-bold text-neutral">Filtre:</h1>
        <button
          className={`btn w-full sm:w-auto ${
            filter === "alle" ? "btn-secondary" : ""
          }`}
          onClick={() => setFilter("alle")}
        >
          Vis alle
        </button>
        <button
          className={`btn w-full sm:w-auto ${
            filter === "mand" ? "btn-secondary" : ""
          }`}
          onClick={() => setFilter("mand")}
        >
          Vis kun mænd
        </button>
        <button
          className={`btn w-full sm:w-auto ${
            filter === "kvinde" ? "btn-secondary" : ""
          }`}
          onClick={() => setFilter("kvinde")}
        >
          Vis kun kvinder
        </button>
        <button
          className={`btn w-full sm:w-auto ${
            filter === "alder" ? "btn-secondary" : ""
          }`}
          onClick={() => setFilter("alder")}
        >
          Vis kun personer mellem 20 og 40 BBY
        </button>
        {/* Juster dette div */}
        <div className="flex justify-end w-full mt-4">
          <p>Layout: </p>
          <button
            className="w-full sm:w-auto flex items-center "
            onClick={() =>
              setvisningsType(visningsType === "cards" ? "table" : "cards")
            }
          >
            <img
              src={visningsType === "cards" ? tableIcon : cardIcon}
              alt="Skift visning"
              className="w-6 h-6 mr-2"
            />
          </button>
        </div>
      </div>

      {visningsType === "cards" ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filtreretPeople.map((person, index) => (
            <motion.div
              key={person.url}
              className="card card-bordered shadow-xl p-6 bg-accent/60 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-body text-center">
                <h2 className="card-title text-3xl font-bold mb-2 text-neutral">
                  {person.name}
                </h2>
                <p className="text-neutral text-2xl text-left">
                  Køn: {kønIkon(person.gender)}
                </p>
                <p className="text-neutral text-2xl text-left">
                  Fødselsår: {person.birth_year}
                </p>
                <p className="text-neutral text-2xl text-left">
                  Højde: {person.height} cm
                </p>
                <p className="text-neutral text-2xl text-left">
                  Vægt: {person.mass} kg
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-accent text-neutral">
                <th>#</th>
                <th>Navn</th>
                <th>Køn</th>
                <th>Fødselsår</th>
                <th>Højde</th>
                <th>Vægt</th>
              </tr>
            </thead>
            <tbody>
              {filtreretPeople.map((person, index) => (
                <tr key={person.url}>
                  <th>{index + 1}</th>
                  <td>{person.name}</td>
                  <td>{kønIkon(person.gender)}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.height} cm</td>
                  <td>{person.mass} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Cards;
