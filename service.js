export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The FastAPI backend is not hosted here (Freebuff = Cloudflare Workers,
    // this project = Python/uvicorn). Answer the UI's API calls with a clear
    // message instead of an opaque 404.
    if (url.pathname === "/api/chat" || url.pathname === "/api/profile") {
      return new Response(
        JSON.stringify({
          detail:
            "Static portfolio deployment: the FastAPI agent backend is not hosted here. Run the app locally (uvicorn app.main:app) or on a Python host to enable the chat.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    const res = await env.ASSETS.fetch(request);

    // SPA-style fallback: unknown extensionless paths get the chat UI.
    if (res.status === 404 && !url.pathname.includes(".")) {
      return env.ASSETS.fetch(new Request(new URL("/", url.origin), request));
    }
    return res;
  },
};
