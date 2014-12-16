function piechart(piedata,piedata_ori){
 var segColor=['#807dba','#e08214','#FF83FA','#41ab5d','#EECBAD','#4EFEB3','#009100','#BB3D00','#B7FF4A','#FFD306','#613030','#AFAF61','#4F9D9D','#6C3365'];
 var textOffset = 40;
 d3.select('#piechart1 svg').remove();
 var total=d3.sum(piedata,function(d){return d.values;});
 var svgdim={w:300,h:350};
    var pieDim ={w:125, h: 125};
    pieDim.r = 100;
	var r = Math.min(pieDim.w, pieDim.h) / 2;
    var piesvg = d3.select('#piechart1').append("svg")
        .attr("width", svgdim.w).attr("height", svgdim.h)
        .attr("transform", "translate("+svgdim.w/2+","+svgdim.h/3+")");
    var arc = d3.svg.arc().outerRadius(pieDim.r).innerRadius(pieDim.r/2-10);
    var pie = d3.layout.pie().sort(null).value(function(d) { return d.values; });
		piesvg.selectAll("g")
		     .data(pie(piedata)).enter().append("path").attr("d", arc)
             .style("fill", function(d,i) {return segColor[i];});
  
    var label_group = piesvg.append("svg:g")
    .attr("class", "label_group");
	var lines = label_group.selectAll("line").data(pie(piedata));
      lines.enter().append("svg:line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", -pieDim.r)
        .attr("y2", -pieDim.r-18)
        .attr("stroke", "gray")
        .attr("transform", function(d) {
          return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
        });
 //DRAW LABELS WITH PERCENTAGE VALUES
     var valueLabels = label_group.selectAll("text.value").data(pie(piedata))
        .attr("dy", function(d){
          if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
            return 5;
          } else {
            return -7;
          }
        })
        .attr("text-anchor", function(d){
          if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
            return "beginning";
          } else {
            return "end";
          }
        })
        .text(function(d){
          var percentage = (d.value/100)*100;
          return percentage.toFixed(1) + "%";
        });

      valueLabels.enter().append("svg:text")
        .attr("class", "value")
        .attr("transform", function(d) {
          return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
        })
        .attr("dy", function(d){
          if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
            return 5;
          } else {
            return -7;
          }
        })
        .attr("text-anchor", function(d){
          if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
            return "beginning";
          } else {
            return "end";
          }
        }).text(function(d){
          var percentage = (d.value/total)*100;
          return percentage.toFixed(1) + "%";
        });		
 }