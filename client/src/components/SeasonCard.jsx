import { Link } from "react-router-dom";

const getWinner = (season, competitors) => {
  const winner = Object.values(competitors)
    .sort(
      (a, b) =>
        (a.qualified !== "INEL") - (b.qualified !== "INEL") ||
        (season.provisional
          ? a.projectedAvg[season.lastEvent] - b.projectedAvg[season.lastEvent]
          : a.totalPoints[season.lastEvent] - b.totalPoints[season.lastEvent])
    )
    .pop();
  return winner && winner.qualified !== "INEL"
    ? `${winner.firstName} ${winner.lastName}`
    : undefined;
};

const SeasonCard = ({ grades, season, year }) => (
  <div className="bg-gray-100 sm:m-10 flex flex-col items-stretch p-4">
    <h1 className="text-8xl p-3 font-title">{year}</h1>
    <table className="mt-4 text-left">
      <thead>
        <th className="font-bold text-lg sm:text-2xl font-title">Grade</th>
        <th className="font-bold text-lg sm:text-2xl font-title">
          {season.season.provisional ? "Current Winner" : "Winner"}
        </th>
      </thead>
      {Object.entries(season.points)
        .sort(
          ([a], [b]) =>
            grades[b].difficulty - grades[a].difficulty ||
            (grades[b].gender === "M" ? 1 : -1)
        )
        .map(([idgrade, competitors]) => {
          return (
            <Link
              to={`/${year}/${idgrade}`}
              className="table-row hover:bg-gray-200 border-t"
            >
              <td className="p-1">{grades[idgrade].name}</td>
              <td className={season.season.provisional && "italic"}>
                {getWinner(season.season, competitors)}
              </td>
            </Link>
          );
        })}
    </table>
  </div>
);

export default SeasonCard;
