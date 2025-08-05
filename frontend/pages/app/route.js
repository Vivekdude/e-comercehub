import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "your-mongodb-connection-string"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db("ecommerce");
    const collection = database.collection("products");

    const products = await collection.find({}).toArray();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
