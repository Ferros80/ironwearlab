import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";
  const isAuthRoute = pathname.startsWith("/api/auth");

  if (isAuthRoute) return;

  if (isAdmin && !isLogin) {
    const session = req.auth;
    if (!session?.user) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return Response.redirect(url);
    }
    if (pathname.startsWith("/admin/users") && (session.user as { role?: string }).role !== "ADMIN") {
      return Response.redirect(new URL("/admin", req.url));
    }
  }

  return;
});

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
