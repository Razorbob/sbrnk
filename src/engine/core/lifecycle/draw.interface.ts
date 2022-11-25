import CameraEntity from "../../cameras/camera.entity";

export interface IDraw {
    Draw(device:GPUDevice, renderPassEncoder:GPURenderPassEncoder, renderPipeline:GPURenderPipeline): void;
}