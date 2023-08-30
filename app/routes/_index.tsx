import { useEffect, useState } from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import type { IndexSearchResult } from "flexsearch";
import { Index } from "flexsearch"
import { getCryptoCurrency, createCryptoCurrency, getCryptoCurrencyListItems, deleteCryptoCurrency, updateCryptoCurrency } from "~/models/crypto.server";
import { getUserId } from "~/session.server";


const index = new Index({ tokenize: "full" });

const API_URL = 'https://api.coincap.io/v2/assets';

type Crypto = {
  id: string,
  rank: string,
  symbol: string,
  name: string,
  supply: string,
  maxSupply: string,
  marketCapUsd: string,
  volumeUsd24Hr: string,
  priceUsd: string,
  changePercent24Hr: string,
  vwap24Hr: string,
  explorer: string,
  savedItem?: string,
};

const getCryptoData = async () => {
  const apiResponse = await fetch(API_URL);
  const res = await apiResponse.json();
  return res.data;
}

export const loader = async ({ request }: LoaderArgs) => {
  const cryptoData: Crypto[] = await getCryptoData();
  const userId: string = await getUserId(request) as string;
  let savedListItems = await getCryptoCurrencyListItems({ userId });
  savedListItems = savedListItems.map(item => ({ ...item, savedItem: true }));

  return json({ cryptoData, savedListItems });
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request) as string;
  const body = await request.formData();

  if (body.get("unsave") === "true") {
    await deleteCryptoCurrency({
      id: body.get("id") as string,
      userId: userId,
    })
    return redirect('/');
  } else {
    const getCrypto = await getCryptoCurrency({
      id: body.get("id") as string,
      userId: userId,
    })

    const cryptoData = {
      id: body.get("id") as string,
      rank: body.get("rank") as string,
      symbol: body.get("symbol") as string,
      name: body.get("name") as string,
      supply: body.get("supply") as string,
      maxSupply: body.get("maxSupply") as string,
      marketCapUsd: body.get("marketCapUsd") as string,
      volumeUsd24Hr: body.get("volumeUsd24Hr") as string,
      priceUsd: body.get("priceUsd") as string,
      changePercent24Hr: body.get("changePercent24Hr") as string,
      vwap24Hr: body.get("vwap24Hr") as string,
      explorer: body.get("explorer") as string,
      userId: userId as string,
    }

    if (getCrypto) {


      await updateCryptoCurrency({
        uid: getCrypto.uid,
        ...cryptoData
      });
    } else {
      await createCryptoCurrency({
        ...cryptoData
      });
    }
  }
  return redirect(`/`);
}

const CRYPTO_PROPERTIES_NAME_MAP = {
  'rank': 'Rank',
  'name': 'Name',
  'priceUsd': 'Price in USD',
  'symbol': 'Symbol',
  'changePercent24Hr': 'Change Percent 24 Hour',
  'volumeUsd24Hr': 'Volumne Usd 24 Hour',
}


