import express, { type Request, Response, NextFunction } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const log = (message: string) => console.log(`[html-game] ${message}`);

// Serve static files from the root directory
app.use(express.static(path.resolve(__dirname, '..')));

// Serve the main game file
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

// Start server
const port = 5000;
app.listen(port, "0.0.0.0", () => {
  log(`serving on port ${port}`);
});
