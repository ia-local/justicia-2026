const justiciaGouv = {
    async init() {
        // Chargement du JSON sémantique
        const response = await fetch('database.json');
        const data = await response.json();
        this.render(data);
    },

    render(data) {
        const root = document.getElementById('app-root');
        
        data.sections.forEach(section => {
            const container = document.createElement('section');
            container.className = 'manifesto-section';
            
            let html = `<h2 class="fr-h3">${section.title}</h2>`;

            if (section.id === 'penal-313') {
                html += `
                <div class="critical-alert">Alerte : Rétention de fonds identifiée (UDAF)</div>
                <table class="data-table">
                    <tr><td>RSA Certifié (Caf)</td><td><strong>568,94 €</strong> [cite: 47, 70]</td></tr>
                    <tr><td>APL (Bailleur)</td><td><strong>286,00 €</strong> [cite: 141]</td></tr>
                    <tr><td>Quotient Familial</td><td><strong>428 €</strong> </td></tr>
                    <tr><td>Seuil de Pauvreté (Insee)</td><td>1193,00 €</td></tr>
                </table>
                <p class="fr-text--sm fr-mt-2w">Source : Attestations Caf du 10/01/2026 </p>`;
            } else if (section.content) {
                html += `<p class="fr-text--lead">${section.content.analysis || ""}</p>
                         <p>Impact constaté : <strong>${section.content.impact || ""}</strong></p>`;
            }

            container.innerHTML = html;
            root.appendChild(container);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => justiciaGouv.init());