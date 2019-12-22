

function buildCharts(id) {
  d3.json("samples.json").then((importedData) => {
  // console.log(importedData);
  var data = importedData;

  
  console.log(data);
  var results = data.samples;
  // Slice the first 10 objects for plotting
  var result = results.filter(sampleObject => sampleObject.id == id);
  // Reverse the array due to Plotly's defaults
  var samples = result[0];
    console.log(samples);

  // Trace1 for the Greek Data
  var otuLabels = samples.otu_labels;
  var otuIds = samples.otu_ids;
  var sampleValues = samples.sample_values;

  
  
  
  
  var trace1 = {
    x: sampleValues.slice(0, 10).reverse(),
    y: otuIds.slice(0, 10).map(x => `OTU ${x}`).reverse(),
    text: otuLabels.slice(0, 10).reverse(),
    name: "Belly button",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Belly Button Funk",
    margin: {
      l: 150,
      t: 30 
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);
});
}

function init() {
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((importedData) => {
  // console.log(importedData);
  var sampleNames = importedData.names;
  sampleNames.forEach((sample) => {
    selector.append('option').text(sample).property("value", sample);
  });
  
});
}
init();

function optionChanged (x) {
  buildCharts(x);
  
}