export default function App() {
  const { cryptoData, savedListItems } = useLoaderData<typeof loader>();
  const user = useOptionalUser();
  const [cryptoCurrencyData, setCryptoCurrencyData] = useState(cryptoData);
  const [searchKey, setSearchKey] = useState('');
  const [dataKeyValue, setDataKeyValue] = useState<{ [id: string]: Crypto }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<Crypto>();

  useEffect(() => {
    const dataKeyVal: { [id: string]: Crypto } = {};
    cryptoData.forEach((crypto) => {
      index.add(crypto.id, JSON.stringify(Object.values(crypto)));
      dataKeyVal[crypto.id] = crypto
    });
    setDataKeyValue(dataKeyVal);
  }, [])


  useEffect(() => {
    if (searchKey) {
      const searchResults: IndexSearchResult = index.search(searchKey);
      const results = searchResults.map((result) => (dataKeyValue[result]));
      setCryptoCurrencyData(results);
    } else {
      setCryptoCurrencyData(cryptoData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey])

  const openModal = (currency: Crypto) => {
    setSelectedCurrency(currency);
    window.my_modal.showModal();
  }

  const closeModal = () => {
    (document.getElementById("my_modal") as HTMLFormElement).close();
  }

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
                  <>
                    <div className="flex justify-between w-full">
                      {savedListItems.length > 0 ?
                        <div className="dropdown dropdown-hover">
                          <label tabIndex={0} className="btn m-1">Saved Items</label>
                          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 z-50">
                            {savedListItems.map((item) => (<>
                              <li className="cursor-pointer hover:bg-purple-600"
                                onClick={() => {
                                  openModal(item);
                                }}
                              >
                                {item['name']}
                              </li>
                            </>))
                            }
                          </ul>
                        </div> : <div></div>}
                      <div className="flex items-center rounded w-50">
                        <div
                          className="bg-white px-3 py-3 text-base text-purple-700 shadow-sm sm:px-8 rounded-l"
                        >
                          Crypto data for {user.email}
                        </div>
                        <Form action="/logout" method="post">
                          <button
                            type="submit"
                            className="bg-blue-950 px-3 py-3 text-white text-base hover:bg-blue-900 shadow-sm rounded-r"
                          >
                            Logout
                          </button>
                        </Form>
                      </div>
                    </div>
                  </>
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
                  className="w-full rounded border px-2 py-1 text-md bg-slate-50 mb-4 text-blue-950"
                  onChange={e => setSearchKey(e.target.value)}
                />
                <div className="overflow-x-auto text-2xl rounded">
                  <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                      <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Price in USD</td>
                        <td>Trade Volume</td>
                        <td>Percentage Change</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cryptoCurrencyData.map((currency) => (
                        <tr
                          className="cursor-pointer  hover:bg-purple-300 hover:opacity-80 hover:text-blue-950"
                          key={currency.id}
                          onClick={() => openModal(currency)}>
                          <td>{currency.rank}</td>
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
        <dialog id="my_modal" className="modal">
          <Form method='post' className="modal-box bg-purple-900 w-4/5 h-4/5 shadow-sm">
            <button className="btn btn-sm border-none btn-ghost absolute right-2 top-2"
              onClick={(event) => { closeModal(); event.preventDefault(); setSelectedCurrency(undefined); }}>✕</button>
            <h3 className="font-bold text-3xl text-fuchsia-50">Currency Details</h3>
            <div className="grid grid-cols-2 gap-4 justify-evenly flex-wrap">
              {Object.keys(selectedCurrency ?? {}).map((item) => (
                <>
                  <input name={item} value={selectedCurrency?.[item as keyof Crypto]} type='hidden' />
                  {CRYPTO_PROPERTIES_NAME_MAP[item as keyof typeof CRYPTO_PROPERTIES_NAME_MAP] && <div className="mt-4 bg-fuchsia-50 min-w-full w-fit rounded-lg p-2 break-all">{CRYPTO_PROPERTIES_NAME_MAP[item as keyof typeof CRYPTO_PROPERTIES_NAME_MAP]} <br /> {selectedCurrency?.[item as keyof Crypto]}</div>}
                </>
              ))}
            </div>
            <div className="mt-4 bg-fuchsia-50 min-w-full w-fit rounded-lg p-2 break-all">Explorer Link <br /> <a href={selectedCurrency?.explorer} className="text-blue-800">{selectedCurrency?.explorer}</a></div>
            <div className="modal-action fixed bottom-6 right-2">
              <input name='unsave' value={JSON.stringify(!!selectedCurrency?.savedItem)} type='hidden' />
              {user && (
                selectedCurrency?.savedItem ?
                  <button type='submit' className="btn" onClick={closeModal}>Unsave</button> :
                  <button type='submit' className="btn" onClick={closeModal}>Save</button>
              )}
            </div>
          </Form>
        </dialog>
      </div>
    </main>
  );
}
