import { IComponent } from "../core/ecs/component.interface";
import { Entity } from "../core/ecs/entity";
import { System } from "../core/ecs/system";

export class MassComponent implements IComponent {
    id: string;
    Entity: Entity;
    private _mass: number;

    constructor(newMass:number=0){
        this._mass = newMass; 
    }

    Update(dt: number, ): void {
       // console.log("Draw the Entity");
    }
    Awake(): void {
        //throw new Error("Method not implemented.");
    }
    Sleep(): void {
        //throw new Error("Method not implemented.");
    }
    
    public get mass():number{
        return this._mass;
    }
    public set mass(nm:number){
        this._mass = nm;
    }
    
}