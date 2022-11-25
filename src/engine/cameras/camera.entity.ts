import { InputComponent } from "../common.components/input.component";
import { PositionComponent } from "../common.components/position.component";
import { Entity } from "../core/ecs/ecs";
import { IDraw } from "../core/lifecycle/draw.interface";
import { _createBuffer } from "../helpers/helper";
import { Matrix4 } from "../math/matrix";
import { Vector3 } from "../math/vector";

export default class CameraEntity extends Entity {
  protected _projectionMatrix:Matrix4;

  constructor(position:Vector3=new Vector3(0,0,4)){
    super();
    this._projectionMatrix = new Matrix4();
    this.addComponent(new PositionComponent(position));
  }

  public get projectionMatrix():Matrix4{
    return this._projectionMatrix;
  }

}

export class PerspectiveCamera extends CameraEntity implements IDraw {
    //private static UP_VECTOR: Vector3 = new Vector3(0, 1, 0);
    private _upDirection:Vector3;
    private _position: Vector3;
    private _lookAtPosition: Vector3;
      
    private _projectionInvMatrix = new Matrix4();
    private _viewInvMatrix = new Matrix4();

    private _viewMatrix: Matrix4;
    private _viewProjectionMatrix:Matrix4;
  
    private zoom = 1
    private zoomSpeed = 2;
    private zoomMax = 100;

    private _fov: number;
    private _aspect:number;
    private _near:number;
    private _far:number;
    private _bindgroup: GPUBindGroup;
    private _uniformBuffer: GPUBuffer;
    private _newBuffers = true;
  
    constructor(private fieldOfView:number=(2*Math.PI/5), aspect:number, private near:number = 0.1, private far:number = 100, position:Vector3=new Vector3(0,0,4), private lookAtPosition:Vector3 = new Vector3(0, 0, 0), private upDirection:Vector3 = new Vector3(0,1,0)) {
        super(position);

        this._upDirection = upDirection;
        this._lookAtPosition = lookAtPosition;
        this._position = this.getComponent(PositionComponent).position;
        

        this._fov = fieldOfView;
        this._aspect = aspect;
        this._near = near;
        this._far = far;

        this._viewMatrix = new Matrix4();
        this._viewProjectionMatrix = new Matrix4();

        
        //this.updateProjectionMatrix(); 
    }
    Draw(device: GPUDevice, renderPassEncoder: GPURenderPassEncoder, renderPipeline: GPURenderPipeline): void {
      
      this._buildBuffers(device,renderPipeline);
      renderPassEncoder.setBindGroup(0, this._bindgroup);
      //console.log("Drawing "+this.constructor.name);

    }

    private _updateViewProjection() {
      //this._projectionMatrix.toProjectionMatrix();
      this._viewProjectionMatrix.multiplyFromAandB(this._projectionMatrix,this._viewMatrix);
    }
    
    setPosition({ x = this._position.X, y = this._position.Y, z = this._position.Z,}) {
      this._position = new Vector3(x,y,z);
      this.getComponent(PositionComponent).position = this._position;
    }
  
    private _updateViewMatrix(): void {
      //this._viewMatrix.vincTranslation(this._position);
      this._viewMatrix.lookTo(this._position, this._lookAtPosition, this._upDirection);
      //this.viewInvMatrix.invert();
    }
  
    private _updateProjectionMatrix(): void {
        //this._projectionMatrix.ToPerspectiveProjectionMatrix(this.fieldOfView, this.aspect, this.near, this.far)
        //this.projectionInvMatrix.invert(this.projectionMatrix);
        this._projectionMatrix.toProjectionMatrix(this._fov, this._aspect, this._near,this._far);
    }
  
    lookAt({x = this._lookAtPosition.X, y = this._lookAtPosition.Y, z = this._lookAtPosition.Z}):void{
      this._lookAtPosition = new Vector3(x,y,z);
      //this._updateViewMatrix();
    }
    
    public get viewProjectionMatrix():Matrix4{
      return this._viewProjectionMatrix;
    }

    Update(dt: number): void {
      //console.log("Updateing "+this.constructor.name+" ViewProjection Matrix");
      super.Update(dt);
      this._updateViewMatrix();
      this._updateProjectionMatrix();   
      this._updateViewProjection();
    }


    private _buildBuffers(device:GPUDevice, renderPipeline:GPURenderPipeline){
      if(this._newBuffers){
        //this._newBuffers = false;

        const uniformBufferSize = 4 * 16; // 4x4 matrix
        this._uniformBuffer = device.createBuffer({
            size: uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        this._bindgroup = device.createBindGroup({
            layout: renderPipeline.getBindGroupLayout(0),
            entries: [{
                binding: 0,
                resource: { buffer:  this._uniformBuffer}
            }]
        });
        this._newBuffers = false;
    }
    const uniformBufferData = new Float32Array(this._viewProjectionMatrix.toArray());
    device.queue.writeBuffer(
        this._uniformBuffer,
        0,
        uniformBufferData.buffer,
        uniformBufferData.byteOffset,
        uniformBufferData.byteLength
      );
    }
  }