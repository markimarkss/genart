This is the introduction of the series. Will make numerous notes on the evolution of this series. 

Currently, I believe that one should have the knowledge of how to set up a browser in WebGL in 3D space without the use of frameworks.

The aim of this documentation is so that any artist who wants to learn WebGL.  In the future I plan to compile all learned documentation to a single reference of learning for artist who have limited code knowledge, but wants to branch into generative artwork using WebGL. 

Each section will have a `tutorial` and `practice` directories. 
The tutorial directory will follow the youtube series. 
The practice one will be adaptations to the current professional practices. 

First step is setting up the index.html to display the canvas element and render a single vertex. 

in the vidoes (2017), flex is used. To my knowledge grid is being more adapted by browsers (2020). 

Use the console (f12) on the browser to find any bugs. 


Notes ShaderUtil:
//create new JS file ex. Shaders.js
//create a static utility functions (methods) inside ShaderUtil class. 
//this means these methods will not be run when the class is instanced (called). They must be called directly. 
//First method, get the shader code from text shader
//Second method, compile shaders, this will be done twice. vertex and fragment
//Third method, create the program that attaches the two shader together
//After validation, set to true if prototyping, we delete the shaders after the program is compiled, only the program will return. 
