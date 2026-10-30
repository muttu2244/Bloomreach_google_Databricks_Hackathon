export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return fetch(new URL("./index.html", import.meta.url), {
        headers: { "Accept": "text/html" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
};
