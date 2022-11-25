import { Injectable } from "../core/di/injectable";
import { IComponent, Entity } from "../core/ecs/ecs";
import vxCode from '../shaders/vertex.shader.wgsl';
import fxCode from '../shaders/fragment.shader.wgsl';

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;

//@Injectable('Renderer')
export default class RendererComponent implements IComponent{

    private _canvas: HTMLCanvasElement;
    private _context: GPUCanvasContext;
    private _device: GPUDevice;
    private _queue: GPUQueue;
    private _renderPipeline: GPURenderPipeline;
    private _commandEncoder: GPUCommandEncoder;
    private _renderPassEncoder: GPURenderPassEncoder;
    private _uniformGroupLayout: GPUBindGroupLayout;
    private _format: GPUTextureFormat = 'bgra8unorm';
    private _renderPassEncoderDescriptor: GPURenderPassDescriptor;
    private _devicePixelRatio = window.devicePixelRatio || 1;
    private _presentationSize:number[];
    private _gpuTextureView:GPUTextureView;

    id: string;
    Entity: Entity;
    
    
    
    constructor(canvas, device){
        this._canvas = canvas;
        this._device = device;
        this._queue = this._device.queue;
        this._presentationSize = [
            this._canvas.width*this._devicePixelRatio, 
            this._canvas.height*this._devicePixelRatio];

        this._gpuTextureView = this._device.createTexture({
                size: this._presentationSize,
                format: 'depth24plus',
                usage: GPUTextureUsage.RENDER_ATTACHMENT,
            }).createView()
    }


    Update(dt: number): void {
        //console.log("Update of the Renderer");
    }

    Awake(): void {
        //console.log("Awakening of the Renderer");
        this._resizeBackings();
        this._initPipeline(vxCode,fxCode);

    }


    Sleep(): void {

    }
    /** Getters & Setters */
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    public get context(): GPUCanvasContext{
        return this._context;
    }
    public get device(): GPUDevice{
        return this._device;
    }
    public get queue(): GPUQueue{
        return this._queue;
    }
    public get renderPipeline(): GPURenderPipeline{
        return this._renderPipeline;
    }
    public set renderPipeline(a:GPURenderPipeline){
        this._renderPipeline = a;
    }
    public get commandEncoder(): GPUCommandEncoder{
        return this._commandEncoder
    }
    public set commandEncoder(a:GPUCommandEncoder){
        this._commandEncoder = a;
    }
    public get renderPassEncoder(): GPURenderPassEncoder{
        return this._renderPassEncoder;
    }
    public set renderPassEncoder(a:GPURenderPassEncoder){
        this._renderPassEncoder = a;
    }
    public get uniformGroupLayout(): GPUBindGroupLayout{
        return this._uniformGroupLayout;
    }
    public set uniformGroupLayout(a:GPUBindGroupLayout){
        this._uniformGroupLayout = a;
    }
    public get format(): GPUTextureFormat{
        return this._format;
    }
    public set format(a:GPUTextureFormat){
        this._format=a;
    }
    public get renderPassEncoderDescription():GPURenderPassDescriptor{
        return this._renderPassEncoderDescriptor
    }
    public set renderPassEncoderDescription(a:GPURenderPassDescriptor){
        this._renderPassEncoderDescriptor = a;
    }

    public begin(){
        //.log("Begin Renderpass");
        this._renderPassEncoderDescriptor = {
            colorAttachments: [{
                view: this._context.getCurrentTexture().createView(),
                loadOp: 'clear',
                storeOp: 'store',
                clearValue: { r: 0, g: 0, b: 0, a: 1 }
            }],
            depthStencilAttachment: {
                view: this._gpuTextureView,
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            }
        }

        this._commandEncoder = this._device.createCommandEncoder();
        this._renderPassEncoder = this._commandEncoder.beginRenderPass(this._renderPassEncoderDescriptor);
        this._renderPassEncoder.setPipeline(this._renderPipeline);
        this._renderPassEncoder.setViewport(
            0,
            0,
            this._canvas.width,
            this._canvas.height,
            0,
            1
        );
        this._renderPassEncoder.setScissorRect(
            0,
            0,
            this._canvas.width,
            this._canvas.height
        );
    }

    public end() {
        this._renderPassEncoder.end();
        this._device.queue.submit([this._commandEncoder.finish()]);
        //console.log("Ending Renderpass");
    }

    private _initPipeline (vxCode: string, fxCode: string) {
        const uniformGroupLayoutCamera = this._device.createBindGroupLayout({
            entries: [
                {
                    //ViewProjectionMatrix & ModelMatrix
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: 'uniform',
                    },
                }   
            ]
        });

        const layout: GPUPipelineLayout = this._device.createPipelineLayout({
            bindGroupLayouts: [uniformGroupLayoutCamera,uniformGroupLayoutCamera]
            //bindGroupLayouts: []
        });

        const vxModule: GPUShaderModule = this._device.createShaderModule({
            code: vxCode
        });

        const fxModule: GPUShaderModule = this._device.createShaderModule({
            code: fxCode
        });

        const positionAttribDesc: GPUVertexAttribute = {
            shaderLocation: 0, // @location(0)
            offset: 0,
            format: 'float32x3'
        };
        const colorAttribDesc: GPUVertexAttribute = {
            shaderLocation: 1, // @location(1)
            offset: 0,
            format: 'float32x4'
        };
        const positionBufferDesc: GPUVertexBufferLayout = {
            attributes: [positionAttribDesc],
            arrayStride: 4 * 3, // sizeof(float) * 3
            stepMode: 'vertex'
        };
        const colorBufferDesc: GPUVertexBufferLayout = {
            attributes: [colorAttribDesc],
            arrayStride: 4 * 4, // sizeof(float) * 3
            stepMode: 'vertex'
        };
        const depthStencil: GPUDepthStencilState = {
            depthWriteEnabled: true,
            depthCompare: 'less',
            format: 'depth24plus'
        };

        const vertex: GPUVertexState = {
            module: vxModule,
            entryPoint: 'main',
            buffers: [positionBufferDesc, colorBufferDesc]
        };
        
        // 🌀 Color/Blend State
        const colorState: GPUColorTargetState = {
            format: this._format
        };
        
        const fragment: GPUFragmentState = {
            module: fxModule,
            entryPoint: 'main',
            targets: [colorState]
        };
        
        // 🟨 Rasterization
        const primitive: GPUPrimitiveState = {
            frontFace: 'cw',
            cullMode: 'none',
            topology: 'triangle-list'
        };

        this._renderPipeline = this._device.createRenderPipeline({
            layout,
            vertex,
            fragment,
            primitive,
            depthStencil
        });
    }

    // ↙️ Resize swapchain, frame buffer attachments
    private _resizeBackings() {
        if (!this._context) {
            this._context = this._canvas.getContext('webgpu');
            this._format = navigator.gpu.getPreferredCanvasFormat();
            this._context.configure({
                device: this._device,
                format: this._format,
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
                alphaMode: 'opaque'
            });
        }
        
    }
        
}

