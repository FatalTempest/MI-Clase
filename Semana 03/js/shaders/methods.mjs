/**
 * Initialize a shader program, so WebGL knows how to draw our data
 *
 * @param gl GL Object
 * @param vsSource Vertex Shader Source Code
 * @param fsSource Fragment Shader Source Code
 */
export function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(shaderProgram)
    );
    return null;
  }

  return shaderProgram;
}
/**
 * creates a shader of the given type, uploads the source and
 * compile it
 * @param gl GL Object
 * @param type Type Shader
 * @param source Source Shader
 */
export function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  try {
    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw "An error occurred compiling the shaders: " +
        gl.getShaderInfoLog(shader);
    }
  } catch (error) {
    console.error(error);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
