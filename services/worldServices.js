const noise = require('noisejs').Noise;
const perlin = new noise(Math.random());

class Tile {
    constructor(x, y, content) {
        this.x = x;
        this.y = y;
        this.content = content;
    }
    displayContent() {
        console.log(`(${this.x}, ${this.y}): ${this.content}`);
    }
}

class WorldMap {
    constructor(player) {
        this.player = player;
        this.province = this.generateProvince(player.origin);
        this.contentOptions = ['enemy', 'npc', 'treasure', 'landmark', 'hazard', 'dungeon', 'city', 'nothing'];
        this.size = 100;
        this.contentClusters = this.generateContentClusters(this.generateProvince(player.origin));
        this.map = this.generateMap();
    };

    generateProvince(origin) {
        switch (origin) {
            case "Ashtre" : {
                return "Astralands";
            };
            case "Fyers" : {
                return "Firelands";
            };
            case "Li'ivi" : {
                return "Licivitas";
            };
            case "Notheo" : {
                return "Kingdom";
            };
            case "Nothos" : {
                return "Soverains";
            };
            case "Quor'eite" : {
                return "Sedyrus";
            };
            case "Sedyreal" : {
                return "Sedyrus";
            };
            default: {
                return "Licivitas";
            };
        };
    };

    provinceWeights(province) {
        const provinceWeights = {
            'Astralands': {
                'enemy': 2,
                'npc': 1,
                'treasure': 1,
                'landmark': 2,
                'hazard': 4,
                'dungeon': 1,
                'city': 1,
                'nothing': 24,
            },
            'Fangs': {
                'enemy': 3,
                'npc': 2,
                'treasure': 2,
                'landmark': 1,
                'hazard': 3,
                'dungeon': 1,
                'city': 1,
                'nothing': 20,
            },
            'Firelands': {
                'enemy': 2,
                'npc': 3,
                'treasure': 2,
                'landmark': 2,
                'hazard': 2,
                'dungeon': 1,
                'city': 1,
                'nothing': 16,
            },
            'Kingdom': {
                'enemy': 2,
                'npc': 2,
                'treasure': 1,
                'landmark': 2,
                'hazard': 3,
                'dungeon': 1,
                'city': 1,
                'nothing': 20,
            },
            'Licivitas': {
                'enemy': 2,
                'npc': 3,
                'treasure': 2,
                'landmark': 3,
                'hazard': 2,
                'dungeon': 1,
                'city': 1,
                'nothing': 16,
            },
            'Sedyrus': {
                'enemy': 2,
                'npc': 1,
                'treasure': 1,
                'landmark': 2,
                'hazard': 4,
                'dungeon': 1,
                'city': 1,
                'nothing': 24,
            },
            'Soverains': {
                'enemy': 2,
                'npc': 2,
                'treasure': 1,
                'landmark': 2,
                'hazard': 3,
                'dungeon': 1,
                'city': 1,
                'nothing': 20,
            },
        };
        return provinceWeights[province];
    };

    generateContentClusters(provinceWeights) {
        const clusters = {};
        for (const option of this.contentOptions) {
            const weight = provinceWeights[option];
            const numClusters = Math.round(weight / 2); // Arbitrary number of clusters based on weight
            const clusterSize = Math.ceil(this.size / numClusters); // Size of each cluster
            clusters[option] = [];
            for (let i = 0; i < numClusters; i++) {
                const x = Math.floor(Math.random() * (this.size - clusterSize));
                const y = Math.floor(Math.random() * (this.size - clusterSize));
                const cluster = [];
                for (let j = 0; j < clusterSize; j++) {
                    for (let k = 0; k < clusterSize; k++) {
                        cluster.push([x + j, y + k]);
                    };
                };
                clusters[option] = clusters[option].concat(cluster);
            };
        };
        return clusters;
    };
      

    generateMap() {
        const provinceWeights = this.provinceWeights(this.province);
        const clusters = this.generateContentClusters(provinceWeights);
        const map = [];
        for (let i = 0; i < this.size; i++) {
          const row = [];
          for (let j = 0; j < this.size; j++) {
            let content = 'nothing';
            for (const option of this.contentOptions) {
              if (clusters[option].some(([x, y]) => x === i && y === j)) {
                content = option;
              };
            };
            row.push(new Tile(i, j, content));
          };
          map.push(row);
        };
        return map;
    };

