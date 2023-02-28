const noise = require('noisejs').Noise;
const perlin = new noise(Math.random());

class Tile {
    constructor(x, y, content) {
        this.x = x;
        this.y = y;
        this.content = content;
        this.color = this.setColor(content);
    }
    displayContent() {
        console.log(`(${this.x}, ${this.y}): ${this.content}`);
    }
    setColor(content) {
        switch (content) {
            case 'enemy': {
                return 'red';
            };
            case 'npc': {
                return 'blue';
            };
            case 'treasure': {
                return 'gold';
            };
            case 'landmark': {
                return 'blueviolet';
            };
            case 'hazard': {
                return 'darkorange';
            };
            case 'dungeon': {
                return 'brown';
            };
            case 'city': {
                return 'purple';
            };
            case 'nothing': {
                return 'green';
            };
            case 'weather': {
                return 'teal';
            };
            case 'ruins': {
                return 'grey';
            };
            case 'cave': {
                return 'sienna';
            };
            case 'phenomena': {
                return 'pink';
            };
            case 'wonder': {
                return 'white';
            };
        }
    }
}

class WorldMap {
    constructor(name, player) {
        this.name = name;
        this.player = player.name + "_" + player.origin + "_MAP_" + Date.now()  + player._id;
        this.province = this.generateProvince(player.origin);
        this.contentOptions = ['enemy', 'npc', 'treasure', 'landmark', 'hazard', 'dungeon', 'city', 'nothing', 'weather', 'ruins', 'cave', 'phenomena', 'wonder'];
        this.size = 100;
        this.contentClusters = this.generateContentClusters(this.generateProvince(player.origin));
        this.map = this.generateMap();
        this.reference = this.player._id;
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
              'enemy': 10,
              'npc': 2,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 2,
              'landmark': 4,
              'hazard': 6,
              'dungeon': 2,
              'city': 2,
              'nothing': 60,
            },
            'Fangs': {
              'enemy': 10,
              'npc': 4,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 2,
              'landmark': 2,
              'hazard': 8,
              'dungeon': 2,
              'city': 2,
              'nothing': 58,
            },
            'Firelands': {
              'enemy': 12,
              'npc': 10,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 4,
              'landmark': 4,
              'hazard': 2,
              'dungeon': 2,
              'city': 4,
              'nothing': 50,
            },
            'Kingdom': {
              'enemy': 10,
              'npc': 6,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 2,
              'landmark': 2,
              'hazard': 6,
              'dungeon': 2,
              'city': 2,
              'nothing': 58,
            },
            'Licivitas': {
              'enemy': 12,
              'npc': 8,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 4,
              'landmark': 4,
              'hazard': 4,
              'dungeon': 2,
              'city': 4,
              'nothing': 50,
            },
            'Sedyrus': {
              'enemy': 10,
              'npc': 4,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 2,
              'landmark': 2,
              'hazard': 8,
              'dungeon': 2,
              'city': 2,
              'nothing': 58,
            },
            'Soverains': {
              'enemy': 10,
              'npc': 6,
              'phenomena': 2,
              'wonder': 2,
              'ruins': 2,
              'cave': 2,
              'weather': 4,
              'treasure': 2,
              'landmark': 2,
              'hazard': 6,
              'dungeon': 2,
              'city': 2,
              'nothing': 58,
            },
        };
        return provinceWeights[province];
    };

    generateContentClusters(provinceWeights) {
        let clusters;
        let minDistance;
        
        do {
            clusters = {};
            for (const option of this.contentOptions) {
                const weight = provinceWeights[option];
                const numClusters = Math.round(weight / 2); // Arbitrary number of clusters based on weight
                let clusterSize;
                if (option === 'city' || option === 'weather') {
                    clusterSize = this.getRandomInt(24, 33); // Adjust cluster size for cities and weather Cities and Weather are difference as they are habitable by npcs, enemies, and each other. How do I write this function?
                } else if (option === 'enemy' || option === 'npc') {
                    clusterSize = this.getRandomInt(1, 3);
                } else if (option === 'landmark' || option === 'hazard' || option === 'ruins' || option === 'wonder') {
                    clusterSize = this.getRandomInt(3, 5);
                } else if (option === 'dungeon' || option === 'cave') {
                    clusterSize = this.getRandomInt(2, 3);
                } else if (option === 'treasure' || option === 'phenomena') {
                    clusterSize = 1;
                    // clusterSize = Math.ceil(Math.sqrt(this.size / (numClusters * 10))); // Adjust cluster size for content
                } else {
                    clusterSize = Math.ceil(this.size / weight);
                };
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
            
            minDistance = this.size / 50; // Change this number to adjust minimum distance
            
        } while (!this.checkConsistency(clusters, minDistance));
        
        return clusters;
    };
      
    getClusterShape(numClusters) {
        const shape = [];
        for (let i = 0; i < numClusters; i++) {
            for (let j = 0; j < numClusters; j++) {
                shape.push([i % 2, j % 2]);
            };
        };
        return shape;
    };
    

    generateMap() {
        const provinceWeights = this.provinceWeights(this.province);
        const clusters = this.generateContentClusters(provinceWeights);
        const map = [];
        for (let i = -100; i < 101; i++) {
          const row = [];
          for (let j = -100; j < 101; j++) {
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

    checkConsistency(clusters, minDistance) {
        for (const option of this.contentOptions) {
            for (let i = 0; i < clusters[option].length; i++) {
                const cluster1 = clusters[option][i];
                for (let j = i + 1; j < clusters[option].length; j++) {
                    const cluster2 = clusters[option][j];
                    if (this.getDistance(cluster1, cluster2) < minDistance) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    getDistance(cluster1, cluster2) {
        const [x1, y1] = this.getCenter(cluster1);
        const [x2, y2] = this.getCenter(cluster2);
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    getCenter(cluster) {
        const x = cluster.map(coord => coord[0]).reduce((a, b) => a + b) / cluster.length;
        const y = cluster.map(coord => coord[1]).reduce((a, b) => a + b) / cluster.length;
        return [x, y];
    }
    

    
    
    getRandomInt(min, max) {
        // Get a random integer between min and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    getCoordinate(x, y) {
        return this.map.find((coord) => coord.coordinate.x === x && coord.coordinate.y === y);
    };
};

// const player = {
//     name: 'Game Developer',
//     origin: "Fyers",
//     sex: "Man"
// }

// const map = new WorldMap(player);

// console.log(player, 'New Player');
// console.log(map.map, 'New Map')
// const firstTenRows = Object.values(map.map).slice(0, 20);
// firstTenRows.forEach(row => {
//     const rowContent = Object.values(row).slice(0, 20).map(tile => console.log(tile, 'Tile'));
// });

// generateCity(x, y) {
//     const citySize = calculateCitySize(x, y);
    
//     // Generate the city's walls
//     const walls = generateWalls(x, y, citySize);
    
//     // Generate the city's buildings
//     const buildings = generateBuildings(x, y, citySize);
    
//     // Generate the city's NPCs
//     const npcs = generateNPCs(x, y, citySize);
    
//     // Return the city content cluster
//     return {
//       type: 'city',
//       x: x,
//       y: y,
//       size: citySize,
//       walls: walls,
//       buildings: buildings,
//       npcs: npcs
//     };
// };
  
// calculateCitySize(x, y) {
//     // Use a noise algorithm to determine the city size based on the map location
//     const noiseValue = calculateNoise(x, y);
    
//     // Map the noise value to a city size between 10 and 30 tiles
//     const citySize = mapValue(noiseValue, -1, 1, 10, 30);
    
//     return citySize;
// }

// generateWalls(x, y, citySize) {
//     // Generate the city walls based on the city size
//     const wallSize = citySize + 2;
//     const wallTiles = [];
  
//     for (let i = x - wallSize; i <= x + wallSize; i++) {
//         for (let j = y - wallSize; j <= y + wallSize; j++) {
//             if (i === x - wallSize || i === x + wallSize || j === y - wallSize || j === y + wallSize) {
//                 wallTiles.push({x: i, y: j, type: 'wall'});
//             }
//         }
//     }
//     return wallTiles;
// }
  
// generateBuildings(x, y, citySize) {
//     // Generate the city buildings based on the city size
//     const numBuildings = Math.floor(citySize / 5);
//     const buildingTiles = [];
  
//     for (let i = 0; i < numBuildings; i++) {
//         const buildingX = getRandomInt(x - citySize + 2, x + citySize - 2);
//         const buildingY = getRandomInt(y - citySize + 2, y + citySize - 2);
//         const buildingSize = getRandomInt(3, 8);
    
//         for (let j = buildingX - buildingSize; j <= buildingX + buildingSize; j++) {
//             for (let k = buildingY - buildingSize; k <= buildingY + buildingSize; k++) {
//                 if (j === buildingX - buildingSize || j === buildingX + buildingSize || k === buildingY - buildingSize || k === buildingY + buildingSize) {
//                     buildingTiles.push({x: j, y: k, type: 'building-wall'});
//                 } else {
//                     buildingTiles.push({x: j, y: k, type: 'building-floor'});
//                 }
//             }
//         }
//     }
//     return buildingTiles;
// }
  
// generateNPCs(x, y, citySize) {
// // Generate the city NPCs based on the city size
// const numNPCs = Math.floor(citySize / 2);
// const npcTiles = [];

// for (let i = 0; i < numNPCs; i++) {
//     const npcX = getRandomInt(x - citySize + 2, x + citySize - 2);
//     const npcY = getRandomInt(y - citySize + 2, y + citySize - 2);

//     npcTiles.push({x: npcX, y: npcY, type: 'npc'});
// }

// return npcTiles;
// }
  
// calculateNoise(x, y) {
//     // Generate Perlin noise at the given x, y coordinates
//     const noiseValue = perlin.perlin2(x, y);

//     return noiseValue;
// }
  
// mapValue(value, inputMin, inputMax, outputMin, outputMax) {
//     // Map a value from one range to another
//     return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
// }

module.exports = WorldMap;