// Bulgarian cities data with coordinates and experience details
const BULGARIAN_CITIES = {
    'topolovgrad': {
        name: 'Topolovgrad',
        region: 'Haskovo',
        coordinates: [42.0833, 26.3333],
        population: '5.4K',
        overview: 'Small town in southeastern Bulgaria near Sakar Mountain. Known for Thracian tombs, ancient sites, and folklore.',
        stops: [
            'Morning: Walk through the town, visit the ethnographic museum',
            'Afternoon: Hike to nearby Thracian dolmens and ancient ruins',
            'Evening: Traditional dinner with local wine and folklore'
        ],
        hidden_gem: 'Ask locals about hidden Thracian rock sanctuaries — many aren\'t on the maps',
        closing: 'Topolovgrad offers a journey through ancient Thracian history, natural beauty, and authentic local culture.'
    },
    'sevlievo': {
        name: 'Sevlievo',
        region: 'Gabrovo',
        coordinates: [43.0167, 25.1167],
        population: '24K',
        overview: 'A town in central Bulgaria known for its medieval fortress, Revival-era spirit, and easy access to the Balkan Mountains.',
        welcome: 'Welcome to Sevlievo, a town in central Bulgaria known for its medieval fortress, Revival-era spirit, and easy access to the Balkan Mountains. Today, we\'ll uncover a blend of history and living traditions.',
        stops: [
            'Hotalich Fortress → medieval ruins',
            'Clock Tower & Town Center → local vibe',
            'Art Gallery & Historical Museum → cultural heritage'
        ],
        hidden_gem: 'Walk along the Rositsa River',
        closing: 'That\'s Sevlievo: history on a hilltop, vibrant local life, and gateways to Bulgaria\'s traditions.'
    },
    'ruse': {
        name: 'Ruse',
        region: 'Ruse',
        coordinates: [43.8564, 25.9564],
        population: '144K',
        overview: 'Little Vienna on the Danube, with grand architecture and lively riverfront.',
        stops: [
            'Freedom Square - neoclassical center',
            'Dohodno Zdanie & History Museum - 19th-century culture',
            'Danube Promenade - evening walks and cruises',
            'Ivanovo Rock Churches - UNESCO frescoes'
        ],
        hidden_gem: 'Roman fortress Sexaginta Prista',
        closing: 'Ruse blends the Danube\'s spirit with Europe\'s elegance.'
    },
    'belene': {
        name: 'Belene',
        region: 'Pleven',
        coordinates: [43.6500, 25.1167],
        population: '8.5K',
        overview: 'A Danube town with natural beauty and deep historical scars.',
        stops: [
            'Persin Island - bird reserve',
            'History Museum & Belene Prison Memorial - labor camp history',
            'Danube Riverside Walk - sunset views'
        ],
        hidden_gem: 'Fishermen boat rides',
        closing: 'Belene is where nature heals and history reminds us.'
    },
    'veliko-tarnovo': {
        name: 'Veliko Tarnovo',
        region: 'Veliko Tarnovo',
        coordinates: [43.0757, 25.6172],
        population: '66K',
        overview: 'The medieval capital of Bulgaria, full of grandeur and charm.',
        stops: [
            'Tsarevets Fortress - medieval stronghold',
            'Samovodska Charshia - craft street',
            'Yantra River & Viewpoints - panoramas',
            'Sound & Light Show - evening spectacle'
        ],
        hidden_gem: 'St. Peter and Paul Church (14th-century frescoes)',
        closing: 'Veliko Tarnovo is Bulgaria\'s living history book.'
    },
    'lovech': {
        name: 'Lovech',
        region: 'Lovech',
        coordinates: [43.1333, 24.7167],
        population: '36K',
        overview: 'Bridges, fortresses, and natural wonders near the Osam River.',
        stops: [
            'Covered Bridge - Kolyo Ficheto\'s landmark',
            'Varosha Quarter - Revival architecture',
            'Hisarya Fortress - medieval ruins',
            'Stratesh Hill Park - lilac gardens'
        ],
        hidden_gem: 'Devetashka Cave & Krushuna Waterfalls',
        closing: 'Lovech connects centuries through bridges and heritage.'
    },
    'batak': {
        name: 'Batak',
        region: 'Pazardzhik',
        coordinates: [41.9500, 24.2167],
        population: '3.4K',
        overview: 'A place of sacrifice and natural beauty in the Rhodopes.',
        stops: [
            'St. Nedelya Church - April Uprising massacre site',
            'Historical Museum - national revival exhibits',
            'Batak Dam - serene nature spot',
            'Rhodopes Trails - hiking opportunities'
        ],
        hidden_gem: 'Mountain chapels with views',
        closing: 'Batak is where tragedy forged spirit and nature restores peace.'
    },
    'koprivshtitsa': {
        name: 'Koprivshtitsa',
        region: 'Sofia',
        coordinates: [42.6333, 24.3500],
        population: '2.4K',
        overview: 'A living museum of Bulgaria\'s National Revival.',
        stops: [
            'Revival Houses - Todor Kableshkov, Lyuben Karavelov',
            'Assumption Church - rich icons',
            'Stone Bridges - historic charm'
        ],
        hidden_gem: 'National Folklore Festival (August)',
        closing: 'Koprivshtitsa is history alive in every street.'
    },
    'melnik': {
        name: 'Melnik',
        region: 'Blagoevgrad',
        coordinates: [41.5167, 23.3833],
        population: '385',
        overview: 'Bulgaria\'s smallest town, rich in wine and sand pyramids.',
        stops: [
            'Kordopulova House - Revival mansion with wine cellars',
            'Melnik Sand Pyramids - natural formations',
            'Wine Cellars - local tastings',
            'Rozhen Monastery - frescoes and vineyards'
        ],
        hidden_gem: 'Underground wine tunnels',
        closing: 'Melnik is small in size, but overflowing with flavor and history.'
    }
};

