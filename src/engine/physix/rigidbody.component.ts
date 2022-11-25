import { Vector } from "mnemonist";
import { type } from "os";
import { PlanetEntity } from "../../game/gameObjects/planet.entity";
import { PositionComponent } from "../common.components/position.component";
import { TransformComponent } from "../common.components/transform.component";
import { Entity, IComponent } from "../core/ecs/ecs";
import { Vector3 } from "../math/vector";


export class RigidBodyComponent implements IComponent {
    id: string;
    Entity: Entity;


    private _velocity: Vector3;
    private _angularVelocity: Vector3;
    private _gravity: Vector3;
    private _momentum:Vector3;
   

    private _mass: number;
    private _drag: number;
    private _angularDrag: number;
    
    private _affectedByGravity: boolean;
    private _affectedByphysix: boolean;

    private _worldCenterOfMass: Vector3;
    private _freezeRotation: Vector3;
    private _freezeMovement: Vector3;
    private _initialDistanceToSun:number;


    constructor(newMass:number=1,newDrag:number=0,newangularDrag:number=0,newvelocity:Vector3=new Vector3(0,0,0),newangularVelocity:Vector3=new Vector3(0,0,0),newaffectedByGravity:boolean=true,newaffectedByphysix:boolean=true,newfreezeRotation:Vector3=new Vector3(0,0,0),newfreezeMovement:Vector3=new Vector3(0,0,0),newMomentum:Vector3=new Vector3(0,0,0)){
        this._mass = newMass;
        this._drag = newDrag;
        this._angularDrag = newangularDrag;
        this._velocity = newvelocity;
        this._angularVelocity = newangularVelocity;
        this._affectedByGravity = newaffectedByGravity;
        this._affectedByphysix = newaffectedByphysix;
        this._freezeRotation = newfreezeRotation;
        this._freezeMovement = newfreezeMovement;
        this._momentum = newMomentum;
        this._gravity = new Vector3(0,-9.81,0);
        
    }

    Update(dt: number): void {

        // const m1 = this._mass;
        // const m2 = 333000;
        // const G = 1000;
        // const r = this._initialDistanceToSun //this.Entity.getComponent(PositionComponent).position.magnitude;
        // const dir = this.Entity.getComponent(PositionComponent).position.clone();
        // dir.multiplyByScalar(-1);
        // const direction = dir.normal;

        // const F = G*m1*m2/(r*r);
        // direction.multiplyByScalar(F);
        // direction.devideByScalar(m1);
        // direction.multiplyByScalar(dt);
        // this._velocity.add(direction);
        // this.Entity.getComponent(TransformComponent).rotation.Y += 180*dt;

        // F = ma
        // a = F/m
        // dv/dt = a = F/m
        // dx/dt = v

        

        // acceleration = force / mass
        // change in position = velocity * dt
        // change in velocity = acceleration * dt


        const gravforce:Vector3 = this._gravity.clone();
        gravforce.multiplyByScalar(this._mass);
        gravforce.devideByScalar(this._mass);
        // //  dv = a*dt = F/m *dt
        // let acceleration = nforce.clone();

        gravforce.multiplyByScalar(dt);
        this.velocity.add(gravforce);

        // // dx = v * dt
        let vel2=this._velocity.clone();
        vel2.multiplyByScalar(dt);
        this.Entity.getComponent(PositionComponent).position.add(vel2);
        
        // this.Entity.getComponent(PositionComponent).position.add(vel2);


        // this.Entity.getComponent(TransformComponent).rotation.add(vel2);
        //console.log(""+pos.X+" "+pos.Y+" "+pos.Z);


        // dp/dt = F
        // dp = F * dt
        // v = p/m
        // dx/dt = v
        // dx = v * dt
        
    }
    Awake(): void {

        if(this.Entity instanceof PlanetEntity){
            this._initialDistanceToSun = this.Entity.getComponent(PositionComponent).position.magnitude;
            console.log(this._initialDistanceToSun);
            //throw new Error("Method not implemented.");
            const m2 = 333000;
            const G = 1000;
            const r = this._initialDistanceToSun
            const v=Math.sqrt(G*m2/r);

            const dir = this.Entity.getComponent(PositionComponent).position.clone();
            dir.multiplyByScalar(-1);
            const dirCopy = dir.clone();
            dir.X = -dir.Z
            dir.Z = dirCopy.X;
            const direction = dir.normal;
            direction.multiplyByScalar(v);
            this._velocity.add(direction);
        }

    }
    Sleep(): void {
        //throw new Error("Method not implemented.");
    }
     // Returns final (position, velocity) array after time dt has passed.
        //        x: initial position
        //        v: initial velocity
        //        a: acceleration function a(x,v,dt) (must be callable)
        //        dt: timestep
    
    public get mass():number{
        return this._mass;
    }
    public set mass(nm:number){
        this._mass = nm;
    }
    public get drag(): number {
        return this._drag;
    }
    public set drag(value: number) {
        this._drag = value;
    }
    public get angularDrag(): number {
        return this._angularDrag;
    }
    public set angularDrag(value: number) {
        this._angularDrag = value;
    }
    public get freezeMovement(): Vector3 {
        return this._freezeMovement;
    }
    public set freezeMovement(value: Vector3) {
        this._freezeMovement = value;
    }
    public get freezeRotation(): Vector3 {
        return this._freezeRotation;
    }
    public set freezeRotation(value: Vector3) {
        this._freezeRotation = value;
    }
    public get affectedByphysix(): boolean {
        return this._affectedByphysix;
    }
    public set affectedByphysix(value: boolean) {
        this._affectedByphysix = value;
    }
    public get worldCenterOfMass(): Vector3 {
        return this._worldCenterOfMass;
    }
    public set worldCenterOfMass(value: Vector3) {
        this._worldCenterOfMass = value;
    }
    public get affectedByGravity(): boolean {
        return this._affectedByGravity;
    }
    public set affectedByGravity(value: boolean) {
        this._affectedByGravity = value;
    }
    public get angularVelocity(): Vector3 {
        return this._angularVelocity;
    }
    public set angularVelocity(value: Vector3) {
        this._angularVelocity = value;
    }
    public get velocity(): Vector3 {
        return this._velocity;
    }
    public set velocity(value: Vector3) {
        this._velocity = value;
    }
    public get gravity(): Vector3 {
        return this._gravity;
    }
    public set gravity(value: Vector3) {
        this._gravity = value;
    }
    
}