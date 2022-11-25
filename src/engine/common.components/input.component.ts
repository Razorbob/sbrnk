import { IComponent } from "../core/ecs/component.interface";
import { Entity } from "../core/ecs/entity";
import { PositionComponent } from "./position.component";

export type keyobject = {
    forward: boolean,
    backward: boolean,
    left: boolean,
    right: boolean,
    space: boolean,
    shift: boolean,
  };

export class InputComponent implements IComponent{
  protected _keys: keyobject;
  private _x:number;
  private _y:number;
  private _z:number;

  constructor(x:number=1,y:number=1,z:number=1){
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    this._x = x;
    this._y = y;
    this._z = z;
  }
  id: string;
  Entity: Entity;

  Sleep(): void {
    throw new Error("Method not implemented.");
  }

  Awake(){
    console.log("Input Component awake, Added Listeners");
    document.addEventListener('keydown', (e) => this._onKeyDown_(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  Update(dt: number): void {
    if(this._keys.forward){
      this.Entity.getComponent(PositionComponent).position.Z-=this._z*dt;
    }
    if(this._keys.backward){
      this.Entity.getComponent(PositionComponent).position.Z+=this._z*dt;
    }
    if(this._keys.right){
      this.Entity.getComponent(PositionComponent).position.X+=this._x*dt;
    }
    if(this._keys.left){
      this.Entity.getComponent(PositionComponent).position.X-=this._x*dt;
    }
    if(this._keys.space){
      this.Entity.getComponent(PositionComponent).position.Y+=this._y*dt;
    }
  }

  protected _onKeyDown_(event:KeyboardEvent) {
    // if (event.currentTarget != document.body) {
    //   return;
    // }
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  protected _onKeyUp(event:KeyboardEvent) {
    // if (event.currentTarget != document.body) {
    //   return;
    // }
    console.log("KeyDown EVENT");
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
}