// Global variables
let map;
let selectedCity = null;
let markers = {};
let currentPage = 'map'; // 'map' or 'experience'

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    setupEmbroideryAnimation();
    setupFAQ();
    
    // Also try to setup FAQ after a short delay to ensure DOM is ready
    setTimeout(setupFAQ, 100);
});

// Initialize the map
function initializeMap() {
    // Create map centered on Bulgaria with proper bounds
    map = L.map('map').setView([42.5, 25.0], 6.5);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Set bounds to ensure Bulgaria is always fully visible
    const bulgariaBounds = L.latLngBounds(
        L.latLng(41.2, 22.3), // Southwest corner
        L.latLng(44.2, 28.6)  // Northeast corner
    );
    map.setMaxBounds(bulgariaBounds);
    map.fitBounds(bulgariaBounds);

    // Add markers for all cities
    Object.keys(BULGARIAN_CITIES).forEach(cityId => {
        const city = BULGARIAN_CITIES[cityId];
        const marker = L.marker(city.coordinates, {
            icon: L.divIcon({
                className: 'custom-marker',
                html: `<div class="marker-pin"><i class="fas fa-map-marker-alt"></i></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            })
        }).addTo(map);

        marker.bindPopup(`
            <div class="popup-content">
                <h3>${city.name}</h3>
                <p>${city.region}</p>
                <p><strong>Population:</strong> ${city.population}</p>
                <p>${city.description}</p>
            </div>
        `);

        marker.on('click', () => selectCity(cityId));
        markers[cityId] = marker;
    });
}

// Setup event listeners
function setupEventListeners() {
    // City card clicks
    document.querySelectorAll('.city-card').forEach(card => {
        card.addEventListener('click', function() {
            const cityId = this.dataset.city;
            selectCity(cityId);
        });
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetMap);

    // Explore button
    const exploreButton = document.getElementById('exploreButton');
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            console.log('Explore button clicked, selectedCity:', selectedCity);
            showExperienceContent();
        });
    } else {
        console.log('Explore button not found');
    }

    // Back button
    document.getElementById('backButton').addEventListener('click', function() {
        showMapPage();
    });

}

// Select a city
function selectCity(cityId) {
    // Remove previous selection
    if (selectedCity) {
        document.querySelector(`[data-city="${selectedCity}"]`).classList.remove('selected');
        markers[selectedCity].setIcon(L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin"><i class="fas fa-map-marker-alt"></i></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        }));
    }

    // Set new selection
    selectedCity = cityId;
    const city = BULGARIAN_CITIES[cityId];
    
    // Update UI
    document.querySelector(`[data-city="${cityId}"]`).classList.add('selected');
    
    // Update marker
    markers[cityId].setIcon(L.divIcon({
        className: 'custom-marker selected',
        html: `<div class="marker-pin selected"><i class="fas fa-map-marker-alt"></i></div>`,
        iconSize: [35, 35],
        iconAnchor: [17.5, 35]
    }));

    // Zoom to city
    map.setView(city.coordinates, 12, {
        animate: true,
        duration: 1
    });

    // Show city details
    showCityDetails(city);

    // Show reset button
    document.getElementById('resetBtn').style.display = 'block';
    
    // Scroll down completely to show the city details
    setTimeout(() => {
        const detailsSection = document.getElementById('selectedCityDetails');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 100);
}

// Show city details
function showCityDetails(city) {
    const detailsSection = document.getElementById('selectedCityDetails');
    const titleElement = document.getElementById('selectedCityTitle');
    const descriptionElement = document.getElementById('selectedCityDescription');

    titleElement.textContent = city.name;
    descriptionElement.textContent = city.overview;
    
    detailsSection.style.display = 'block';
    
    // Hide experience content initially
    const experienceContent = document.getElementById('experienceContent');
    if (experienceContent) {
        experienceContent.style.display = 'none';
    }
}

// Reset map to initial view
function resetMap() {
    // Remove selection
    if (selectedCity) {
        document.querySelector(`[data-city="${selectedCity}"]`).classList.remove('selected');
        markers[selectedCity].setIcon(L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin"><i class="fas fa-map-marker-alt"></i></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        }));
    }

    selectedCity = null;
    
    // Reset map view to show all of Bulgaria
    const bulgariaBounds = L.latLngBounds(
        L.latLng(41.2, 22.3), // Southwest corner
        L.latLng(44.2, 28.6)  // Northeast corner
    );
    map.fitBounds(bulgariaBounds, {
        animate: true,
        duration: 1
    });

    // Hide details, experience content, and reset button
    document.getElementById('selectedCityDetails').style.display = 'none';
    document.getElementById('experienceContent').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
}

// Show experience content below the button
function showExperienceContent() {
    console.log('showExperienceContent function called!');
    
    // Show the experience content section
    const experienceContent = document.getElementById('experienceContent');
    if (experienceContent) {
        experienceContent.style.display = 'block';
        console.log('Experience content displayed');
        
        // Update content based on selected city
        updateExperienceContent();
        
        // Scroll to the content
        experienceContent.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.log('Experience content element not found');
    }
}

// Update experience content based on selected city
function updateExperienceContent() {
    if (!selectedCity) return;
    
    const city = BULGARIAN_CITIES[selectedCity];
    const tourStopsWrapper = document.querySelector('.tour-stops-wrapper');
    const attractionsWrapper = document.querySelector('.attractions-photos-wrapper');
    
    if (!tourStopsWrapper || !attractionsWrapper) return;
    
    // Update tour stops content
    const titleElement = tourStopsWrapper.querySelector('.experience-content-title');
    const stopsList = tourStopsWrapper.querySelector('.stops-list');
    const hiddenGemSection = tourStopsWrapper.querySelector('.hidden-gem-section');
    const hiddenGemText = hiddenGemSection.querySelector('.hidden-gem-text');
    
    if (selectedCity === 'topolovgrad') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Thracian tombs & dolmens</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Sakar Mountain trails</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Local ethnographic museum</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'The hidden Thracian rock sanctuaries';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" alt="Thracian Tombs" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Thracian Tombs & Dolmens</h4>
                    <p class="photo-description">Ancient burial sites in nearby villages</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Sakar Mountain" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Sakar Mountain Trails</h4>
                    <p class="photo-description">Hiking and birdwatching opportunities</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" alt="Ethnographic Museum" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Local Ethnographic Museum</h4>
                    <p class="photo-description">Traditional culture and history</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop" alt="Theater Festival" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Festival of Amateur Theaters</h4>
                    <p class="photo-description">Annual cultural event in May</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'ruse') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Freedom Square</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Dohodno Zdanie & History Museum</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Ivanovo Rock Churches</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'Roman fortress Sexaginta Prista';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Freedom Square" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Freedom Square</h4>
                    <p class="photo-description">Neoclassical center of Little Vienna</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Dohodno Zdanie" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Dohodno Zdanie & History Museum</h4>
                    <p class="photo-description">19th-century culture and heritage</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Ivanovo Rock Churches" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Ivanovo Rock Churches</h4>
                    <p class="photo-description">UNESCO frescoes in rock-hewn churches</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'belene') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Persin Island</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">History Museum & Belene Prison Memorial</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Danube Riverside Walk</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'Fishermen boat rides';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Persin Island" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Persin Island</h4>
                    <p class="photo-description">Bird reserve and natural beauty</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Belene Prison Memorial" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">History Museum & Prison Memorial</h4>
                    <p class="photo-description">Labor camp history and remembrance</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Danube Riverside" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Danube Riverside Walk</h4>
                    <p class="photo-description">Sunset views along the river</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'veliko-tarnovo') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Tsarevets Fortress</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Samovodska Charshia</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Yantra River & Viewpoints</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'St. Peter and Paul Church (14th-century frescoes)';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Tsarevets Fortress" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Tsarevets Fortress</h4>
                    <p class="photo-description">Medieval stronghold and capital</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Samovodska Charshia" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Samovodska Charshia</h4>
                    <p class="photo-description">Traditional craft street</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Yantra River" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Yantra River & Viewpoints</h4>
                    <p class="photo-description">Panoramic views and river beauty</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'lovech') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Covered Bridge</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Varosha Quarter</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Hisarya Fortress</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Stratesh Hill Park</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'Devetashka Cave & Krushuna Waterfalls';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Covered Bridge" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Covered Bridge</h4>
                    <p class="photo-description">Kolyo Ficheto's architectural landmark</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Varosha Quarter" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Varosha Quarter</h4>
                    <p class="photo-description">Revival architecture and heritage</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Hisarya Fortress" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Hisarya Fortress</h4>
                    <p class="photo-description">Medieval ruins and history</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop" alt="Stratesh Hill Park" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Stratesh Hill Park</h4>
                    <p class="photo-description">Lilac gardens and natural beauty</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'batak') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">St. Nedelya Church</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Historical Museum</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Batak Dam</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'Mountain chapels with views';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="St. Nedelya Church" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">St. Nedelya Church</h4>
                    <p class="photo-description">April Uprising massacre site</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Historical Museum" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Historical Museum</h4>
                    <p class="photo-description">National revival exhibits</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Batak Dam" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Batak Dam</h4>
                    <p class="photo-description">Serene nature spot</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'koprivshtitsa') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Revival Houses</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Assumption Church</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Stone Bridges</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'National Folklore Festival';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Revival Houses" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Revival Houses</h4>
                    <p class="photo-description">Todor Kableshkov, Lyuben Karavelov</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Assumption Church" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Assumption Church</h4>
                    <p class="photo-description">Rich icons and heritage</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Stone Bridges" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Stone Bridges</h4>
                    <p class="photo-description">Historic charm and architecture</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'melnik') {
        // Update title
        titleElement.textContent = 'Tour Stops';
        
        // Update stops list
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Kordopulova House</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Melnik Sand Pyramids</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Wine Cellars</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Rozhen Monastery</span>
            </div>
        `;
        
        // Update hidden gem
        hiddenGemText.textContent = 'Underground wine tunnels';
        
        // Update attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Main Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Kordopulova House" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Kordopulova House</h4>
                    <p class="photo-description">Revival mansion with wine cellars</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Melnik Sand Pyramids" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Melnik Sand Pyramids</h4>
                    <p class="photo-description">Natural formations and landscapes</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Wine Cellars" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Wine Cellars</h4>
                    <p class="photo-description">Local wine tastings</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop" alt="Rozhen Monastery" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Rozhen Monastery</h4>
                    <p class="photo-description">Frescoes and vineyards</p>
                </div>
            </div>
        `;
        
    } else if (selectedCity === 'sevlievo') {
        // Reset to Sevlievo content
        titleElement.textContent = 'Tour Stops';
        stopsList.innerHTML = `
            <div class="stop-item">
                <span class="stop-text">Medieval fortress Hotalich</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Clock Tower & Town History Museum</span>
            </div>
            <div class="stop-item">
                <span class="stop-text">Sevlievo Art Gallery</span>
            </div>
        `;
        hiddenGemText.textContent = 'Walk along the Rositsa River';
        
        // Reset attractions section
        const attractionsTitle = attractionsWrapper.querySelector('.photos-title');
        const photosGrid = attractionsWrapper.querySelector('.photos-grid');
        
        attractionsTitle.textContent = 'Sevlievo Attractions';
        photosGrid.innerHTML = `
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Hotalich Fortress" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Hotalich Fortress</h4>
                    <p class="photo-description">Medieval fortress ruins with panoramic views</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" alt="Clock Tower" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Clock Tower</h4>
                    <p class="photo-description">Historic clock tower in the town center</p>
                </div>
            </div>
            
            <div class="photo-item">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" alt="Art Gallery" class="attraction-photo">
                <div class="photo-caption">
                    <h4 class="photo-title">Art Gallery</h4>
                    <p class="photo-description">Cultural heritage and art collection</p>
                </div>
            </div>
        `;
    }
}

// Show map page
function showMapPage() {
    currentPage = 'map';
    
    // Hide experience page
    const experiencePage = document.getElementById('experiencePage');
    if (experiencePage) {
        experiencePage.style.display = 'none';
    }
    
    // Show map page
    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'flex';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Setup subtle background animation
function setupEmbroideryAnimation() {
    const subtleBackground = document.getElementById('subtleBackground');
    
    // Add scroll event listener for subtle movement
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const scrollSpeed = 0.1; // Very subtle movement
        
        // Move the background pattern based on scroll
        subtleBackground.style.transform = `translate(${-scrollY * scrollSpeed}px, ${-scrollY * scrollSpeed}px)`;
    });
    
    // Add mouse move effect for subtle parallax
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Very subtle movement based on mouse position
        const moveX = (mouseX - 0.5) * 5;
        const moveY = (mouseY - 0.5) * 5;
        
        subtleBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// Add custom marker styles
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        background: transparent;
        border: none;
    }
    
    .marker-pin {
        width: 30px;
        height: 30px;
        background: #d32f2f;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .marker-pin i {
        color: white;
        font-size: 14px;
        transform: rotate(45deg);
    }
    
    .marker-pin.selected {
        background: #b71c1c;
        width: 35px;
        height: 35px;
        border: 4px solid white;
        box-shadow: 0 3px 12px rgba(183, 28, 28, 0.4);
    }
    
    .marker-pin.selected i {
        font-size: 16px;
    }
    
    .popup-content {
        text-align: center;
        min-width: 200px;
    }
    
    .popup-content h3 {
        margin: 0 0 10px 0;
        color: #000000;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .popup-content p {
        margin: 5px 0;
        color: #000000;
        font-size: 0.9rem;
    }
    
    .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid #e2e8f0;
    }
`;
document.head.appendChild(style);

// Setup FAQ functionality
function setupFAQ() {
    console.log('Setting up FAQ functionality...');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    if (faqItems.length === 0) {
        console.log('No FAQ items found, retrying...');
        return;
    }
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        console.log(`FAQ item ${index}:`, question, answer);
        
        if (question && answer) {
            // Remove any existing event listeners
            question.removeEventListener('click', handleFAQClick);
            
            // Add click event listener
            question.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('FAQ clicked:', index);
                
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.padding = '0 20px';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 20px';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = '200px';
                    answer.style.padding = '20px';
                }
            });
        }
    });
}

// FAQ click handler function
function handleFAQClick(e) {
    e.preventDefault();
    console.log('FAQ clicked');
}

// Simple FAQ toggle function for individual questions
function toggleFAQ(faqId) {
    console.log('Toggle FAQ:', faqId);
    
    const faqItem = document.getElementById(faqId);
    if (!faqItem) {
        console.log('FAQ item not found:', faqId);
        return;
    }
    
    const answer = faqItem.querySelector('.faq-answer');
    const icon = faqItem.querySelector('.faq-icon');
    
    if (!answer || !icon) {
        console.log('Answer or icon not found');
        return;
    }
    
    // Close all other FAQ items first
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item.id !== faqId) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            if (otherAnswer && otherIcon) {
                otherAnswer.style.maxHeight = '0';
                otherAnswer.style.padding = '0 20px';
                otherIcon.textContent = '+';
            }
        }
    });
    
    // Toggle current FAQ item
    const isActive = faqItem.classList.contains('active');
    
    if (isActive) {
        // Close this FAQ
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.padding = '0 20px';
        icon.textContent = '+';
        console.log('FAQ closed');
    } else {
        // Open this FAQ
        faqItem.classList.add('active');
        answer.style.maxHeight = '200px';
        answer.style.padding = '20px';
        icon.textContent = '−';
        console.log('FAQ opened');
    }
}

