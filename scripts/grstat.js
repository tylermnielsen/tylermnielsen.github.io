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
    const counts = new Map();


    const genderCounts = new Map();
    const problems = [];

    var it = 0;
    queries = setInterval(() => {
        //console.log("working");
        if(it >= bookList.length){
            console.log("done");
            console.log(counts);
            console.log(problems);
            clearInterval(queries);
            fixProblems(counts, problems);
        }
        if(it < bookList.length) queryWQSData(clean(bookList[it].Author), counts, problems);
        it++;

    }, 1);

    console.log(counts);
}

function fixProblems(counts, problems){
    
}

 // let url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${problems[it]}&format=json`;

        // if(it >= problems.length){
        //     console.log("done");
        //     clearInterval(problemParse);
        // }

        // if(it < problems.length)
        // fetch(url)
        //     .then(function(response){return response.json();})
        //     .then(function(response){
        //         console.log("Name: " + it + " " + problems[it]);
        //         console.log(response.);
        //         it++;
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

function clean(str){
    //console.log(str);
    for(var i = 0; i < str.length-1; i++){
        if(str[i] == " " && str[i+1] == " "){
            str = str.substring(0,i) + str.substring(i+1);
            i--;
        }
        if(str[i] == "." && str[i+1] != " "){
            str = str.substring(0,i+1) + " " + str.substring(i+1);
        }
    }
    return str;
}

function queryWQSData(name, counts, problems){
    let url = "https://query.wikidata.org/sparql?query=";
    url += `SELECT * WHERE { ?person rdfs:label '${name}'@en; wdt:P31 wd:Q5; wdt:P21 ?gender . ?gender rdfs:label ?genderName filter(lang(?genderName) = "en") }`;
    url += "&format=json";

    return fetch(url)
        .then(function(response){ return response.json();})
        .then(function(response){
            let gender;
            try {
                gender = response.results.bindings[0].genderName.value;
            } catch(error) {
                console.log("Error on " + name + " -> " + error);
                problems.push(name);
                gender = "error";
            }
            if(counts.has(gender)) counts.set(gender, counts.get(gender)+1);
            else counts.set(gender, 1);
        })
        .catch((error) =>{
            console.log(error);
        });
}

function queryWikiData(name){
    let url = "https://en.wikipedia.org/w/api.php"; 
    const params = {
        action: "query",
        list: "search",
        srsearch: name,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            for(var i = 0; i < 5; i++){
                if(i >= response.query.search.size) break;
                if(response.query.search[i].title === name){
                    console.log("Yes");
                    break;
                }
            }
        })
        .catch(function(error){console.log(error);});

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