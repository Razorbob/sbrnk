import { vec3 } from "gl-matrix";
import { Entity, IComponent } from "../core/ecs/ecs";
import { Vector3 } from "../math/vector";

export class VelocityComponent implements IComponent {
    id: string;
    Entity: Entity;

    // translation velocity
    private _tVelocity: Vector3;
    private _lastTVelocity: Vector3; 
    // rotation velocity
    private _rVelocity: Vector3;
    private _lastRVelocity: Vector3; 

    constructor(tVelocity:Vector3=new Vector3(0,0,0),rVelocity:Vector3=new Vector3(0,0,0)){
        this._tVelocity = tVelocity;
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

    public get velocity():number[] {
        return [...this._lastTVelocity.asNumberArray,...this._lastRVelocity.asNumberArray];
    }

    public get lastVelocity():number[] {
        return [...this._tVelocity.asNumberArray,...this._rVelocity.asNumberArray];
    }

    public get lastTVelocity():Vector3 {
        return this._lastTVelocity;
    }

    public set lastTVelocity(vec:Vector3){
        this._lastTVelocity=vec;
    }

    public get lastRVelocity():Vector3{
        return this._lastRVelocity;
    }

    public set lastRVelocity(vec:Vector3){
        this._lastRVelocity=vec;
    }

    public get tVelocity():Vector3 {
        return this._tVelocity;
    }

    public set tVelocity(vec:Vector3){
        this._tVelocity=vec;
    }

    public get rVelocity():Vector3{
        return this._rVelocity;
    }

    public set rVelocity(vec:Vector3){
        this._rVelocity=vec;
    }
    
}