// Redirect to registration page
function redirectToExplore() {
    // Get the email input value
    const emailInput = document.querySelector('.email-input');
    const email = emailInput ? emailInput.value.trim() : '';
    
    // Accept test email or just "test" for testing purposes
    if (email === 'test123@gmail.com' || email === 'test' || (email && email.includes('@'))) {
        // Store email in localStorage for future use
        localStorage.setItem('userEmail', email);
        
        // Redirect to registration page
        window.location.href = 'register.html';
    } else {
        // Show alert if no valid email
        alert('Please enter a valid email address to continue.');
    }
}

// Redirect to sign in page
function redirectToSignIn() {
    window.location.href = 'signin.html';
}

// Show Free Plan Options (Registration or Sign In)
function showFreePlanOptions() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Get Started with Free Plan</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="free-plan-options">
                    <div class="option-card">
                        <h4>New to Bulgaria Local Experience?</h4>
                        <p>Create your free account to start exploring Bulgarian cities</p>
                        <button class="option-button primary" onclick="redirectToRegistration()">Create Account</button>
                    </div>
                    <div class="option-divider">
                        <span>or</span>
                    </div>
                    <div class="option-card">
                        <h4>Already have an account?</h4>
                        <p>Sign in to access your free tours and guides</p>
                        <button class="option-button secondary" onclick="redirectToSignIn()">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    addModalStyles();
}

