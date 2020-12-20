<script>
/* eslint-disable */
import Anychart from 'anychart'

export default {
  props: ['options', 'Anychart'],
  name: 'VueAnychart',
  data () {
    return {
      chart: null,
      date: [
        [Date.UTC(2007, 7, 23), 23.55, 23.88, 23.38, 23.62],
        [Date.UTC(2007, 7, 24), 22.65, 23.7, 22.65, 23.36],
        [Date.UTC(2007, 7, 25), 22.75, 23.7, 22.69, 23.44],
        [Date.UTC(2007, 7, 26), 23.2, 23.39, 22.87, 22.92],
        [Date.UTC(2007, 7, 27), 23.98, 24.49, 23.47, 23.49],
        [Date.UTC(2007, 7, 30), 23.55, 23.88, 23.38, 23.62],
        [Date.UTC(2007, 7, 31), 23.88, 23.93, 23.24, 23.25],
        [Date.UTC(2007, 8, 1), 23.17, 23.4, 22.85, 23.25],
        [Date.UTC(2007, 8, 2), 22.65, 23.7, 22.65, 23.36],
        [Date.UTC(2007, 8, 3), 23.2, 23.39, 22.87, 22.92],
        [Date.UTC(2007, 8, 6), 23.03, 23.15, 22.44, 22.97],
        [Date.UTC(2007, 8, 7), 22.75, 23.7, 22.69, 23.44]
      ]
    }
  },
  mounted () {
    if (!this.chart) {
      this.init()
    }
  },
  methods: {
    removeSeries () {
      if (this.chart.getSeriesCount()) {
        this.chart.removeSeriesAt(0)
      }
    },
    removeAllSeries () {
      if (this.chart.getSeriesCount()) {
        this.chart.removeAllSeries()
      }
    },
    addSeries (data) {
      this.delegateMethod('addSeries', data)
    },
    delegateMethod (name, data) {
      if (!this.chart) {
        warn(`Cannot call [$name] before the chart is initialized. Set prop [options] first.`, this)
        return
      }
      return this.chart[name](data)
    },
    init () {
      let _Anychart = this.Anychart || Anychart
      this.chart = new _Anychart.data.loadCsvFile(
          'https://cdn.anychart.com/csv-data/csco-daily.csv',
          function (data) {
            // create data table on loaded data
            var dataTable = anychart.data.table();
            dataTable.addData(data);

            // map loaded data for the ohlc series
            var mapping = dataTable.mapAs({
              open: 1,
              high: 2,
              low: 3,
              close: 4
            });

            // map loaded data for the scroller
            var scrollerMapping = dataTable.mapAs();
            scrollerMapping.addField('value', 5);

            // create stock chart
            var chart = anychart.stock();

            // create first plot on the chart
            var plot = chart.plot(0);
            // set grid settings
            plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

            // create EMA indicators with period 50
            plot
                .ema(dataTable.mapAs({ value: 4 }))
                .series()
                .stroke('1.5 #455a64');

            var series = plot.candlestick(mapping);
            series.name('CSCO');
            series.legendItem().iconType('rising-falling');

            // create scroller series with mapped data
            chart.scroller().candlestick(mapping);

            // set chart selected date/time range
            chart.selectRange('2007-01-03', '2007-05-20');

            // set container id for the chart
            chart.container('container').draw();
            // initiate chart drawing
            // chart.draw();

            // create range picker
            var rangePicker = anychart.ui.rangePicker();
            // init range picker
            rangePicker.render(chart);

            // create range selector
            var rangeSelector = anychart.ui.rangeSelector();
            // init range selector
            rangeSelector.render(chart);
          }
      )
    }
  },
  watch: {
    options: function (options) {
      if (!this.chart && options) {
        this.init()
      }
      else {
        this.chart.dispose()
        this.chart = null
        this.init()
      }
    }
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }
}
</script>

<template>
  <div class="chart" id="container">
  </div>
</template>

<style lang="css" scoped>
  .chart {
    height: 400px;
  }
</style>