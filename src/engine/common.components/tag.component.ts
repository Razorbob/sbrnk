import { Entity, IComponent } from "../core/ecs/ecs";

export class TagComponent implements IComponent{
    id: string;
    Entity: Entity;
    _tags:Map<string, string>;
    
    constructor(){
        this._tags = new Map<string, string>();
    }
   

    public getTagsMap():Map<string, string>{
        return this._tags;
    }

    public getValue(key:string):string{
        return this._tags.get(key);
    }
    
    public getValuesAsArray():Array<{name: string}>{
        return Array.from( this._tags).map(([name, value]) => ({name, value}))
    }

    public hasTag(key:string):boolean{
        return this._tags.has(key);
    }

    public addTag(key: string, value:string):Map<string, string>{
        return this._tags.set(key,value);
    }
    
    /** Interface from IComponent */
    Update(dt: number): void {
        //throw new Error("Method not implemented.");
    }
    Awake(): void {
        //throw new Error("Method not implemented.");
    }
    Sleep(): void {
        //throw new Error("Method not implemented.");
    }
    
}