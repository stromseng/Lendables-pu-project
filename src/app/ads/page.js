async function getAds() {
    const res = await fetch("http://127.0.0.1:8090/api/collections/advertisements/records?page=1&perPage=30")
    const data = await res.json()
    return data.items;
}

export default async function AdPage() {
    const data = await getAds()
    console.log(data);
    return(
        <div>
            <h1>Annonser</h1>
            <p>Tittel: {data[0].title}</p>
            <p>Pris: {data[0].price}</p>
            <p>Oppdatert: {data[0].updated}</p>
            <p>Selger: {data[0].seller}</p>
        </div>
    )
}