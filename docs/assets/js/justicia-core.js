/**
 * JUSTICIA 2026 - CORE ENGINE
 * Gestionnaire de données juridiques et de souveraineté
 */

const Justicia = {
    db: null,
    dbPath: '../assets/database.json', // Ajuste selon la profondeur du dossier

    async init() {
        try {
            const response = await fetch(this.dbPath);
            this.db = await response.json();
            console.log("Justicia Data Loaded: v" + this.db.system.version);
            
            this.renderGlobalData();
            this.runVictimCounter();
        } catch (error) {
            console.error("Erreur de chargement de la base Justicia:", error);
        }
    },

    // Injecte les données dans les éléments HTML ayant l'attribut data-justicia
    renderGlobalData() {
        document.querySelectorAll('[data-justicia]').forEach(el => {
            const path = el.getAttribute('data-justicia');
            const content = this.resolvePath(this.db, path);
            if (content) el.innerText = content;
        });
    },

    // Utilitaire pour naviguer dans le JSON (ex: "corpus_penal.escroquerie_finance.article")
    resolvePath(obj, path) {
        return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
    },

    // Compteur de victimes dynamique
    runVictimCounter() {
        const counterEl = document.getElementById('victim-count');
        if (!counterEl) return;

        let count = 1000000;
        setInterval(() => {
            count += Math.floor(Math.random() * 5);
            counterEl.innerText = count.toLocaleString('fr-FR');
        }, 4000);
    },

    // Fonction de copie pour les PV et courriers
    copyLegalText(elementId) {
        const textEl = document.getElementById(elementId);
        if (!textEl) return;

        navigator.clipboard.writeText(textEl.innerText).then(() => {
            alert("✅ Texte juridique copié. Prêt pour le dépôt (Art. 41-1 CPP).");
        }).catch(err => {
            console.error("Erreur de copie:", err);
        });
    }
};

// Lancement au chargement du DOM
document.addEventListener('DOMContentLoaded', () => Justicia.init());