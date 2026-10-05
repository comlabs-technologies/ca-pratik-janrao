import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { safeEqual } from "@/lib/admin/auth";
import { createMcpServer } from "@/lib/mcp/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized(status: number, message: string) {
  return Response.json({ jsonrpc: "2.0", error: { code: -32001, message }, id: null }, { status, headers: { "WWW-Authenticate": "Bearer" } });
}

export async function POST(request: Request) {
  const key = process.env.MCP_API_KEY;
  if (!key) return unauthorized(503, "MCP server is disabled: set MCP_API_KEY");
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!safeEqual(token, key)) return unauthorized(401, "Invalid or missing bearer token");

  // Stateless: a fresh server + transport per request, plain JSON responses.
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await createMcpServer().connect(transport);
  return transport.handleRequest(request);
}

const methodNotAllowed = () =>
  Response.json({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed. Use POST." }, id: null }, { status: 405, headers: { Allow: "POST" } });

export const GET = methodNotAllowed;
export const DELETE = methodNotAllowed;
