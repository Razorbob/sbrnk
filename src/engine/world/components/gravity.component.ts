import { Entity, IComponent } from "../../core/ecs/ecs";

export class GravityComponent implements IComponent{
    
    id: string;
    Entity: Entity;
    private _gravity: number;

    constructor(gravity:number){
        this._gravity = gravity;
    }
    
    Update(dt: number): void {
        //console.log("Update Gravity Component");
    }
    Awake(): void {
        
    }
    Sleep(): void {
    }

    get gravity():number{
        return this._gravity;
    }
    
}