import Phaser from 'phaser';
import earthPNG from './images/earth_effect.png';
import earthJSON from './images/earth_json.json';
import earthAnim from './images/earth_anim.json';
import firePNG from './images/fire_effect.png';
import fireJSON from './images/fire_json.json';
import fireAnim from './images/fire_anim.json';
import frostPNG from './images/frost_effect.png';
import frostJSON from './images/frost_json.json';
import frostAnim from './images/frost_anim.json';
import lightningPNG from './images/lightning_effect.png';
import lightningJSON from './images/lightning_json.json';
import lightningAnim from './images/lightning_anim.json';
import windPNG from './images/wind_effect.png';
import windJSON from './images/wind_json.json';
import windAnim from './images/wind_anim.json';
import wildPNG from './images/wild_effect.png';
import wildJSON from './images/wild_json.json';
import wildAnim from './images/wild_anim.json';
import sorceryPNG from './images/sorcery_effect.png';
import sorceryJSON from './images/sorcery_json.json';
import sorceryAnim from './images/sorcery_anim.json';
import righteousPNG from './images/righteous_effect.png';
import righteousJSON from './images/righteous_json.json';
import righteousAnim from './images/righteous_anim.json';
import spookyPNG from './images/spooky_effect.png';
import spookyJSON from './images/spooky_json.json';
import spookyAnim from './images/spooky_anim.json';
import arrowPNG from './images/arrow_effect.png';
import arrowJSON from './images/arrow_json.json';
import arrowAnim from './images/arrow_anim.json';
import { v4 as uuidv4 } from 'uuid';

export default class ParticleManager extends Phaser.Scene { 
    static preload(scene) {
        scene.load.atlas('earth_effect', earthPNG, earthJSON);
        scene.load.animation('earth_anim', earthAnim);
        scene.load.atlas('fire_effect', firePNG, fireJSON);
        scene.load.animation('fire_anim', fireAnim);
        scene.load.atlas('frost_effect', frostPNG, frostJSON);
        scene.load.animation('frost_anim', frostAnim);
        scene.load.atlas('lightning_effect', lightningPNG, lightningJSON);
        scene.load.animation('lightning_anim', lightningAnim);
        scene.load.atlas('wind_effect', windPNG, windJSON);
        scene.load.animation('wind_anim', windAnim);
        scene.load.atlas('wild_effect', wildPNG, wildJSON);
        scene.load.animation('wild_anim', wildAnim);
        scene.load.atlas('sorcery_effect', sorceryPNG, sorceryJSON);
        scene.load.animation('sorcery_anim', sorceryAnim);
        scene.load.atlas('righteous_effect', righteousPNG, righteousJSON);
        scene.load.animation('righteous_anim', righteousAnim);
        scene.load.atlas('spooky_effect', spookyPNG, spookyJSON);
        scene.load.animation('spooky_anim', spookyAnim);
        scene.load.atlas('arrow_effect', arrowPNG, arrowJSON);
        scene.load.animation('arrow_anim', arrowAnim);    
    };

    constructor(scene) {
        super(scene.matter.world, 0, 0, 'particle_effects');
        this.scene = scene; 
        this.particles = []; 
    };

    spriteMaker(scene, player, key) {
        return new Phaser.Physics.Matter.Sprite(scene.matter.world, player.x, player.y, key).setScale(0.3).setOrigin(0.5, 0.5).setDepth(player.depth + 1).setVisible(false);    
    };

    sensorListener(player, effect, effectSensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [effectSensor],
            callback: (other) => {
                if (other.gameObjectB && (other.gameObjectB.name === 'enemy' && player.name === 'player' || other.gameObjectB.name === 'player' && player.name === 'enemy')) {
                    if (player.name === 'player') {
                        if (this.scene.state.action !== effect.action) {
                            console.log("Resetting Action To " + effect.action + " From " + this.scene.state.action + " Due to Collision Success For PLAYER");
                            this.scene.setState('action', effect.action);
                        };
                    } else if (player.name === 'enemy') {
                        if (this.scene.state.computer_action !== effect.action) {
                            console.log("Resetting Action To " + effect.action + " From " + this.scene.state.computer_action + " Due to Collision Success For ENEMY");
                            this.scene.setState('computer_action', effect.action);
                        };
                    };
                    if (player.particleEffect && this.particles.find((particle) => particle.id === player.particleEffect.id)) player.particleEffect.success = true;
                };
            },
            context: this.scene,
        });
    };

    addEffect(action, player, key) { 
        let particle = {
            action: action,
            id: player.ascean._id + '_' + key + uuidv4(),
            key: key + '_effect',
            effect: this.spriteMaker(this.scene, player, key + '_effect'), 
            timer: this.scene.time.addEvent({
                delay: action === 'attack' ? 1500 : action === 'counter' ? 750 : action === 'posture' ? 1000 : 1500,
                callback: () => {
                    this.removeEffect(particle.id);
                },
            }),
            success: false,
            triggered: false,
            // velocity: action === 'attack' ? 5.5 : action === 'counter' ? 9 : action === 'posture' ? 7 : 5,
            velocity: action === 'attack' ? (player.flipX ? -4 : 4) : action === 'counter' ? (player.flipX ? -7 : 7) : action === 'posture' ? (player.flipX ? -5.5 : 5.5) : 4,
        };
        const { Bodies } = Phaser.Physics.Matter.Matter; // Import the Matter module 
        const effectSensor = Bodies.circle(player.x, player.y, 6, { isSensor: true, label: "effectSensor" }); 
        particle.effect.setExistingBody(effectSensor); 
        this.scene.add.existing(particle.effect);
        this.sensorListener(player, particle, effectSensor);
        this.particles.push(particle); 
        console.log(particle.id, "Particle ID")
        return particle;
    };

    removeEffect(id) {
        this.stopEffect(id);
        let particle = this.particles.find(particle => particle.id === id);
        if (particle) {
            particle.effect.destroy();
            this.particles = this.particles.filter(particle => particle.id !== id);
        };
    };

    startEffect(player, id) {
        let particle = this.particles.find(particle => particle.id === id);
        if (particle) {
            const direction = player.flipX ? -1 : 1;
            particle.effect.play(particle.key, true);
            particle.setVelocity(7 * direction, 0);
        };
    };

    stopEffect(id) {
        let particle = this.particles.find(particle => particle.id === id);
        if (particle) {
            particle.effect.setVisible(false);
            particle.effect.stop();
        };
    };

    update(player) { 
        if (!player.particleEffect) return;
        switch (player.particleEffect.action) {
            case 'attack':
                if (player.frameCount < 16) return;
                break;
            case 'counter':
                if (player.frameCount < 3) return;
                break;
            case 'posture':
                if (player.frameCount < 7) return;
                break; 
            default:
                break;
        };
        if (!player.particleEffect.effect.visible) player.particleEffect.effect.setVisible(true); 
        if (!player.flipX && !player.particleEffect.effect.flipX) player.particleEffect.effect.flipX = true;
        if (player.particleEffect && player.particleEffect.effect && this.particles.find((particle) => particle.id === player.particleEffect.id)) {
            player.particleEffect.effect.play(player.particleEffect.key, true);
            player.particleEffect.effect.setVelocity(player.particleEffect.velocity, player.body.velocity.y);
        };
    };
};