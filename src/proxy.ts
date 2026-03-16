import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/userService";
import { Role } from "./constants/role";

export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  console.log(pathname);
  let isAuthenticated = false;
  let role: string = Role.USER; //* Default role is USER

  const { data } = await userService.getSession();
  console.log("Data is here:", JSON.stringify(data));
  if (data) {
    isAuthenticated = true;
    role = data.user.role;
  }

  //* Not authenticated → login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* Only ADMIN & PROVIDER can access provider routes
  if (
    pathname.startsWith("/add-meal") &&
    role !== Role.PROVIDER &&
    role !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // * Only ADMIN can access admin dashboard
  // if (
  //   pathname.startsWith("/add-meal") &&
  //   role !== Role.ADMIN
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-meal",
  ],
};