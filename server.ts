import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json({ limit: '50mb' }));

const DB_FILE = path.join(process.cwd(), 'documents.json');

async function getDb() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveDb(data: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(data));
}

app.post('/api/documents', async (req, res) => {
  try {
    const doc = req.body;
    const db = await getDb();
    db[doc.id] = doc;
    await saveDb(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save document' });
  }
});

app.get('/api/documents/:id', async (req, res) => {
  try {
    const db = await getDb();
    const doc = db[req.params.id];
    if (doc) {
      res.json(doc);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get document' });
  }
});

app.get('/api/documents', async (req, res) => {
  try {
    const db = await getDb();
    res.json(Object.values(db));
  } catch (error) {
    res.status(500).json({ error: 'Failed to get documents' });
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  try {
    const db = await getDb();
    delete db[req.params.id];
    await saveDb(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
