import { vec4 } from "../../libs/gl-matrix";

export const vertexShader=
`attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjecttionMatrix;
    void main(){
        gl_Position=uProjecttionMatrix*uModelViewMatrix*aVertexPosition;
    }`