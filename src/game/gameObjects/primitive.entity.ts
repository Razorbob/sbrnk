import { PositionComponent } from "../../engine/common.components/position.component";
import { TransformComponent } from "../../engine/common.components/transform.component";
import { Entity } from "../../engine/core/ecs/entity";
import { IDraw } from "../../engine/core/lifecycle/draw.interface";
import { _createBuffer } from "../../engine/helpers/helper";
import { Matrix4 } from "../../engine/math/matrix";
import { Vector3 } from "../../engine/math/vector";
import { VertexComponent } from "../../engine/webgpu/vertex.component";

export abstract class PrimitiveEntity extends Entity implements IDraw{
    //protected _vertices: VertexComponent[];
    protected _indices: Uint32Array;
   

    protected _vertexBuffer: GPUBuffer;
    protected _colorBuffer: GPUBuffer;
    protected _indexBuffer: GPUBuffer;
    protected _uniformBuffer: GPUBuffer;
    protected _bindgroup: GPUBindGroup;
    protected _newBuffers = true;

    constructor(trans:Vector3,pos:Vector3,rot:Vector3,scl:Vector3){
        super();
        this.addComponent(new PositionComponent(pos));      
        this.addComponent(new TransformComponent(scl,rot,trans));
    }

    Awake(): void {
        super.Awake();
        super.AwakeChildren();
    }

    Draw(device:GPUDevice, renderPassEncoder:GPURenderPassEncoder, renderPipeline:GPURenderPipeline,){

        this._buildBuffers(device, renderPipeline);
         // Pass the Buffers to the Encoder
         renderPassEncoder.setVertexBuffer(0, this._vertexBuffer);
         renderPassEncoder.setVertexBuffer(1, this._colorBuffer);
         renderPassEncoder.setIndexBuffer(this._indexBuffer, "uint32");  
         renderPassEncoder.setBindGroup(1, this._bindgroup);
         
 
         // Draw Stuff
         //console.log("Drawing "+this.constructor.name+" Vertices");
         renderPassEncoder.drawIndexed(this._indices.length, 1, 0, 0, 0);
 
     }

    
    public get Vertices(): VertexComponent[]{
        return this.getComponents(VertexComponent);
    }

    public get Indices(): number[]{
        const ret:number[] = [];
        const vertices:VertexComponent[] = this.getComponents(VertexComponent);
        for(const comp of vertices){
            ret.push(comp.ibo);
        }
        //console.log(ret);
        return ret;
    }

    public get IndicesAsUint32Array():Uint32Array{
        return new Uint32Array(this.Indices);
    }


    public get VerticesAsF32Array():Float32Array{
        let x:number[] = [];
        for(const component of this.Vertices){
            x.push(component.position.X);
            x.push(component.position.Y);
            x.push(component.position.Z);
            //console.log(x);
        }

        return new Float32Array([...x]);
    }

    public get VerticesAsNumberArray():number[]{
        let x:number[] = [];
        for(const component of this.Vertices){
            x.push(component.position.X);
            x.push(component.position.Y);
            x.push(component.position.Z);
            //console.log(x);
        }

        return [...x];
    }

    public get ColorsAsF32Array():Float32Array{
        let x:number[] = [];

        for(const component of this.Vertices){
            x.push(component.color.X);
            x.push(component.color.Y);
            x.push(component.color.Z);
            x.push(component.color.W);
            //console.log(x);
        }

        return new Float32Array([...x]);
    }

    public get ColorsAsNumberArray():number[]{
        let x:number[] = [];

        for(const component of this.Vertices){
            x.push(component.color.X);
            x.push(component.color.Y);
            x.push(component.color.Z);
            x.push(component.color.W);
            //console.log(x);
        }

        return [...x];
    }
/**
    public get vertexBufferDescription():GPUBufferDescriptor{
        return {
            mappedAtCreation: true,
            size: this.VerticesAsF32Array.byteLength,
            usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_DST
        };
    }

    public get modelMatrixBufferDescription():GPUBufferDescriptor{
        return {
            mappedAtCreation: true,
            size: this._modelMatrix.matrix.byteLength,
            usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_DST
        };
    }
 */
    public scale(axis: Vector3){
        // const scaleMatrix = new Matrix4();
        // scaleMatrix.toScaleMatrix(axis);
        // this._modelMatrix.multiplyM4(scaleMatrix);
    }
    public translate(direction: Vector3){
        // const translateMatrix = new Matrix4();
        // translateMatrix.toTranslationMatrix(direction);
        // this._modelMatrix.multiplyM4(translateMatrix);
    }
    public rotate(angle: number, axis:Vector3){
        // this._modelMatrix.rotateMe(angle,axis);
    }

    public bindGroupLayout(): GPUBindGroupLayoutDescriptor{
        return  {
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX
                },
            ]};
    }

    

    private _buildBuffers(device:GPUDevice, renderPipeline:GPURenderPipeline){
        if(this._newBuffers){
            //console.log("Building "+this.constructor.name+" Buffers");
            this._vertexBuffer = _createBuffer(this.VerticesAsF32Array, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_SRC, device);
            this._colorBuffer = _createBuffer(this.ColorsAsF32Array, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_SRC, device);
            this._indexBuffer = _createBuffer(this._indices, GPUBufferUsage.INDEX, device);
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

        const uniformBufferData = new Float32Array(this.getComponent(TransformComponent).modelMatrix.toArray());
        device.queue.writeBuffer(
            this._uniformBuffer,
            0,
            uniformBufferData.buffer,
            uniformBufferData.byteOffset,
            uniformBufferData.byteLength
          );
    }

   
    
}