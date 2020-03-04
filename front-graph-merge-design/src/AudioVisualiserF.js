// noprotect
import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import './App.css';
import {MdPlayCircleOutline, MdPauseCircleOutline} from 'react-icons/md';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

class AudioVisualiserF extends Component {
 

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            x : 0,
            highest: 0,
            stop: false,
            pause: false,
            play: false,
        };
        this.data = [];

      }


    componentDidMount = () => {

      this.draw_amchart();

    }

    draw_amchart = () => {
      
// Themes end

const {audioData, x} = this.props;

this.chart = am4core.create("chartdiv", am4charts.XYChart);
this.chart.hiddenState.properties.opacity = 0;

this.chart.padding(0, 0, 0, 0);

this.chart.zoomOutButton.disabled = true;

//this.data = [];
this.visits = 0;
let i = 0;



for (i = 0; i < 29; i++) {
    this.visits = 0;
    this.data.push({ date: new Date().setSeconds(i - 29), value: this.visits });
}
this.data.push({ date: new Date().setSeconds(0), value: audioData });

this.chart.data = this.data;


let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.dateFormats.setKey("second", "ss");
dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
dateAxis.renderer.inside = true;
dateAxis.renderer.axisFills.template.disabled = true;
dateAxis.renderer.ticks.template.disabled = true;
dateAxis.renderer.labels.template.disabled = true;

let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.interpolationDuration = 500;
//valueAxis.rangeChangeDuration = 500;
valueAxis.renderer.inside = true;
valueAxis.renderer.minLabelPosition = 0.05;
valueAxis.renderer.maxLabelPosition = 0.95;
valueAxis.renderer.axisFills.template.disabled = true;
valueAxis.renderer.ticks.template.disabled = true;
valueAxis.min = 0;
valueAxis.max = 10;

this.series = this.chart.series.push(new am4charts.LineSeries());
this.series.dataFields.dateX = "date";
this.series.dataFields.valueY = "value";
this.series.interpolationDuration = 500;
this.series.defaultState.transitionDuration = 0;
this.series.tensionX = 0.8;


this.chart.events.on("datavalidated", function () {
    dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
});

dateAxis.interpolationDuration = 500;
dateAxis.rangeChangeDuration = 500;

/*
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        if (interval) {
            clearInterval(interval);
        }
    }
    else {
        startInterval();
    }
}, false);*/

// add data
let interval;
/*
function startInterval() {
    interval = setInterval(function() {
        this.visits =
            this.visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
        chart.addData(
            { date: new Date(lastdataItem.dateX.getTime() + 1000), value: this.visits },
            1
        );
    }, 1000);
}

startInterval();*/

// all the below is optional, makes some fancy effects
// gradient fill of the series
/*
this.series.fillOpacity = 1;
let gradient = new am4core.LinearGradient();
gradient.addColor(this.chart.colors.getIndex(0), 0.2);
gradient.addColor(this.chart.colors.getIndex(0), 0);
this.series.fill = gradient;*/

// this makes date axis labels to fade out
dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
    let dataItem = target.dataItem;
    return dataItem.position;
})



// need to set this, otherwise fillOpacity is not changed and not set
dateAxis.events.on("validated", function () {
    am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
        label.fillOpacity = label.fillOpacity;
    })
})

// this makes date axis labels which are at equal minutes to be rotated
dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
    let dataItem = target.dataItem;
    if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
        target.verticalCenter = "middle";
        target.horizontalCenter = "left";
        return -90;
    }
    else {
        target.verticalCenter = "middle";
        target.horizontalCenter = "left";
        return -90;
    }
})

// bullet at the front of the line
/*
this.bullet = this.series.createChild(am4charts.CircleBullet);
this.bullet.circle.radius = 5;
this.bullet.fillOpacity = 1;
this.bullet.fill = this.chart.colors.getIndex(0);
this.bullet.isMeasured = false;*/

/*
this.series.events.on("validated", function() {
    bullet.moveTo(this.series.dataItems.last.point);
    bullet.validatePosition();
});*/


let range = valueAxis.createSeriesRange(this.series);
range.value = 2;
range.endValue = -1000;
range.contents.stroke = "#00a000";//this.chart.colors.getIndex(4);
range.contents.fill = range.contents.stroke;
range.contents.strokeOpacity = 0.7;
range.contents.fillOpacity = 0.1;

let range2 = valueAxis.createSeriesRange(this.series);
range2.value = 2;
range2.endValue = 5;
range2.contents.stroke = "#FFD91A";
range2.contents.fill = range2.contents.stroke;
range2.contents.strokeOpacity = 0.7;
range2.contents.fillOpacity = 0.1;

let range3 = valueAxis.createSeriesRange(this.series);
range3.value = 5;
range3.endValue = 1000;
range3.contents.stroke = this.chart.colors.getIndex(0);
range3.contents.fill = range3.contents.stroke;
range3.contents.strokeOpacity = 0.7;
range3.contents.fillOpacity = 0.1;

}


    plusData = () => {

      const {audioData, x} = this.props;
      
      if(x > 0){
        if(this.series.dataItems.length > 0){
        
          let lastdataItem = this.series.dataItems.getIndex(this.series.dataItems.length - 1);
          
          this.data.push({ date: new Date(lastdataItem.dateX.getTime() + 200), value: audioData });

          if(this.data.length > 30){
            this.data.splice(0, 1);
          }

          this.chart.addData(
                { date: new Date(lastdataItem.dateX.getTime() + 200), value: audioData },
                1
          );
        }
      }            
    }

    stop_measure = () => {
      if(!this.state.stop){
        this.props.onStop();
      this.setState({
        stop: true,
        highest: 0,
        pause: false
      })
      }
      
    }

    play_measure = () => {
      if(this.state.stop){
        this.props.onPlay();
      this.setState({
        stop: false,
        play: false
      })
      }
      
    }

    mouse_over = (e) => {
      this.setState({
        [e.target.name] : true
      })
    }

    mouse_out = (e) => {
      this.setState({
        [e.target.name] : false
      })
    }

    componentDidUpdate() {
      if(!this.state.stop){
        this.plusData();
      }
      
    }

   componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
      
      render() {

        const {x} = this.props;
        
        if(this.data.length > 10){

          let sum = 0;

          for(var i = this.data.length - 1; i >= this.data.length - x; i--){
            sum += this.data[i].value;
          }
  
          let avg = Math.floor((sum / x) + 0.5);
  
          if(this.state.highest < avg){
            this.setState({
              highest: avg
            })
          }
        }


        return(
          <div>
            <div id = "chartdiv" style={{ width: "100%", height: "300px" }}></div>
            <div className = 'chartview'>
              <div className = "scorebox">
                <div className = 'scoretext'>
                   Current : {this.props.audioData}
                    <br/>
                    Highest : {this.state.highest}
                </div>
              </div>
              <div>
                <button onClick = {this.stop_measure} name="pause"
                onMouseEnter={this.mouse_over}
                onMouseLeave={this.mouse_out}
                className='box'>
                  Pause<MdPauseCircleOutline className="icon"/>
                </button>
              </div>
              <div>
              <button onClick = {this.play_measure} name="play"
              onMouseEnter={this.mouse_over}
              onMouseLeave={this.mouse_out}
              className='box'>
                  Start<MdPlayCircleOutline className="icon"/>
                </button>
              </div>
            </div>
          </div>
          
        ); 
      }

}

export default AudioVisualiserF;