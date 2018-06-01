import { scaleLinear } from "d3-scale";

function ColorScale (colormap) 
{
// #### Constructor #### 
  var colormaps = {

    "red_blue": ['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#f7f7f7','#d1e5f0','#92c5de','#4393c3','#2166ac','#053061'],
    "blue_red": [ "#053061", "#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#f7f7f7", "#fddbc7", "#f4a582", "#d6604d", "#b2182b", '#67001f'],
    "default": ['#ffffd2','#ffffb2','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']
  }

  var currentColormap = colormaps[colormap] || colormaps["default"];
  var scale = scaleLinear();

  //###### methods ######//
  this.colors = function() {
    
    return currentColormap;

  };

  this.colormaps = function() {

    return colormaps;

  };

  this.addColormap = function(colormapId,colors) {

    colormaps[colormapId] = colors;
    return true;

  }

  this.setColormap = function(colormapId) {

    if (colormaps[colormapId]){
      currentColormap = colormaps[colormapId];
      return true;
    } else {
      console.log("!Warning! - teColor.setColormap: Colormap does not exist. Colormap not changed");
      return false;
    }
  
  }

  this.toColor = function(value, dataDomain, clamp) {
    var clamp = clamp || false;

    // map the input value to a color depending on the colormap
    scale
      .domain(discreteDomain(dataDomain,currentColormap.length))
      .range(currentColormap);

      scale.clamp(clamp);

    // return the mapped color as RGB string (#RGB)  
    return colorScale(value);

  };

  this.toColorlist = function(list, dataDomain, clamp) {
    var clamp = clamp || false;

    // map the input value to a color depending on the colormap
    scale
      .domain(discreteDomain(dataDomain,currentColormap.length))
      .range(currentColormap);

      scale.clamp(clamp);

    var colorList = new Array(list.length);
    for (let i=0; i<list.length; i++) {
      colorList[i] = scale(list[i]);
    }

    return colorList;

  };

  this.toColorlist2D = function(list2D,dataDomain) {
    // check dimensionality 


    var dataDomain = dataDomain || domain2DArray(list2D);

    // map the input value to a color depending on the colormap
    scale
      .domain(discreteDomain(dataDomain,currentColormap.length))
      .range(currentColormap);

    var colorList2D = [];
    for (var i = 0; i < list2D.length; i++) {
      colorList2D[i] = [];
      for (var j = 0; j < list2D[i].length; j++){
        colorList2D[i][j] = scale(list2D[i][j]);
      }
    }

    return colorList2D;

  }

  //#####################//

  // ---- helper ----
  function discreteDomain(domain,length) {
    let disDom = new Array(length);
    let delta = (domain[1]-domain[0])/(length-1);
    for (let i=0; i<length; i++) {
      disDom[i] = domain[0]+i*delta;
    }
    return disDom;
  }

  function domain2DArray(arr) {
    let max = -Number.MAX_VALUE;
    let min = Number.MAX_VALUE;

    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr[0].length; j++) {

        if (max < arr[i][j]) {
          max = arr[i][j];
        }
        else if (min > arr[i][j]) {
          min = arr[i][j];
        }

      }
    }

    return [min,max];

  }

}

export default ColorScale;