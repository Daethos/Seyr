class Tile {
    constructor(x, y, content) {
      this.x = x;
      this.y = y;
      this.content = content;
      this.color = this.setColor(content);
    }
  
    setColor(content) {
      const colorMap = {
        'enemy': 'red',
        'treasure': 'gold',
        'nothing': 'green',
        'weather': 'teal',
        'phenomena': 'purple',
      };
      return colorMap[content] || 'black';
    }
}

class ArenaMap {
    constructor(name, player) {
        this.name = name;
        this.player = player.name + "_" + player.origin + "_MAP_" + player._id;
        this.province = this.generateProvince(player.origin);
        this.size = 100;
        this.reference = player._id;
        this.contentOptions = ['enemy', 'treasure', 'nothing', 'weather', 'phenomena', 'wonder'];
        // this.contentClusters = this.generateContentClusters(this.province);
        this.contentClusters = this.generateContentClusters(this.provinceWeights(this.generateProvince(player.origin)));
        this.map = this.generateMap();
        this.contentCounts = {};
        this.countContent();
        this.updateContentClusters();
        this.steps = 0;
    };
  
    countContent() {
        this.contentCounts = {
            'nothing': 0,
            'enemy': 0,
            'treasure': 0,
            'phenomena': 0,
            'weather': 0,
        };
      
        for (let j = 0; j < 201; j++) {
          for (let k = 0; k < 201; k++) {
            let content = this.map[j][k].content;
            if (content in this.contentCounts) {
              this.contentCounts[content]++;
            } else {
              this.contentCounts['nothing']++;
            }
          };
        };
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
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
            'Fangs': {
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
            'Firelands': {
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
            'Kingdom': {
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
            'Licivitas': {
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
            'Sedyrus': {
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
            'Soverains': {
              'enemy': 400,
              'phenomena': 10,
              'weather': 4,
              'treasure': 30,
            },
        };
        return provinceWeights[province];
    };
  
    generateContentClusters(provinceWeights) {
        const contentOptionClusterSizes = {
          weather: { min: 24, max: 33 },
          enemy: { min: 1, max: 1 },
          treasure: { min: 1, max: 3 },
          phenomena: { min: 1, max: 3 },
          nothing: { min: 1, max: 1 },
        };
      
        let points = [];
        
        for (const option of this.contentOptions) {
            const weight = provinceWeights[option];
            const numClusters = weight; // Arbitrary number of clusters based on weight
            const clusterSize = contentOptionClusterSizes[option];
            
            if (option === 'city' || option === 'weather') {
                for (let i = 0; i < numClusters; i++) {
                    const centerX = this.getRandomInt(-50, 50);
                    const centerY = this.getRandomInt(-50, 50);
                    const bigSize = this.getRandomInt(clusterSize.min, clusterSize.max);
                    for (let j = 0; j < bigSize; j++) {
                        for (let k = 0; k < bigSize; k++) {
                            const point = [centerX + j, centerY + k, option];
                            points.push(point);
                        }
                    }
                }
            } else {
                for (let i = 0; i < numClusters; i++) {
                    const centerX = this.getRandomInt(-50, 50);
                    const centerY = this.getRandomInt(-50, 50);
                    const optionSize = this.getRandomInt(clusterSize.min, clusterSize.max);
                    for (let j = 0; j < optionSize; j++) {
                        for (let k = 0; k < optionSize; k++) {
                            const point = [centerX + j, centerY + k, option];
                            points.push(point);
                        };
                    };
                };
            }
        }
      
        const clusters = {};
        for (const option of this.contentOptions) {
          clusters[option] = points.filter((point) => point[2] === option).map((point) => point.slice(0, 2));
        }
      
        // Return the clusters
        return clusters;
    }
  
    generateMap() {
        const clusters = this.contentClusters;
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
  
    updateContentClusters() {
        const options = ['enemy', 'npc', 'phenomena'];
        for (const option of options) {
            if (!this.contentClusters[option]) {
                continue;
            };
            const clusters = this.contentClusters[option];
            let updatedCluster = [];
        
            for (const cluster of clusters) {
                const x = cluster[0] + 100;
                const y = cluster[1] + 100;
                if (this.map[x][y].content === option) {
                    updatedCluster.push(cluster);
                };
            };
            this.contentClusters[option] = updatedCluster;
        };
    };
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    getCoordinate(x, y) {
        return this.map.find((coord) => coord.coordinate.x === x && coord.coordinate.y === y);
    };
  };

  module.exports = ArenaMap;