export const getCryptoData = async () => {
    const res = await fetch(
        'https://api.coincap.io/v2/assets'
    ).then((res) => res.json());
    return res.results;
}


export const getCryptoDetails = async (name: string | undefined) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${name}`).then(
        (res) => res.json()
    );
    return {
        name: name,
    };
}