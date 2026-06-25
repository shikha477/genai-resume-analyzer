require("dotenv").config();

const app = require("./app");
const connectToDB = require("./config/database");

async function startServer() {
  try {
    await connectToDB();

    console.log("✅ MongoDB connected");

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });

  } catch (error) {
    console.error("❌ Failed to connect to DB:", error);
    process.exit(1);
  }
}

startServer();