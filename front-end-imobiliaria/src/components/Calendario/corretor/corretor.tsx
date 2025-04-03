import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090"

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/usuario/corretores`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching agents:", error)
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}

