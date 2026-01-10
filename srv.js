/**
 * JUSTICIA 2026 - CORE SERVER
 * Port : 3113
 * Rôle : Orchestration des données juridiques et routage des preuves.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3113;

// Middleware de parsing JSON
app.use(express.json());

// Service des fichiers statiques (Architecture /docs)
app.use(express.static(path.join(__dirname, 'docs')));

/**
 * ROUTE : /sync-soup
 * Destinée à @GemBackend pour l'extraction de l'AGI Thought
 */
app.get('/sync-soup', (req, res) => {
    const soupPath = path.join(__dirname, 'soup.md');
    if (fs.existsSync(soupPath)) {
        const content = fs.readFileSync(soupPath, 'utf8');
        res.json({ status: 'success', kernel_thought: content });
    } else {
        res.status(404).json({ status: 'error', message: 'soup.md non trouvé' });
    }
});

/**
 * ROUTE : /api/database
 * Renvoie la base de données JSON actuelle (Lois, Articles, Constats)
 */
app.get('/api/database', (req, res) => {
    const dbPath = path.join(__dirname, 'docs/assets/database.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(dbData);
});

/**
 * ROUTE : /justicia-2026/*
 * Redirection vers le HUB pour les routes non définies (Resilience)
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs/index.html'));
});

// Initialisation du serveur
app.listen(PORT, () => {
    console.clear();
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║           JUSTICIA 2026 - SERVEUR DE SOUVERAINETÉ          ║");
    console.log("╠════════════════════════════════════════════════════════════╣");
    console.log(`║  PORT : ${PORT}                                               ║`);
    console.log(`║  STATUS : OPÉRATIONNEL (CORE_SYSTEM_CVNU.js Sync)          ║`);
    console.log(`║  URL : http://localhost:${PORT}                            ║`);
    console.log("╚════════════════════════════════════════════════════════════╝");
});