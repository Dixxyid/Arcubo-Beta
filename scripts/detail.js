document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const planetId = params.get('planet') || 'bumi';

    try {
        const response = await fetch('../data/planets.json');
        if (!response.ok) throw new Error('Gagal memuat data planet');
        const planetsData = await response.json();

        const data = planetsData[planetId] || planetsData['bumi'];

        if (!data) return;

        // Set Title & Meta
        document.title = `Objek Astronomi: ${data.title}`;
        document.getElementById('planet-title').textContent = data.title;
        document.getElementById('planet-subtitle').textContent = data.subtitle;

        // Set Image
        const imgEl = document.getElementById('planet-img');
        if (imgEl) {
            imgEl.src = data.image;
            imgEl.alt = `${data.title} Objek AR`;
        }

        // Set Astro Info
        const astroCard = document.getElementById('card-astro');
        const astroInfoEl = document.getElementById('planet-astro-info');
        if (data.astro_info) {
            astroInfoEl.innerHTML = data.astro_info;
            astroCard.style.display = 'block';
        } else {
            astroCard.style.display = 'none';
        }

        // Set Specs Grid
        const specsCard = document.getElementById('card-specs');
        const specsGridEl = document.getElementById('planet-specs-grid');
        if (data.specs && data.specs.length > 0) {
            specsGridEl.innerHTML = data.specs.map(s => `
                <div class="spec-item">
                    <div class="spec-label">${s.label}</div>
                    <div class="spec-value">${s.value}</div>
                </div>
            `).join('');
            specsCard.style.display = 'block';
        } else {
            specsCard.style.display = 'none';
        }

        // Set Layers List
        const layersCard = document.getElementById('card-layers');
        const layersListEl = document.getElementById('planet-layers-list');
        if (data.layers && data.layers.length > 0) {
            layersListEl.innerHTML = data.layers.map(l => `
                <li class="structure-item">
                    <div class="structure-name">${l.name}</div>
                    <div class="structure-desc">${l.desc}</div>
                </li>
            `).join('');
            layersCard.style.display = 'block';
        } else {
            layersCard.style.display = 'none';
        }

        // Set 3D Model
        const modelCard = document.getElementById('card-3d');
        const viewerEl = document.getElementById('planet-viewer');
        if (data.model_src) {
            viewerEl.src = data.model_src;
            viewerEl.alt = `Model 3D ${data.title}`;
            modelCard.style.display = 'block';
        } else {
            modelCard.style.display = 'none';
        }

    } catch (err) {
        console.error('Error loading planet detail:', err);
    }
});