// Show Annual Plan Registration with Payment
function showAnnualPlanRegistration() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>Annual Pass - 7-Day Free Trial</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="registration-form">
                    <div class="form-section">
                        <h4>Account Information</h4>
                        <div class="form-row">
                            <input type="text" placeholder="First Name" class="form-input" required>
                            <input type="text" placeholder="Last Name" class="form-input" required>
                        </div>
                        <input type="email" placeholder="Email Address" class="form-input" required>
                        <input type="password" placeholder="Password" class="form-input" required>
                    </div>
                    
                    <div class="form-section">
                        <h4>Payment Information</h4>
                        <div class="payment-info">
                            <div class="plan-summary">
                                <div class="plan-item">
                                    <span>Annual Pass</span>
                                    <span>$79.99/year</span>
                                </div>
                                <div class="plan-item trial">
                                    <span>7-day free trial</span>
                                    <span>Free</span>
                                </div>
                                <div class="plan-item total">
                                    <span>Total after trial</span>
                                    <span>$79.99/year</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="payment-methods">
                            <div class="payment-method active">
                                <i class="fab fa-cc-visa"></i>
                                <span>Credit Card</span>
                            </div>
                            <div class="payment-method">
                                <i class="fab fa-paypal"></i>
                                <span>PayPal</span>
                            </div>
                        </div>
                        
                        <div class="card-details">
                            <input type="text" placeholder="Card Number" class="form-input" maxlength="19">
                            <div class="form-row">
                                <input type="text" placeholder="MM/YY" class="form-input" maxlength="5">
                                <input type="text" placeholder="CVV" class="form-input" maxlength="4">
                            </div>
                            <input type="text" placeholder="Billing Address" class="form-input">
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <div class="checkbox-group">
                            <input type="checkbox" id="terms" required>
                            <label for="terms">I agree to the <a href="#" class="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a></label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="trial" checked>
                            <label for="trial">Start with 7-day free trial, then $79.99/year. Cancel anytime.</label>
                        </div>
                    </div>
                    
                    <button class="submit-button" onclick="processAnnualRegistration()">
                        <i class="fas fa-lock"></i>
                        Start Free Trial
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    addModalStyles();
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Redirect to registration page
function redirectToRegistration() {
    window.location.href = 'register.html';
}

