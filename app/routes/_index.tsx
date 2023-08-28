import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

const API_URL = 'https://api.coincap.io/v2/assets';

const getCryptoData = async () => {
  const apiResponse = await fetch(API_URL);
  const res = await apiResponse.json();
  return res.data;
}

export const loader = async () => {
  const cryptoData = await getCryptoData();
  return json({ cryptoData });
};


export default function Index() {
  const user = useOptionalUser();
  const { cryptoData } = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8 w-10/12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-6 pt-6 sm:px-6 sm:pb-6 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-8">
              <h3 className="text-center text-4xl font-bold tracking-tight sm:text-2xl lg:text-4xl">
                <span className="block uppercase text-fuchsia-50 drop-shadow-md">
                  Crypto Currency Tracker
                </span>
              </h3>
              <div className="mx-auto mt-8 mb-8 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-purple-700 shadow-sm hover:bg-purple-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-purple-700 shadow-sm hover:bg-purple-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-purple-500 px-4 py-3 font-medium text-white hover:bg-purple-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
              <div className="border-4 rounded-lg p-4 border-purple-950">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search"
                  className="w-full rounded border px-2 py-1 text-md bg-slate-50 mb-4"
                />
                <div className="overflow-x-auto text-2xl rounded">
                  <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                      <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Amount</td>
                        <td>Trade Volume</td>
                        <td>Percentage Change</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cryptoData.map((currency: any) => (
                        <tr
                          className="cursor-pointer"
                          key={currency.id}>
                          <div>{currency.rank}</div>
                          <td>{currency.name}</td>
                          <td>{currency.symbol}</td>
                          <td>{currency.priceUsd}</td>
                          <td>{currency.volumeUsd24Hr}</td>
                          <td>{currency.changePercent24Hr}</td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}
