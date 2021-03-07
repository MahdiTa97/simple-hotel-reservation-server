import React from "react";
import useHotels from "../hooks";

const Tables = () => {
  const { status, data, error, isFetching, isLoading } = useHotels();

  return (
    <div className="container mx-auto flex flex-col justify-items-center justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-700 text-center p-7 cursor-default capitalize">
        <div>This is table page</div>
      </h1>
      {!isLoading && !error ? <Table data={data} /> : null}
    </div>
  );
};

export default Tables;

function Table(props) {
  const { data } = props;

  const Header = (props) => {
    const { rows } = props;

    return (
      <thead className="bg-gray-50">
        <tr>
          {rows.map((item, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const Body = (props) => {
    const { rows } = props;

    return (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          {Object.values(rows).map((item, index) => (
            <td key={index} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 text-center">{item}</div>
            </td>
          ))}
        </tr>
      </tbody>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <Header rows={Object.keys(data[0])} />
              {data.map((row, index) => (
                <Body rows={row} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
