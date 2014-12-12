function piechart(pD){
var segColor=['#7373B9','#9F4D95','#467500','#0000C6','#00AEAE','#4EFEB3','#009100','#BB3D00','#B7FF4A','#FFD306','#613030','#AFAF61','#4F9D9D','#6C3365'];
 d3.select('#piechart1 svg').remove();
 var svgdim={w:400,h:350};
    var pieDim ={w:250, h: 250};
    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
    var piesvg = d3.select('#piechart1').append("svg")
        .attr("width", svgdim.w).attr("height", svgdim.h)
        .attr("transform", "translate("+pieDim.w/2+","+svgdim.h/2+")");
    var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);
    var pie = d3.layout.pie().sort(null).value(function(d) { return d.values; });
  piesvg.selectAll("g")
		.data(pie(pD)).enter().append("path").attr("d", arc)
        .style("fill", function(d,i) {return segColor[i];});
 }