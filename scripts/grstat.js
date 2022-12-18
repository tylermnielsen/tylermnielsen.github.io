/*jshint multistr: true */
/*jshint esversion: 6 */

function analyze(){

    const input = document.getElementById("fileInput");
    const results = d3.select("#results");


    console.log(input);

    var fname = input.files[0].name;

    d3.csv(fname, function(error, data) {
        if (error) throw error;
            console.log(data);
    });

    var h3 = results.append("h3");
    h3.text("done");
    h3.style("color", "yellow");
}