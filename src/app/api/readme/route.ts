import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
    try {
        // Read the README.md file from the project root
        const readmePath = join(process.cwd(), "README.md");
        const content = await readFile(readmePath, "utf-8");

        return new NextResponse(content, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("Error reading README.md:", error);
        return new NextResponse("Error loading documentation", {
            status: 500,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    }
}
