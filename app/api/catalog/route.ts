import { auth } from "@/lib/auth";
import { readFile } from "fs/promises";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const filePath = path.join(process.cwd(), "assets", "pdf", "catalog.pdf");

  try {
    const fileBuffer = await readFile(filePath);
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      "inline; filename=\"catalog.pdf\"; filename*=UTF-8''catalog.pdf",
    );

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: headers,
    });
  } catch {
    return new NextResponse("file error", { status: 404 });
  }
}
