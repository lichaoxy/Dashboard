function barchart(bardata){
   var margin={top:30,bottom:30,left:50,right:30};
 //图形的高度和宽度
   var width=700-margin.left-margin.right;
   var height=300-margin.top-margin.bottom;
    var svg=d3.select('#barchart1').append("svg").attr("width",600).attr("height",350)
        .append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")") ; //向下和右平移一段距离，
                                                                                                            // 但是在计算坐标的时候还是要从左上角原点为起点计算
 //设置X方向上的显示比例
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width],.3) //坐标轴描点的间隔
        .domain(bardata.map(function(d,i){ return d.key;})); //x轴坐标显示的内容
   
 //设置Y方向的显示比例
    var yScale = d3.scale.linear()
          .domain([0,d3.max(bardata,function(d){return d.values;})])
          .rangeRound([height,0]); //如果是[0,height]坐标轴的数据显示就是从上往下从小到大，
   
 //设置x轴
    var xaxis = d3.svg.axis()
                         .scale(xScale)
                         .orient("bottom");
 //设置y轴
    var yaxis= d3.svg.axis()
                         .scale(yScale)
                         .orient("left");
 //将x轴画到图形上
    svg.append("g")
       .attr("class","axis")
       .attr("transform","translate(0,"+height+")")
       .call(xaxis);
 //将y轴画到图形上
    svg.append("g")
       .attr("class","axis")
       .call(yaxis);
 //画柱子
    svg.selectAll("rect")
       .data(bardata)
       .enter()
       .append("rect")
       .on("mouseover",mouseover)
	   .on("click",barclick)
       .attr("fill","red")
       .attr("y",function(d){return yScale(d.values);}) //计算 柱子的起始坐标。 x,y表示柱子的左上角坐标
       .attr("x",function(d){return xScale(d.key);})
       .attr("width",xScale.rangeBand()) //计算柱子的宽度
       .attr("height",function(d){return height-yScale(d.values);}) //柱子的高度，柱子的延伸方向都是向下        
       .attr("fill","steelblue")	;
 
 var tip = d3.tip()
       .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d){ return d.key+":"+d.values;});
  svg.call(tip);
 
   function mouseover(d){
   tip.show(d);
   }
   function barclick(d){
	var piedata=d3.nest()
		          .key(function(d){return d[0];})						  
		          .rollup(function(values){
		          		return d3.sum(values,function(v){
		          					if (v[1]==d.key) 
										return v[2];
									});})
		          .entries(data);
	var piedata_ori=data.filter(function (v){ if (v[1]==d.key) return v;});
	piechart(piedata,piedata_ori);
   }
}