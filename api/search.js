export default async function handler(req, res) {
  try {
    const { departure, arrival, outbound, return: ret } = req.query;

    // 🔒 INPUT VALIDATION (VERY IMPORTANT)
    if (!departure || !arrival || !outbound) {
      return res.status(400).json({
        error: "Missing required fields: departure, arrival, outbound"
      });
    }

    if (!process.env.SERPAPI_KEY) {
      return res.status(500).json({
        error: "Server missing API key"
      });
    }

    console.log("SEARCH INPUTS:", {
      departure,
      arrival,
      outbound,
      return: ret
    });

    const url =
      "https://serpapi.com/search.json?" +
      new URLSearchParams({
        engine: "google_flights",
        departure_id: departure,
        arrival_id: arrival,
        outbound_date: outbound,
        return_date: ret || "",
        api_key: process.env.SERPAPI_KEY
      });

    const response = await fetch(url);
    const data = await response.json();

    console.log("SERPAPI RESPONSE:", data);

    return res.status(200).json(data);

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "debug fail" });
  }
}
