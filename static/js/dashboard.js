// Visualizations
google.charts.load('current', {'packages':['corechart', 'bar', 'table']});

// Define a function to draw the chart
function drawNumericalChart() {
  // Make an AJAX request to get the data from your FastAPI endpoint
  $.ajax({
    url: "/data",
    dataType: "json",
    success: function(data) {

        ItemOutletSales(data);
        ItemWeight(data);
        ItemVisibility(data);
        ItemMRP(data);
        OutletEstYear(data);
    }
  });}

  function drawCategoricalChart() {
    // Make an AJAX request to get the data from your FastAPI endpoint
    $.ajax({
      url: "/data",
      dataType: "json",
      success: function(data) {
  
        OutletSize(data);
        ItemFatContent(data);
        ItemType(data);
        OutletLocationType(data);
        OutletType(data);
      }
    });}

  function ItemOutletSales(data){
        // Create a DataTable object from the JSON data
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number', 'Item_Outlet_Sales');
        $.each(data, function(i, item) {
        dataTable.addRow([item.Item_Outlet_Sales]);
        });

        // Set chart options
        var options = {
        title: 'Item_Outlet_Sales Distribution',
        legend: { position: 'none' },
        histogram: { bucketSize: 500 },
        width: 800,
        height: 400,
        colors: ['#3366CC']
        };

        // Instantiate and draw the chart, passing in the DataTable object and options
        var chart = new google.visualization.Histogram(document.getElementById('chart1'));
        chart.draw(dataTable, options);
}

