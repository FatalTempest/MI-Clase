import { vertexShader } from "./shaders/basic shaders/vertexShader.mjs";
import {fragmentShader} from "./shaders/basic shaders/fragmentShader.mjs";
import {InitShaderProgram} from "./shaders/metodos.mjs";
import {initBuffers} from "./shaders/basic shaders/init.mjs";

function main(){
    console.info("Hola");

    //Obtener el canvas de nuestro DOM
    const canvas = document.getElementById("gl");
    //Obtener Contexto de WebGL
    const gl = canvas.getContext("webgl");

    try{

        if(!gl){
            throw "No se inicializo WebGL o su navegador, no lo soporta";
        }
        const shaderProgram = InitShaderProgram(gl, vertexShader, fragmentShader);
        const programInfo={
            attribLocation:{
                vertexPosition: gl.getAttribLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(sahderProgram, "uModelViweMatrix")
            }
        }
        
        const buffer = initBuffers(gl);
        drawScene(gl,programInfo,buffers);

    }catch (error){

        console.error(error);

    }

}

window.onload=main;