// Process annual registration
function processAnnualRegistration() {
    alert('Annual Pass registration processed! You will be redirected to the payment gateway.');
    // In a real app, this would process the payment and create the account
    closeModal();
}

// Add modal styles
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'modalStyles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-content.large {
            max-width: 600px;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #000000;
            font-size: 1.5rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .free-plan-options {
            text-align: center;
        }
        
        .option-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .option-card h4 {
            margin: 0 0 10px 0;
            color: #000000;
        }
        
        .option-card p {
            margin: 0 0 15px 0;
            color: #666;
        }
        
        .option-button {
            width: 100%;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }
        
        .option-button.primary {
            background: #a5d6a7;
            color: white;
        }
        
        .option-button.primary:hover {
            background: #81c784;
        }
        
        .option-button.secondary {
            background: transparent;
            color: #a5d6a7;
            border: 2px solid #a5d6a7;
        }
        
        .option-button.secondary:hover {
            background: #a5d6a7;
            color: white;
        }
        
        .option-divider {
            margin: 20px 0;
            position: relative;
            text-align: center;
        }
        
        .option-divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: #e2e8f0;
        }
        
        .option-divider span {
            background: white;
            padding: 0 15px;
            color: #666;
        }
        
        .form-section {
            margin-bottom: 25px;
        }
        
        .form-section h4 {
            margin: 0 0 15px 0;
            color: #000000;
            font-size: 1.1rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 15px;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #a5d6a7;
        }
        
        .plan-summary {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .plan-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .plan-item.trial {
            color: #a5d6a7;
            font-weight: 600;
        }
        
        .plan-item.total {
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .payment-methods {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .payment-method {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .payment-method.active {
            border-color: #a5d6a7;
            background: #f0f8f0;
        }
        
        .payment-method:hover {
            border-color: #a5d6a7;
        }
        
        .card-details {
            margin-top: 15px;
        }
        
        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .checkbox-group input[type="checkbox"] {
            margin-top: 3px;
        }
        
        .checkbox-group label {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.4;
        }
        
        .submit-button {
            width: 100%;
            background: #a5d6a7;
            color: white;
            border: none;
            padding: 15px 24px;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
        }
        
        .submit-button:hover {
            background: #81c784;
        }
        
        .trial-badge {
            background: #a5d6a7;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-top: 8px;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
}

// Audio Guide functionality using Web Speech API
let currentSpeech = null;
let audioPlaylist = [];
let currentTrackIndex = 0;
let isPlaying = false;

// Audio content for cities (using text-to-speech)
const AUDIO_FILES = {
    'sevlievo': [
        {
            name: 'Hotalich Fortress',
            text: 'Welcome to the Medieval Fortress Hotalich, one of Bulgaria\'s best-preserved historical sites. Located on a hill near Sevlievo, Hotalich dates back to the tenth century. As you walk through the ruins, imagine the life of the medieval town — its stone walls, churches, and workshops. Excavations began in 1979, and much of the site has been beautifully restored. Enjoy the panoramic views over the valley as you explore this symbol of Bulgaria\'s early past.'
        },
        {
            name: 'Clock Tower & Museum',
            text: 'This is the Clock Tower, the oldest public building in Sevlievo, built in 1779. Its elegant octagonal design and carved stone details make it a true local landmark. Just nearby, you\'ll find the Town History Museum, housed in the Hadjistoyan School from 1844. Inside, you can explore Sevlievo\'s past — from ancient artifacts to stories of the Bulgarian National Revival.'
        },
        {
            name: 'Art Gallery',
            text: 'Welcome to the Sevlievo Art Gallery, named after the brothers Asen and Iliya Peykov. The gallery is located in a beautiful nineteenth-century building designed by Austrian architect Josef Schnitter. Inside, you\'ll find inspiring works of Bulgarian art — paintings, sculptures, and exhibitions that celebrate the region\'s creative spirit. It\'s a peaceful and cultural stop on your tour of Sevlievo.'
        }
    ],
    'topolovgrad': [
        {
            name: 'Welcome to Topolovgrad',
            text: 'Welcome to Topolovgrad, a charming town nestled in the Sakar Mountain of southeastern Bulgaria. Today, we\'ll explore a mix of history, culture, and nature — and discover why this little-known place is such a hidden treasure.'
        },
        {
            name: 'Stop 1: The Town Center',
            text: 'Let\'s begin our journey right here, in the central square of Topolovgrad. Notice the relaxed rhythm of the town: small cafés, people greeting each other by name, and the surrounding hills in the distance. Ahead of you stands the St. George Church, one of the oldest in the region. Step inside to admire its icons and feel the atmosphere of a traditional Bulgarian church. Just nearby, we\'ll visit the Local History Museum. Inside, you\'ll find ancient Thracian artifacts and an ethnographic exhibition showing everyday life from past centuries — from farming tools to traditional costumes.'
        },
        {
            name: 'Stop 2: Thracian Dolmens near Hlyabovo',
            text: 'Next, we leave town and head a short distance to the village of Hlyabovo, home to some of the best-preserved Thracian dolmens in Bulgaria. These stone tombs date back over 2,500 years. Imagine ancient Thracian tribes carrying out burial rituals here, believing these chambers connected them to the afterlife. Stand inside one of these dolmens and you\'ll feel the weight of history surrounding you.'
        },
        {
            name: 'Stop 3: Sakar Mountain Walk',
            text: 'After our journey into the ancient past, it\'s time for some fresh air. We\'ll take a short walk in the Sakar Mountain. This area is rich in biodiversity — look up, and you might see imperial eagles or black storks circling above. The rolling hills and vineyards create a peaceful landscape. This is a wonderful spot to take photos or simply pause and breathe in the mountain air.'
        },
        {
            name: 'Stop 4: Dinner & Wine Experience',
            text: 'As the sun sets, we return to Topolovgrad for a taste of local cuisine. Tonight\'s menu features traditional dishes like kavarma — slow-cooked meat and vegetables served in clay pots — and fresh banitsa, the classic Bulgarian pastry. Don\'t forget to try the local Sakar wines. The mountain\'s slopes are famous for bold red varieties like Merlot and Cabernet Sauvignon. Each sip carries the flavor of this land. And if you\'re adventurous, say yes if a local offers you homemade rakia — but be prepared, it\'s strong!'
        }
    ]
};

// Start Audio Guide
function startAudioGuide() {
    // Check if user has selected a city
    if (!selectedCity) {
        alert('Please select a city first to start the audio guide.');
        return;
    }
    
    const city = BULGARIAN_CITIES[selectedCity];
    
    // Check if audio files exist for this city
    if (!AUDIO_FILES[selectedCity]) {
        alert(`Audio guide not yet available for ${city.name}. Coming soon!`);
        return;
    }
    
    // Initialize audio playlist
    audioPlaylist = AUDIO_FILES[selectedCity];
    currentTrackIndex = 0;
    
    // Create audio player UI if it doesn't exist
    createAudioPlayer();
    
    // Start playing the first track
    playCurrentTrack();
}

// Create audio player UI
function createAudioPlayer() {
    // Remove existing audio player if any
    const existingPlayer = document.getElementById('audioPlayer');
    if (existingPlayer) {
        existingPlayer.remove();
    }
    
    // Create audio player container
    const audioPlayer = document.createElement('div');
    audioPlayer.id = 'audioPlayer';
    audioPlayer.className = 'audio-player';
    audioPlayer.innerHTML = `
        <div class="audio-player-content">
            <div class="audio-info">
                <h4 class="audio-title">Audio Guide: ${BULGARIAN_CITIES[selectedCity].name}</h4>
                <p class="audio-track-info">Track ${currentTrackIndex + 1} of ${audioPlaylist.length}</p>
            </div>
            <div class="audio-controls">
                <button class="audio-btn" id="prevBtn" onclick="previousTrack()">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="audio-btn primary" id="playPauseBtn" onclick="togglePlayPause()">
                    <i class="fas fa-play" id="playPauseIcon"></i>
                </button>
                <button class="audio-btn" id="nextBtn" onclick="nextTrack()">
                    <i class="fas fa-step-forward"></i>
                </button>
                <button class="audio-btn" id="stopBtn" onclick="stopAudio()">
                    <i class="fas fa-stop"></i>
                </button>
            </div>
            <div class="audio-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="time-info">
                    <span id="currentTime">0:00</span>
                    <span id="totalTime">0:00</span>
                </div>
            </div>
        </div>
    `;
    
    // Add to the audio guide section
    const audioGuideSection = document.querySelector('.audio-guide-section');
    audioGuideSection.appendChild(audioPlayer);
    
    // Add CSS for audio player
    addAudioPlayerStyles();
}

// Add CSS styles for audio player
function addAudioPlayerStyles() {
    if (document.getElementById('audioPlayerStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'audioPlayerStyles';
    style.textContent = `
        .audio-player {
            background: #ffffff;
            border: 2px solid #a5d6a7;
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 4px 12px rgba(165, 214, 167, 0.2);
        }
        
        .audio-player-content {
            text-align: center;
        }
        
        .audio-info {
            margin-bottom: 15px;
        }
        
        .audio-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #000000;
            margin: 0 0 5px 0;
        }
        
        .audio-track-info {
            font-size: 0.9rem;
            color: #666;
            margin: 0;
        }
        
        .audio-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .audio-btn {
            width: 40px;
            height: 40px;
            border: 2px solid #a5d6a7;
            border-radius: 50%;
            background: transparent;
            color: #a5d6a7;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .audio-btn:hover {
            background: #a5d6a7;
            color: white;
            transform: scale(1.1);
        }
        
        .audio-btn.primary {
            background: #a5d6a7;
            color: white;
            width: 50px;
            height: 50px;
        }
        
        .audio-btn.primary:hover {
            background: #81c784;
        }
        
        .audio-progress {
            margin-top: 10px;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 8px;
        }
        
        .progress-fill {
            height: 100%;
            background: #a5d6a7;
            width: 0%;
            transition: width 0.1s ease;
        }
        
        .time-info {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #666;
        }
    `;
    document.head.appendChild(style);
}

// Play current track using Web Speech API
function playCurrentTrack() {
    if (!audioPlaylist || currentTrackIndex >= audioPlaylist.length) return;
    
    const track = audioPlaylist[currentTrackIndex];
    
    // Stop current speech if playing
    if (currentSpeech) {
        speechSynthesis.cancel();
        currentSpeech = null;
    }
    
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
        alert('Speech synthesis is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
        showTextFallback(track);
        return;
    }
    
    // Create speech synthesis utterance
    currentSpeech = new SpeechSynthesisUtterance(track.text);
    
    // Configure speech settings
    currentSpeech.rate = 0.9; // Slightly slower for better comprehension
    currentSpeech.pitch = 1.0; // Normal pitch
    currentSpeech.volume = 1.0; // Full volume
    
    // Try to use a female voice if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Karen') ||
        voice.name.includes('Susan') ||
        (voice.lang.startsWith('en') && voice.name.includes('Female'))
    );
    
    if (femaleVoice) {
        currentSpeech.voice = femaleVoice;
    } else if (voices.length > 0) {
        // Use first available English voice
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
            currentSpeech.voice = englishVoice;
        }
    }
    
    // Set up event listeners
    currentSpeech.onstart = () => {
        isPlaying = true;
        updatePlayPauseButton();
        updateTrackInfo();
        startProgressSimulation();
    };
    
    currentSpeech.onend = () => {
        isPlaying = false;
        updatePlayPauseButton();
        nextTrack();
    };
    
    currentSpeech.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        isPlaying = false;
        updatePlayPauseButton();
        showTextFallback(track);
    };
    
    // Start speaking
    speechSynthesis.speak(currentSpeech);
}

// Handle speech synthesis error
function handleSpeechError() {
    const track = audioPlaylist[currentTrackIndex];
    showTextFallback(track);
}

// Show text fallback when audio file is not available
function showTextFallback(track) {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'audio-fallback';
        fallbackDiv.innerHTML = `
            <div class="fallback-content">
                <h4>${track.name}</h4>
                <p>${track.text}</p>
                <button class="audio-btn primary" onclick="nextTrack()">
                    <i class="fas fa-step-forward"></i>
                    Next
                </button>
            </div>
        `;
        
        // Replace audio player content
        audioPlayer.innerHTML = '';
        audioPlayer.appendChild(fallbackDiv);
        
        // Add fallback styles
        const style = document.createElement('style');
        style.textContent = `
            .audio-fallback {
                text-align: center;
                padding: 20px;
            }
            
            .fallback-content h4 {
                color: #000000;
                margin-bottom: 15px;
                font-size: 1.1rem;
            }
            
            .fallback-content p {
                color: #666;
                line-height: 1.6;
                margin-bottom: 20px;
                text-align: left;
            }
        `;
        document.head.appendChild(style);
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (!currentSpeech) return;
    
    if (isPlaying) {
        speechSynthesis.pause();
        isPlaying = false;
    } else {
        speechSynthesis.resume();
        isPlaying = true;
    }
    updatePlayPauseButton();
}

// Update play/pause button
function updatePlayPauseButton() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (playPauseIcon) {
        playPauseIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
}

// Update track info
function updateTrackInfo() {
    const trackInfo = document.querySelector('.audio-track-info');
    if (trackInfo) {
        trackInfo.textContent = `Track ${currentTrackIndex + 1} of ${audioPlaylist.length}`;
    }
}

// Next track
function nextTrack() {
    if (currentTrackIndex < audioPlaylist.length - 1) {
        currentTrackIndex++;
        playCurrentTrack();
    } else {
        // End of playlist
        stopAudio();
        alert('Audio guide completed! Thank you for exploring with us.');
    }
}

// Previous track
function previousTrack() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        playCurrentTrack();
    }
}

// Stop audio
function stopAudio() {
    if (currentSpeech) {
        speechSynthesis.cancel();
        currentSpeech = null;
    }
    isPlaying = false;
    updatePlayPauseButton();
    
    // Remove audio player
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.remove();
    }
}

// Start progress simulation for speech synthesis
function startProgressSimulation() {
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    
    if (!progressFill || !currentTime || !totalTime) return;
    
    // Estimate duration based on text length (roughly 150 words per minute)
    const track = audioPlaylist[currentTrackIndex];
    const wordCount = track.text.split(' ').length;
    const estimatedDuration = (wordCount / 150) * 60; // seconds
    
    totalTime.textContent = formatTime(estimatedDuration);
    
    let startTime = Date.now();
    let progressInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(progressInterval);
            return;
        }
        
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min((elapsed / estimatedDuration) * 100, 100);
        
        progressFill.style.width = progress + '%';
        currentTime.textContent = formatTime(elapsed);
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 100);
}

// Update progress bar (kept for compatibility)
function updateProgress() {
    // This function is kept for compatibility but not used with speech synthesis
}

// Update duration (kept for compatibility)
function updateDuration() {
    // This function is kept for compatibility but not used with speech synthesis
}

// Format time in MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