function ItemWeight(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Item Weight');
    $.each(data, function(i, item) {
    dataTable.addRow([item.Item_Weight]);
    });

    // Set chart options
    var options = {
    title: 'Item Weight Distribution',
    legend: { position: 'none' },
    histogram: { bucketSize: 2 },
    width: 800,
    height: 400,
    colors: ['#3366CC']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.Histogram(document.getElementById('chart2'));
    chart.draw(dataTable, options);
}

function ItemMRP(data){
    // Create a DataTable object from the JSON data
    var dataTable2 = new google.visualization.DataTable();
    dataTable2.addColumn('number', 'Item_MRP');
    $.each(data, function(i, item) {
    dataTable2.addRow([item.Item_MRP]);
    });

    // Set chart options
    var options2 = {
    title: 'Item_MRP Distribution',
    legend: { position: 'none' },
    histogram: { bucketSize: 10 },
    width: 800,
    height: 400,
    colors: ['#DC3912']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart2 = new google.visualization.Histogram(document.getElementById('chart3'));
    chart2.draw(dataTable2, options2);
}

function ItemVisibility(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Item Visibility');
    $.each(data, function(i, item) {
    dataTable.addRow([item.Item_Visibility]);
    });

    // Set chart options
    var options = {
    title: 'Item Visibility Distribution',
    legend: { position: 'none' },
    histogram: { bucketSize: 0.05 },
    width: 800,
    height: 400,
    colors: ['#3366CC']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.Histogram(document.getElementById('chart4'));
    chart.draw(dataTable, options);
}

function OutletEstYear(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Outlet Establishment Year');
    $.each(data, function(i, item) {
    dataTable.addRow([item.Outlet_Establishment_Year]);
    });
    // Set chart options
    var options = {
    title: 'Outlet Establishment Year Distribution',
    legend: { position: 'none' },
    histogram: { bucketSize: 1 },
    width: 800,
    height: 400,
    colors: ['#3366CC']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.Histogram(document.getElementById('chart5'));
    chart.draw(dataTable, options);
}

// ----------------------------- CATEGORICAL ------------------------------------

function OutletSize(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Outlet Size');
    dataTable.addColumn('number', 'Count');
    var count = {};
    $.each(data, function(i, item) {
    if (count[item.Outlet_Size] === undefined) {
    count[item.Outlet_Size] = 1;
    } else {
    count[item.Outlet_Size]++;
    }
    });
    $.each(count, function(outletSize, outletCount) {
    dataTable.addRow([outletSize, outletCount]);
    });

    // Set chart options
    var options = {
    title: 'Outlet Size Count',
    legend: { position: 'right' },
    pieSliceText: 'label',
    width: 800,
    height: 400,
    colors: ['#3366CC', '#DC3912', '#FF9900']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.PieChart(document.getElementById('chart6'));
    chart.draw(dataTable, options);
}

function OutletLocationType(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Outlet Location Type');
    dataTable.addColumn('number', 'Count');
    // Group data by outlet location type and count the occurrences
    var groupedData = d3.group(data, d => d.Outlet_Location_Type);
    var dataCounts = Array.from(groupedData, ([key, value]) => ({Outlet_Location_Type: key, Count: value.length}));

    // Add the data to the DataTable object
    dataCounts.forEach(function(d) {
    dataTable.addRow([d.Outlet_Location_Type, d.Count]);
    });

    // Set chart options
    var options = {
    title: 'Count of Outlets by Location Type',
    width: 800,
    height: 400,
    legend: { position: 'bottom' },
    colors: ['#3366CC', '#DC3912', '#FF9900']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.PieChart(document.getElementById('chart7'));
    chart.draw(dataTable, options);
}

function ItemFatContent(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Item Fat Content');
    dataTable.addColumn('number', 'Count');
    var count = {};
    $.each(data, function(i, item) {
    if (count[item.Item_Fat_Content] === undefined) {
    count[item.Item_Fat_Content] = 1;
    } else {
    count[item.Item_Fat_Content]++;
    }
    });
    $.each(count, function(fatContent, fatCount) {
    dataTable.addRow([fatContent, fatCount]);
    });

    // Set chart options
    var options = {
    title: 'Item Fat Content Count',
    legend: { position: 'right' },
    pieSliceText: 'label',
    width: 800,
    height: 400,
    colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.PieChart(document.getElementById('chart8'));
    chart.draw(dataTable, options);
}

function OutletType(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Outlet Type');
    dataTable.addColumn('number', 'Count');

    // Group data by outlet type and count the occurrences
    var groupedData = d3.group(data, d => d.Outlet_Type);
    var dataCounts = Array.from(groupedData, ([key, value]) => ({Outlet_Type: key, Count: value.length}));

    // Add the data to the DataTable object
    dataCounts.forEach(function(d) {
    dataTable.addRow([d.Outlet_Type, d.Count]);
    });

    // Set chart options
    var options = {
    title: 'Count of Outlets by Type',
    width: 800,
    height: 400,
    legend: { position: 'bottom' },
    colors: ['#3366CC', '#DC3912', '#FF9900']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.PieChart(document.getElementById('chart9'));
    chart.draw(dataTable, options);
}

function ItemType(data){
    // Create a DataTable object from the JSON data
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Item_Type');
    dataTable.addColumn('number', 'Count');

    // Group data by item type and count the occurrences
    var groupedData = d3.group(data, d => d.Item_Type);
    var dataCounts = Array.from(groupedData, ([key, value]) => ({Item_Type: key, Count: value.length}));

    // Add the data to the DataTable object
    dataCounts.forEach(function(d) {
    dataTable.addRow([d.Item_Type, d.Count]);
    });

    // Set chart options
    var options = {
    title: 'Count of Items by Type',
    width: 800,
    height: 400,
    legend: { position: 'bottom' },
    colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']
    };

    // Instantiate and draw the chart, passing in the DataTable object and options
    var chart = new google.visualization.PieChart(document.getElementById('chart10'));
    chart.draw(dataTable, options);
}

const chartContainer = document.getElementsByClassName('chart');

function removeCharts() {
    var chartContainers = document.getElementsByClassName("chart");
    for (var i = 0; i < chartContainers.length; i++) {
      chartContainers[i].innerHTML = "";
    }
}

var button1 = document.getElementById('button1');
button1.addEventListener('click', function() {
    removeCharts();
    drawNumericalChart();
  });
  

var button2 = document.getElementById('button2');
button2.addEventListener('click', function() {
    removeCharts();
    drawCategoricalChart();
});

var button3 = document.getElementById('button3');
button3.addEventListener('click', function() {
    removeCharts();
    drawNumericalChart();
    drawCategoricalChart();
});

