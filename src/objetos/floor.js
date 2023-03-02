/**
 * Clase que representa el suelo, es de tipo Sprite pero no tiene una imagen asociada
 * Tendra un collider para que los personajes no caigan por debajo
 */
export default class Floor extends Phaser.GameObjects.Sprite {

  constructor(scene, y) {
    super(scene, 0, scene.sys.game.canvas.height-y);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    this.scene.physics.add.collider(this);

    // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
    this.body.width = scene.sys.game.canvas.width+100;
    this.body.height = 10;
  }
}