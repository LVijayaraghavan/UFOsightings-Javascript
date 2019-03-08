// from data.js
var tableData = data;
var statedata = states;
var table=d3.select("table");
var tbody=table.select("tbody")
var stateselect =d3.select("#state")
var cityselect = d3.select('#city')
var shapeselect = d3.select('#shape')
stateselect.append("option").attr("value","ALL").text("ALL")
cityselect.append("option").attr("value","ALL").text("ALL")
shapeselect.append("option").attr("value","ALL").text("ALL")
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
// var cities=tableData.map(a=>a.city).filter(onlyUnique);
// var shapes= tableData.map(a=>a.shape).filter(onlyUnique);

//Function to populate the drop downs with the values to filter
function populate_filter(selectobj,filt_data)
{
filt_data.filter(onlyUnique).sort()
filt_data.forEach( s => {
    selectobj.append("option")
               .attr("value",s)
               .text(s)
});
}

//Populating the state, city, and Shape filter
populate_filter(stateselect,statedata);
populate_filter(cityselect,tableData.map(a=>a.city));
populate_filter(shapeselect,tableData.map(a=>a.shape));



//Function to load the table with data
function load_table(data) {
    data.forEach(function (item){
        // console.log(item);
        var row=tbody.append("tr");
        Object.values(item).forEach(val=>
        {
            console.log(val);
           row.append("td").text(val);            
        });
   
        
               
        
    });
}

function clear_table() {
    tr=tbody.selectAll("tr").remove()
   
};

//load tabkle with the provided UFO data

 load_table(tableData);

 //setting the default option as ALL for the filters.
 defaultOptionName='ALL'


 //Submit-Clear
 var submit_clear = d3.select("#clear-filter");

//Clear table  and reset filter and load the original data
 submit_clear.on("click", function() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    inputElement.property("value","");
 
    d3.select("body").selectAll('option')
     .property('selected',function(d){ return d === defaultOptionName});
    clear_table();
    load_table(tableData);
 })

 // Load table data based on the filters.

 var submit = d3.select("#filter-btn");
 submit.on("click", function() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputDate = inputElement.property("value");
    var inputcity = cityselect.property("value");
    var inputstate = stateselect.property("value");
    var inputshape = shapeselect.property("value");
    ufo_match = tableData
    if (inputDate !== "" ) 
    {
        ufo_match = ufo_match.filter(u=>u.datetime === inputDate);
    }
     if (inputstate !== "ALL") 
     {
       ufo_match = ufo_match.filter(u=>u.state === inputstate.toLowerCase())
     }
     if (inputcity!=='ALL' ) 
     {
       ufo_match = ufo_match.filter(u => u.city === inputcity)
     }

     if (inputshape !== "ALL")
     {
         ufo_match = ufo_match.filter( u => u.shape === inputshape)
     }

    //console.log(ufo_match);
// if there is data matching the filters then populate table with the results
    if (ufo_match.length !== 0)
    {
    clear_table();
    load_table(ufo_match);
    }
    //if there is no data matching the criteria populate no data found
    else 
    {
        clear_table()
        var row=tbody.append("tr");
        var td=row.append("td")
                .attr("colspan",7)
                .attr("class","text-center")
                .text("Sorry We could not locate the data for the search criteria!")

    }


 });


