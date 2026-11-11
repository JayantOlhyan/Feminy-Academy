import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let cachedUri: string | undefined;

export async function getMongoClient(): Promise<MongoClient | null> {
  // Support test injection of a mocked or in-memory MongoClient
  const globalWithMock = global as typeof globalThis & {
    __mockMongoClient?: MongoClient;
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (globalWithMock.__mockMongoClient) {
    return globalWithMock.__mockMongoClient;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("MONGODB_URI is not defined in environment variables.");
    }
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!globalWithMock._mongoClientPromise || cachedUri !== uri) {
      client = new MongoClient(uri);
      cachedUri = uri;
      globalWithMock._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMock._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    if (!clientPromise || cachedUri !== uri) {
      client = new MongoClient(uri);
      cachedUri = uri;
      clientPromise = client.connect();
    }
  }

  return clientPromise;
}
