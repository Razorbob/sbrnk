import { type } from "os";
import { Vector3 } from "../../engine/math/vector";
import { SphereEntity } from "./sphere.entity";

export type planets = "SUN" | "MERCURY" | "VENUS" | "EARTH" | "MARS";

export class PlanetEntity extends SphereEntity{
    private _radius: number;
    private _distanceToSun: number;
    private _planettype: planets;
    public get planettype(): planets {
        return this._planettype;
    }
    public set planettype(value: planets) {
        this._planettype = value;
    }
   

    constructor(planettype:planets, scalefactor:number = 1){
        switch(planettype){
            case "SUN": super(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(0,0,0),new Vector3( 696, 696, 696)); this._planettype = planettype;break;
            case "MERCURY": super(new Vector3(0,0,0), new Vector3(630,0,0), new Vector3(0,0,0),new Vector3(2.4*scalefactor,2.4*scalefactor,2.4*scalefactor)); this._planettype = planettype;break;
            case "VENUS": super(new Vector3(0,0,0), new Vector3(-1075,0,0), new Vector3(0,0,0),new Vector3(6*scalefactor,6*scalefactor,6*scalefactor)); this._planettype = planettype;break;
            case "EARTH": super(new Vector3(0,0,0), new Vector3(0,0,1514), new Vector3(0,0,0),new Vector3(6.3*scalefactor,6.3*scalefactor,6.3*scalefactor)); this._planettype = planettype;break;
            case "MARS": super(new Vector3(0,0,0), new Vector3(0,0,-2488), new Vector3(0,0,0),new Vector3(3.3*scalefactor,3.3*scalefactor,3.3*scalefactor)); this._planettype = planettype;break;
        }
        
        
    }

    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }
    public get distanceToSun(): number {
        return this._distanceToSun;
    }
    public set distanceToSun(value: number) {
        this._distanceToSun = value;
    }
}