    generateCity(x, y) {
        const citySize = calculateCitySize(x, y);
        
        // Generate the city's walls
        const walls = generateWalls(x, y, citySize);
        
        // Generate the city's buildings
        const buildings = generateBuildings(x, y, citySize);
        
        // Generate the city's NPCs
        const npcs = generateNPCs(x, y, citySize);
        
        // Return the city content cluster
        return {
          type: 'city',
          x: x,
          y: y,
          size: citySize,
          walls: walls,
          buildings: buildings,
          npcs: npcs
        };
      }
      
    calculateCitySize(x, y) {
        // Use a noise algorithm to determine the city size based on the map location
        const noiseValue = calculateNoise(x, y);
        
        // Map the noise value to a city size between 10 and 30 tiles
        const citySize = mapValue(noiseValue, -1, 1, 10, 30);
        
        return citySize;
    }
      
    
    generateWalls(x, y, citySize) {
        // Generate the city walls based on the city size
        const wallSize = citySize + 2;
        const wallTiles = [];
      
        for (let i = x - wallSize; i <= x + wallSize; i++) {
            for (let j = y - wallSize; j <= y + wallSize; j++) {
                if (i === x - wallSize || i === x + wallSize || j === y - wallSize || j === y + wallSize) {
                    wallTiles.push({x: i, y: j, type: 'wall'});
                }
            }
        }
        return wallTiles;
      }
      
    generateBuildings(x, y, citySize) {
        // Generate the city buildings based on the city size
        const numBuildings = Math.floor(citySize / 5);
        const buildingTiles = [];
      
        for (let i = 0; i < numBuildings; i++) {
            const buildingX = getRandomInt(x - citySize + 2, x + citySize - 2);
            const buildingY = getRandomInt(y - citySize + 2, y + citySize - 2);
            const buildingSize = getRandomInt(3, 8);
        
            for (let j = buildingX - buildingSize; j <= buildingX + buildingSize; j++) {
                for (let k = buildingY - buildingSize; k <= buildingY + buildingSize; k++) {
                    if (j === buildingX - buildingSize || j === buildingX + buildingSize || k === buildingY - buildingSize || k === buildingY + buildingSize) {
                        buildingTiles.push({x: j, y: k, type: 'building-wall'});
                    } else {
                        buildingTiles.push({x: j, y: k, type: 'building-floor'});
                    }
                }
            }
        }
        return buildingTiles;
    }
      
      generateNPCs(x, y, citySize) {
        // Generate the city NPCs based on the city size
        const numNPCs = Math.floor(citySize / 2);
        const npcTiles = [];
      
        for (let i = 0; i < numNPCs; i++) {
          const npcX = getRandomInt(x - citySize + 2, x + citySize - 2);
          const npcY = getRandomInt(y - citySize + 2, y + citySize - 2);
      
          npcTiles.push({x: npcX, y: npcY, type: 'npc'});
        }
      
        return npcTiles;
      }
      
      calculateNoise(x, y) {
        // Generate Perlin noise at the given x, y coordinates
        const noiseValue = perlin.perlin2(x, y);
    
        return noiseValue;
      }
      
      mapValue(value, inputMin, inputMax, outputMin, outputMax) {
        // Map a value from one range to another
        return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
      }
      
      getRandomInt(min, max) {
        // Get a random integer between min and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    

    getCoordinate(x, y) {
        return this.map.find((coord) => coord.coordinate.x === x && coord.coordinate.y === y);
    };
};

const player = {
    name: 'Player',
    origin: "Ashtre"
}

const map = new WorldMap(player);

console.log(player, 'New Player');
console.log(typeof map, 'Map Type');
const firstTenRows = Object.values(map).slice(0, 10);
firstTenRows.forEach(row => {
    const rowContent = Object.values(row).slice(0, 10).map(tile => console.log(tile, 'Tile'));
});