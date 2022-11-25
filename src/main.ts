import { EngineEntity } from "./engine/engine.entity";
import RendererComponent from "./engine/webgpu/renderer.component";
import { Game } from "./game/game";
import { UE2Game } from "./game/ue2_game";

 /**
   * Initial Entry Point
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */

/**
 * Get Canvas Element
 * Scale Canvas Element to Fullscreen
 */

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let game = null;

const entry: GPU = navigator.gpu;
    if (!entry) throw new Error('WebGPU is not supported on this browser.');
    
async function main(){
    initWebGPU();
}

window.addEventListener("load", main);

async function initWebGPU(){
    let device = null;
    let adapter = null;
    adapter = await entry.requestAdapter({
        // powerPreference: 'high-performance'
     });
    device = await adapter.requestDevice();
    if(game == null){
        game = new UE2Game(canvas, device).Awake();
    }
    device.lost.then((info) => {
        console.error("Device was lost.", info);
        initWebGPU();
    });
}
