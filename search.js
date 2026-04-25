export default async function handler(req, res) {
  const { departure, arrival, outbound, return: ret } = req.query;

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_flights&departure_id=${departure}&arrival_id=${arrival}&outbound_date=${outbound}&return_date=${ret}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
}