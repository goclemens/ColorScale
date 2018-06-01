console.log(new Date);

// ---- data creation ----
  var res_x = 720;
  var res_y = 720;


  // alocate 2d array
  var data2D = new Array(res_x);
  for (let i=0; i<res_x; i++) {
    data2D[i] = new Array(res_y);
  }

  // fill 2d array
  for (let x=0; x<res_x; x++) {
    for (let y=0; y<res_y; y++) {
      data2D[x][y] = Math.sin((x-res_x*0.5)*Math.PI/180) + Math.sin((y-res_y*0.5)*Math.PI/180);
    }
  }

  console.log(new Date);

// ---- data conversion ----
  var colorScale = new ColorScale("blue_red");
  var colorfield = colorScale.toColorlist2D(data2D)
  console.log(new Date);

// ---- display ----
  var container = document.getElementById("container");
  var canvas = document.createElement("CANVAS");

  var width = 360;
  var height = 360;


  var dx = width/res_x;
  var dy = height/res_y;

  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  // fill canvas element with the colorfield
  for (var x = 0; x < res_x ; x++) {
    for (var y = 0; y < res_y ; y++) {
      
      ctx.fillStyle = colorfield[x][y];
      ctx.fillRect( x*dx, y*dy, dx+1, dy+1 );
      
    }  
  }

  container.appendChild(canvas);
  console.log(new Date);