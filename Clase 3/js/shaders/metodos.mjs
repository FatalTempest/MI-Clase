export function InitShaderProgram(gl, VsSource, FsSource){
    //Cargar Shaders
    const vertexShader=LoadShader(gl, gl.VERTEX_SHADER, VsSource);
    const fragmentShader=LoadShader(gl, gl.FRAGMENT_SHADER, FsSource);


    const shaderProgram=gl.createProgram();
    
    try{
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
            throw "No se inicializo el programa de Shader";
            $(gl.getShaderInfoLog(shaderProgram));
        }
    }catch(error){
        console.error(error);
    }
}

function LoadShader(gl, type, source){
    //Generamos el shader en base al tipo
    const shader = gl.createShader(type);
    try{
        //Mandamos el CF o el objeto Shader
        gl.shaderSource(shader, source);
        //Compila el programa del shader
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
            throw "Sucedio un error de compilación"
            $(gl.getShaderInfoLog(shader));
        }
    } catch(error){
        console.error(error);
        //Liberamos la memoria utilizada
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}