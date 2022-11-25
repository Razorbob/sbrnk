import RendererComponent from "../../webgpu/renderer.component";
import { IDraw } from "../lifecycle/draw.interface";
import { Entity, IAwake, ISleep, IUpdate } from "./ecs";

type SystemType= 'UPDATE' | 'DRAW';

export abstract class System implements IAwake, IUpdate, ISleep{
    private _type: SystemType;
    private _priority:number;

    constructor(type: SystemType, priority:number){
        this._type = type;
        this._priority = priority;
    }

    public get Priority():number {
        return this._priority;
    }

    public get Type():SystemType {
        return this._type;
    }

    Update(dt: number): void {
    }
    Awake(): void {
    }
    Sleep(): void {
    }

}