/*jshint multistr: true */
/*jshint esversion: 6 */



function analyze(){

    console.log("starting");

    const input = document.getElementById("fileInput");
    const results = d3.select("#results");

    console.log(input);

    var fname = input.files[0].name;

    var raw = [];

    d3.csv(fname)
      .then(function(data) {
        raw = data;
        console.log("reading");
        processData(raw);

      })
      .catch(function(error){
        console.log(error);
      });

    

    var h3 = results.append("h3");
    h3.text("done");
    h3.style("color", "yellow");
}

function processData(raw){
    var onlyRead = [];

    raw.forEach((i) => {
        //console.log(i["Exclusive Shelf"]);
        if(i["Exclusive Shelf"] == "read"){
            onlyRead.push(i);
        }
    });

    // console.log("Only Read");
    // onlyRead.forEach((i) => {
    //     console.log(i.Title);
    // });

    yearCounts(onlyRead);

    authorGender(onlyRead);

}

function authorGender(bookList){

    //access wikidata
            

    const genderCounts = new Map();
    bookList.forEach((book) => {

    });
}

function yearCounts(bookList){
    const yearCounts = new Map();
    bookList.forEach((i) => {
        let year = i["Original Publication Year"];
        if(yearCounts.has(year)){
            yearCounts.set(year, yearCounts.get(year)+1);
        }
        else {
            if(year != 0) yearCounts.set(year, 1);
        }
    });

    const w = window.innerWidth-20;
    const h = 500;
    const pad = 60;
    d3.select("#yearCounts").html("");
    const svg = d3.select("#yearCounts").append("svg")
                       .attr("width", w)
                       .attr("height", h);

    const xScale = d3.scaleLinear()
        .domain([d3.min(yearCounts, (d) => d[0])-5, d3.max(yearCounts, (d) => d[0])])
        .range([pad,w-pad]);
    svg.append("g")
       .attr("transform", "translate(0," + (h-pad) + ")")
       .call(d3.axisBottom(xScale).tickFormat((x) => x).ticks(Math.floor(w/100)));

    const yScale = d3.scaleLinear()
        .domain([0,d3.max(yearCounts, (d) => d[1])])
        .range([h - pad, pad]);
    svg.append("g")
        .attr("transform", "translate(" + pad + ",0)")
        .call(d3.axisLeft(yScale));

    svg.selectAll("circle")
        .data(yearCounts)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy", (d) => yScale(d[1]))
        .attr("r", (d) => 5)
        .attr("fill", "#FFFFFF")
        .attr("class", "point")
        .append("title")
        .text((d) => {
            let t = d[0] + " (" + d[1] + ")" + "\n";
            bookList.forEach((book) => {
                if(book["Original Publication Year"] == d[0]){
                    t += book.Title + "\n";
                }
            });
            return t;
        });

    svg.append("text")
        .attr("x", w / 2)
        .attr("y", 60)
        .attr("fill", "#FFFFFF")
        .attr("font-size", "2em")
        .attr("text-anchor", "middle")
        .text("Books Read In Each Year");
        
}