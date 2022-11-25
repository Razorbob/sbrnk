struct VertexOutput{
    @builtin(position) position:vec4<f32>,
    @location(0) vColor: vec4<f32>
}

@group(0) @binding(0)
var<uniform> viewProjectionMatrix: mat4x4<f32>;

@group(1) @binding(0)
var<uniform> modelMatrix: mat4x4<f32>;

@vertex
fn main(@location(0) position : vec3<f32>, @location(1) vColor: vec4<f32>) -> VertexOutput {
    var output : VertexOutput;
    output.position = viewProjectionMatrix * modelMatrix * vec4<f32>(position, 1.0);
    output.vColor = vColor;
    return output;
}