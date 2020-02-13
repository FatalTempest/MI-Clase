import { fragmentShader } from "./shaders/basicShader/fragmentShader.mjs";
import { vertexShader } from "./shaders/basicShader/vertexShader.mjs";
import { initShaderProgram } from "./shaders/methods.mjs";
import { initBuffers } from "./shaders/basicShader/init.mjs";
import { drawScene } from "./scenes/scene01.mjs";
function main() {
  const canvas = document.querySelector("#gl");
  const gl = canvas.getContext("webgl");
  try {
    if (!gl) {
      throw "No se pudo inicializar WebGL";
    }

    const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition")
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: gl.getUniformLocation(
          shaderProgram,
          "uModelViewMatrix"
        )
      }
    };

    const buffers = initBuffers(gl);

    drawScene(gl, programInfo, buffers);
  } catch (error) {
    console.error(error);
  }
}
window.onload = main;
