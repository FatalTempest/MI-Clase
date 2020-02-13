import { fragmentShader } from "./shaders/textureShader/fragmentShader.mjs";
import { vertexShader } from "./shaders/textureShader/vertexShader.mjs";
import { initShaderProgram } from "./shaders/methods.mjs";
import { initBuffers } from "./shaders/textureShader/init.mjs";
import { drawScene } from "./scenes/scene03.mjs";
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
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      },
    };

    const buffers = initBuffers(gl);
    const texture = loadTexture(gl, './js/jkk.png');

    // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
      now *= 0.001; // convert to seconds
      const deltaTime = now - then;
      then = now;

      drawScene(gl, programInfo, buffers, texture, deltaTime);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  } catch (error) {
    console.error(error);
  }
}
window.onload = main;

 //
    // Initialize a texture and load an image.
    // When the image finished loading copy it into the texture.
    //
    function loadTexture(gl, url) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
    
      // Because images have to be download over the internet
      // they might take a moment until they are ready.
      // Until then put a single pixel in the texture so we can
      // use it immediately. When the image has finished downloading
      // we'll update the texture with the contents of the image.
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 1;
      const height = 1;
      const border = 0;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
      const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
    
      const image = new Image();
      image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      srcFormat, srcType, image);
    
        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
           // Yes, it's a power of 2. Generate mips.
           gl.generateMipmap(gl.TEXTURE_2D);
        } else {
           // No, it's not a power of 2. Turn of mips and set
           // wrapping to clamp to edge
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
      };
      image.src = url;
    
      return texture;
    }
    
    function isPowerOf2(value) {
      return (value & (value - 1)) == 0;
    }
