import { Entity, IComponent } from "../core/ecs/ecs";
import { Vector3 } from "../math/vector";

export class PositionComponent implements IComponent {
    id: string;
    Entity: Entity;

    // Where is the Entity?
    private _position: Vector3;

    constructor(position:Vector3){
        this._position = position;
    }

    Update(dt: number): void {
        //throw new Error("Method not implemented.");
    }
    Awake(): void {
        //throw new Error("Method not implemented.");
    }
    Sleep(): void {
        //throw new Error("Method not implemented.");
    }
    
    public get position(): Vector3 {
        return this._position;
    }

    public set position(vec:Vector3){
        this._position=vec;
    }

    public get positionAsArray(): number[] {
        return [this._position.X, this._position.Y, this._position.Z];
    }

}