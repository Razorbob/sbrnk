import { Entity, IComponent } from "../core/ecs/ecs";
import { Matrix4 } from "../math/matrix";
import { Vector3 } from "../math/vector";
import { PositionComponent } from "./position.component";

export class TransformComponent implements IComponent {
    id: string;
    Entity: Entity;

    // Where is the Entity?
    private _translation: Vector3;
    private _scale: Vector3;
    private _rotation: Vector3;
    private _modelMatrix: Matrix4;
    private _transformMatrix: Matrix4;
    
    

    constructor(scale:Vector3,rotate:Vector3,translate:Vector3){
        this._scale = scale;
        this._rotation = rotate;
        this._translation = translate;
        this._modelMatrix = new Matrix4();
        this._transformMatrix = new Matrix4();
    }

    Update(dt: number): void {
        const nullVec = new Vector3(0,0,0);
        const translationVector = this.Entity.getComponent(PositionComponent).position;
        translationVector.add(this._translation);
        
        this._updateModelMatrix();

        // SCALE ROTATE TRANSLATE
        this._modelMatrix.vincScale(this._scale);
        this._modelMatrix.vincRotation(this._rotation.X,new Vector3(1,0,0));
        this._modelMatrix.vincRotation(this._rotation.Y,new Vector3(0,1,0));
        this._modelMatrix.vincRotation(this._rotation.Z,new Vector3(0,0,1));
        this._modelMatrix.vincTranslation(translationVector);

        // APPLY some Transform afterwards
        this._modelMatrix.multiplyWithMe(this._transformMatrix);

        this._translation = nullVec;
        this.Entity.getComponent(PositionComponent).position = translationVector;
        //this._modelMatrix = new Matrix4();
    }
    Awake(): void {
        //throw new Error("Method not implemented.");
    }
    Sleep(): void {
        //throw new Error("Method not implemented.");
    }

    private _updateModelMatrix(){
        this._modelMatrix.toIdentity();
        
    }
    
    public get scale(): Vector3 {
        return this._scale;
    }

    public set scale(vec:Vector3)  {
        this._scale = vec;
    }

    public set rotation(vec:Vector3)  {
        this._rotation = vec;
    }
    public get rotation(): Vector3 {
        return this._rotation;
    }

    public get translation(): Vector3 {
        return this._translation;
    }

    public set translation(ve:Vector3)  {
        this._translation = ve;
    }
    public get modelMatrix(): Matrix4 {
        return this._modelMatrix;
    }
    public set modelMatrix(value: Matrix4) {
        this._modelMatrix = value;
    }
    public get transformMatrix(): Matrix4 {
        return this._transformMatrix;
    }
    public set transformMatrix(value: Matrix4) {
        this._transformMatrix = value;
    }
}