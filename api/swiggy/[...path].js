export default async function handler(req, res) {
  const targetPath = req.url.replace(/^\/api\/swiggy\/?/, "");
  const targetUrl = `https://www.swiggy.com/${targetPath}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        accept: "application/json, text/plain, */*",
        referer: "https://www.swiggy.com/",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const body = await response.text();

    res.setHeader("content-type", contentType);
    res.status(response.status).send(body);
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch Swiggy data",
      message: error.message,
    });
  }
}
