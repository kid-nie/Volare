export default async function handler(req, res) {
  try {
    console.log("KEY:", process.env.SERPAPI_KEY);

    const response = await fetch("https://serpapi.com/search.json?engine=google_flights&departure_id=DXB&arrival_id=BLR&outbound_date=2026-05-10&return_date=2026-05-20&api_key=" + process.env.SERPAPI_KEY);

    const data = await response.json();

    console.log("DATA:", data);

    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "debug fail" });
  }
}
