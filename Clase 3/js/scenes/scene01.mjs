export function drawScene(gl,programInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.dephtFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = (45* Math.PI)/180;
    const aspect = gl.canvas.clientWidth/gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar=100.0;
    const projecttionMatriz = mat4.create();

    mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [0.0,0.0,0.0]
    );

    {
        const numComponent = 2;
        const type =gl.FLOAT;
        const normalize = false;
        const stride =0;
        const offset=0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(programInfo.atribLocations.vertexPosition, numComponents, type, normalized, stride, offset);
        gl.enableVertexAttribArray(programInfo.atribLocations.vertexPosition);
    }
    gl.useProgram(programInfo.program);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    {
        const offset=0;
        const vertexCount=4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}