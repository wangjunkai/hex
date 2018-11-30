<script>
  import depthChart from './depth-chart'
  import chartFeed from './js/chart-feed.js'
  import chartprovider from './js/chart-provider'
  import moment from 'moment-timezone';
  import TradingView from './js/chart-base'
  
  const timezone = [
    'Etc/UTC',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'America/Argentina/Buenos_Aires',
    'America/Bogota',
    'America/Caracas',
    'America/Chicago',
    'America/El_Salvador',
    'America/Juneau',
    'America/Lima',
    'America/Los_Angeles',
    'America/Mexico_City',
    'America/New_York',
    'America/Phoenix',
    'America/Santiago',
    'America/Sao_Paulo',
    'America/Toronto',
    'America/Vancouver',
    'Asia/Almaty',
    'Asia/Ashkhabad',
    'Asia/Bahrain',
    'Asia/Bangkok',
    'Asia/Chongqing',
    'Asia/Dubai',
    'Asia/Ho_Chi_Minh',
    'Asia/Hong_Kong',
    'Asia/Jakarta',
    'Asia/Jerusalem',
    'Asia/Kathmandu',
    'Asia/Kolkata',
    'Asia/Kuwait',
    'Asia/Muscat',
    'Asia/Qatar',
    'Asia/Riyadh',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Asia/Taipei',
    'Asia/Tehran',
    'Asia/Tokyo',
    'Atlantic/Reykjavik',
    'Australia/ACT',
    'Australia/Adelaide',
    'Australia/Brisbane',
    'Australia/Sydney',
    'Europe/Athens',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Copenhagen',
    'Europe/Helsinki',
    'Europe/Istanbul',
    'Europe/London',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Moscow',
    'Europe/Paris',
    'Europe/Riga',
    'Europe/Rome',
    'Europe/Stockholm',
    'Europe/Tallinn',
    'Europe/Vilnius',
    'Europe/Warsaw',
    'Europe/Zurich',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'Pacific/Fakaofo',
    'Pacific/Honolulu',
    'Pacific/Norfolk',
    'US/Mountain'
  ]
  export default {
    name: 'Home',
    props: ['from', 'to', 'symbleParameString', 'ispro'],
    components: {
      'hex-depth-chart': depthChart
    },
    watch: {
      '$store.state.hex_client_background.active': function (val) {
        if (val) {
          this.setBackground()
        }
      },
      '$store.state.hex_lang.locale': function () {
        this.setLanguage()
      },
      'widgetReady': function (val) {
        if (val) {
          this.hideLegend()
          this.setBackground()
          this.setLanguage()
          this.widget.chart().createStudy("Moving Average", false, false, [
              10 + parseInt(Math.random() * 10)
            ], function (guid) {
            
            },
            {"plot.color.0": "#fffdea"}
          )
          this.widget.chart().createStudy("Moving Average", false, false, [
              10 + parseInt(Math.random() * 10)
            ], function (guid) {
            
            },
            {"plot.color.0": "#ff131a"}
          )
          this.widget.chart().createStudy("Moving Average", false, false, [
              10 + parseInt(Math.random() * 10)
            ], function (guid) {
            
            },
            {"plot.color.0": "#ffd700"}
          )
        }
      }
    },
    data() {
      return {
        bg: '#1E222A',
        widgetloading: false,
        widgetReady: false,
        history: {},
        minuteResolutionList: [
          {key: 2, value: 1},
          {key: 3, value: 5},
          {key: 14, value: 10},
          {key: 4, value: 15},
          {key: 5, value: 30}
        ],
        houerResolutionList: [
          {key: 6, value: 1},
          {key: 10, value: 2},
          {key: 11, value: 4},
          {key: 12, value: 6},
          {key: 13, value: 12}
        ],
        isSelectMinute: false,
        isSelectHoure: false,
        resolutionInterval: 3,
        feed: null,
        bars: [],
        fullscreen: false,
        activeChart: 1,
        dayOverrides: {
          'scalesProperties.backgroundColor': "#ffffff",
          'paneProperties.background': "#ffffff",
          'scalesProperties.lineColor': "#DDDDE4",
        },
        nightOverrides: {
          'scalesProperties.backgroundColor': "#1E222A",
          'paneProperties.background': "#1E222A",
          'scalesProperties.lineColor': "#383655",
        },
        defaultOverrides: {
          'editorFontsList': [''],
          //表格线
          'paneProperties.crossHairProperties.color': "#646B8C",
          'paneProperties.crossHairProperties.width': 1,
          'paneProperties.crossHairProperties.style': 0,
          'paneProperties.vertGridProperties.color': "RGBA(61, 118, 76, 0.15)",
          'paneProperties.horzGridProperties.color': "RGBA(61, 118, 76, 0.15)",
          //刻度线
          'scalesProperties.backgroundColor': "#1E222A",
          'scalesProperties.fontSize': 11,
          'scalesProperties.lineColor': "#383655",
          'scalesProperties.textColor': "#646B8C",
          //蜡烛
          'mainSeriesProperties.candleStyle.upColor': "#46B05D",
          'mainSeriesProperties.candleStyle.downColor': "#CD4559",
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': false,
          'mainSeriesProperties.candleStyle.wickUpColor': '#46B05D',
          'mainSeriesProperties.candleStyle.wickDownColor': '#CD4559',
          'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
          //分时线
          'mainSeriesProperties.areaStyle.color1': "rgba(111, 143, 241, 0.05)",
          'mainSeriesProperties.areaStyle.color2': "rgba(111, 143, 241, 0.02)",
          'mainSeriesProperties.areaStyle.linecolor': "#6f8ff1",
          'mainSeriesProperties.areaStyle.linestyle': 0,
          'mainSeriesProperties.areaStyle.linewidth': 1,
          'mainSeriesProperties.areaStyle.priceSource': "close"
        },
        sub: '',
        timezone: ''
      }
    },
    methods: {
      setBackground() {
        const val = this.$store.state.hex_client_background.active
        const tradingview = document.querySelector('iframe[id^="tradingview"]')
        const contentWindow = tradingview.contentWindow.document
        const chartPage = contentWindow.querySelector('.chart-page')
        chartPage.className = chartPage.className.replace(/day/g, '').replace(/night/g, '')
        if (val == 'day') {
          chartPage.className += ' day';
        } else {
          chartPage.className += ' night'
        }
        try {
          this.widget.applyOverrides(val == 'day' ? this.dayOverrides : this.nightOverrides)
          this.widget.applyStudiesOverrides({
            toolbar_bg: val == 'day' ? '#ffffff' : '#1E222A'
          })
        } catch (e) {
        }
        
      },
      hideLegend() {
        let clickEvent
        if (document.createEvent) {
          clickEvent = document.createEvent("MouseEvent");
          clickEvent.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        else {
          clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
          });
        }
        const contentWindow = document.getElementById(this.widget._id).contentWindow
        const a = contentWindow.document.querySelector('a.pane-legend-minbtn.apply-common-tooltip.apply')
        if (a) {
          a.dispatchEvent(clickEvent)
        }
      },
      showMinute() {
        this.isSelectHoure = false
        this.isSelectMinute = !this.isSelectMinute
      },
      showHouer() {
        this.isSelectMinute = false
        this.isSelectHoure = !this.isSelectHoure
      },
      getintervalvalue(list, key) {
        return list.find((item) => {
          return item.key == key
        }).value
      },
      //设置时间间隔
      setTimeInterval(time) {
        time = Number(time)
        this.resolutionInterval = time
        let interval = ''
        switch (time) {
          case 2:
            interval = '1'
            break;
          case 3:
            interval = '5'
            break;
          case 14:
            interval = '10'
            break;
          case 4:
            interval = '15'
            break;
          case 5:
            interval = '30'
            break;
          case 6:
            interval = '60'
            break;
          case 7:
            interval = '1D'
            break;
          case 8:
            interval = '1W'
            break;
          case 9:
            interval = '1M'
            break;
          case 10:
            interval = '120'
            break;
          case 11:
            interval = '240'
            break;
          case 12:
            interval = '360'
            break;
          case 13:
            interval = '720'
            break;
        }
        return interval
      },
      setLanguage() {
        try {
          this.widget.chart().setLanguage(this.getlanguage())
        } catch (e) {
        }
      },
      setResolution(time) {
        try {
          for (let i in chartprovider.history) {
            delete chartprovider.history[i].firstBar
          }
          const interval = this.setTimeInterval(time)
          const chart = this.selectChartType('STYLE_CANDLES')
          this.widget.chart().setChartType(chart)
          this.widget.chart().setResolution(interval, function (e) {
          })
        } catch (e) {
        }
      },
      selectChartType(type) {
        let typenum
        switch (type) {
          case 'STYLE_BARS':
            typenum = 0
            break;
          case 'STYLE_CANDLES':
            typenum = 1
            break;
          case 'STYLE_AREA':
            typenum = 3
            break
          case 'STYLE_LINE':
            typenum = 2
            break
          case 'STYLE_HEIKEN_ASHI':
            typenum = 8
            break
        }
        return typenum
      },
      //设置图表类型
      setChartType(type) {
        try {
          const chart = this.selectChartType(type)
          this.resolutionInterval = 1
          this.widget.chart().setChartType(chart)
          this.widget.chart().resetData()
        } catch (e) {
        }
      },
      //设置弹窗
      setOtherWindows(val) {
        this.widget.chart().executeActionById(val)
      },
      //全屏
      toggleFullScreen() {
        this.fullscreen = !this.fullscreen
        this.$refs['fullscreen'].toggle()
      },
      fullscreenChange(fullscreen) {
        this.fullscreen = fullscreen
        setTimeout(() => {
          this.$refs['depth-chart'].setFullScreen(this.fullscreen)
        }, 50)
      },
      getlanguage() {
        return this.$store.state.hex_lang.locale == 'zh_cn' ? "zh" : 'en'
      },
      initView() {
        let this_vue = this
        
        let tz = moment.tz.guess()
        if (timezone.indexOf(tz) < 0) {
          tz = 'Etc/UTC'
        }
        const overrides = Object.assign(this.defaultOverrides, this.$store.state.hex_client_background.active == 'day' ? this.dayOverrides : this.nightOverrides)
        this.timezone = tz
        this.feed = chartFeed.createFeed(this_vue)
        this.widget = new TradingView.widget({
          debug: false,
          autosize: true,
          interval: 5,
          timezone: tz,
          container_id: "hex-chart-content",
          datafeed: this.feed,
          library_path: "/chart/",
          locale: this.getlanguage(),
          disabled_features: [
            'header_widget_dom_node',
            'save_chart_properties_to_local_storage',
            "use_localstorage_for_settings",
            'volume_force_overlay',
            //'timeframes_toolbar',//底部时间栏
            'header_screenshot',//快照
            'header_saveload',//保存
            'header_symbol_search',//头部搜索
            'header_chart_type',
            'header_indicators',
            'header_undo_redo',
            'header_compare',
            'header_resolutions',
            'items_favoriting',
            'header_interval_dialog_button',
            'show_interval_dialog_on_key_press',
          ],
          studies_overrides: {
            //显示交易量的移动平均线
            'volume.show ma': false
          },
          overrides: overrides,
          custom_css_url: "css/hex.css",
          enabled_features: [
            //"move_logo_to_main_pane",
            "study_templates",
            'hide_left_toolbar_by_default'
          ],
          charts_storage_url: 'http://saveload.tradingview.com',
          charts_storage_api_version: "1.1",
          client_id: 'tradingview.com',
          user_id: 'public_user_id'
        });
        this.widget.onChartReady(() => {
          const wd = document.getElementById(this.widget._id)
          if (wd) {
            wd.style.visibility = 'visible'
          }
          this.widgetloading = false
          this.widgetReady = true
        });
        
      },
      
      //切换chart
      setActiveChart(type) {
        this.activeChart = type
      },
      setMinuteResolution(val) {
        this.isSelectHoure = false
        this.isSelectMinute = false
        this.setResolution(val)
      }
    },
    mounted: function () {
      this.widgetloading = true
      this.initView()
    },
    created() {
      this.sub = `market.${this.symbleParameString}.kline.1min`
    },
    beforeDestroy() {
      for (const _t in chartprovider.timer) {
        clearTimeout(chartprovider.timer[_t])
        chartprovider.timer[_t] = -1
      }
      for (const _t in chartprovider.pollingtimer) {
        clearTimeout(chartprovider.pollingtimer[_t])
        chartprovider.pollingtimer[_t] = -1
      }
    }
  }
</script>
<template>
  <fullscreen class="hex-chart" @change="fullscreenChange" :fullscreen.sync="fullscreen" ref="fullscreen">
    <div class="hex-chart-plugin clearfix">
      <div v-show="activeChart==1" class="left">
        <div class="plugin_interval">
          <span class="plugin_interval_tip" :class="{'active':resolutionInterval==1}"
                @click="setChartType('STYLE_AREA')">{{$t('deal.timeShare')}}</span>
          <div
            :class="{'active':[2,3,4,5,14].indexOf(resolutionInterval)>=0}"
            class="plugin_interval_tip plugin_interval_minute">
            <span class="plugin_interval_minute_tip"
                  @click="showMinute">{{[2,3,4,5,14].indexOf(resolutionInterval)>=0?getintervalvalue(minuteResolutionList,resolutionInterval):''}}{{$t('deal.minutes')}}</span>
            <ul
              v-show="isSelectMinute"
              class="plugin_interval_minute_content">
              <li :class="{'active':resolutionInterval==m.key}"
                  v-for="(m,index) in minuteResolutionList"
                  :key="index"
                  @click="setMinuteResolution(m.key)">{{m.value}}{{$t('deal.minutes')}}
              </li>
            </ul>
          </div>
          <!--小时-->
          <div
            :class="{'active':[6,10,11,12,13].indexOf(resolutionInterval)>=0}"
            class="plugin_interval_tip plugin_interval_minute">
            <span class="plugin_interval_minute_tip"
                  @click="showHouer">{{[6,10,11,12,13].indexOf(resolutionInterval)>=0?getintervalvalue(houerResolutionList,resolutionInterval):''}}{{$t('deal.hour')}}</span>
            <ul
              v-show="isSelectHoure"
              class="plugin_interval_minute_content">
              <li :class="{'active':resolutionInterval==m.key}"
                  v-for="(m,index) in houerResolutionList"
                  :key="index"
                  @click="setMinuteResolution(m.key)">{{m.value}}{{$t('deal.hour')}}
              </li>
            </ul>
          </div>
          
          <span class="plugin_interval_tip" :class="{'active':resolutionInterval==7}"
                @click="setResolution(7)">{{$t('deal.dateLine')}}</span>
          
          <span class="plugin_interval_tip" :class="{'active':resolutionInterval==8}"
                @click="setResolution(8)">{{$t('deal.contour')}}</span>
          <span class="plugin_interval_tip" :class="{'active':resolutionInterval==9}"
                @click="setResolution(9)">{{$t('deal.Monthly')}}</span>
          <el-tooltip
            :content="$t('security.set')"
            popper-class="chart_tooltip"
            placement="bottom">
            <span class="plugin_set_button set_button" @click="setOtherWindows('scalesProperties')"></span>
          </el-tooltip>
          <el-tooltip effect="dark"
                      :content="$t('c2c.index')"
                      popper-class="chart_tooltip"
                      placement="bottom">
            <span class="plugin_set_button index_button" @click="setOtherWindows('insertIndicator')"></span>
          </el-tooltip>
        </div>
      </div>
      <div class="right">
        <el-tooltip effect="dark"
                    :content="ispro?$t('c2c.Basic'):$t('c2c.Advanced')"
                    popper-class="chart_tooltip"
                    placement="bottom">
          <nuxt-link tag="span" class="plugin_major_button"
                     :to="`/deal${ispro?'':'/pro'}/${from.toLowerCase()}_${to.toLowerCase()}`"></nuxt-link>
        </el-tooltip>
        <div class="plugin_chart_nav">
          <span class="trading" :class="{'active':activeChart==1}" @click="setActiveChart(1)"></span>
          <span class="depth" :class="{'active':activeChart==2}" @click="setActiveChart(2)"></span>
        </div>
        <span class="plugin_full" @click="toggleFullScreen"></span>
      </div>
    </div>
    <div class="chart-content">
      <div id="hex-chart-content"
           v-hex-loading="widgetloading"
           :class="{'active':activeChart==1}"
           ref="hex-chart-content"
           class="hex-chart-content hex-loading"></div>
      <div
        :class="{'active':activeChart==2}"
        style="padding-left: 10px;"
        class="hex-chart-content">
        <hex-depth-chart :symbleParameString="symbleParameString"
                         ref="depth-chart"></hex-depth-chart>
      </div>
    </div>
  </fullscreen>

</template>
<style lang="less">
  @import "../../static/styles/color";
  
  .el-tooltip__popper.is-dark.chart_tooltip {
    margin-top: 0;
    background: #292E39;
    .popper__arrow, .popper__arrow:after {
      border-bottom-color: #292E39;
    }
  }
  
  .plugin_interval_minute_tip {
    position: relative;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    padding-right: 12px;
  }
  
  .plugin_interval_minute_tip:hover,
  .plugin_interval_minute_tip.active,
  .hex-chart-plugin .plugin_interval .plugin_interval_tip.active,
  .hex-chart-plugin .plugin_interval .plugin_interval_tip:hover {
    color: @cl_link;
    background-color: @cl_292E39
  }
  
  .plugin_interval_minute_tip:after,
  .plugin_interval_minute_tip.active:after {
    content: '';
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    position: absolute;
    width: 6px;
    height: 4px;
    background-image: url("../../static/images/arrowdown.svg");
    background-size: cover;
    right: 0;
  }
  
  .plugin_interval_minute_tip:hover:after,
  .plugin_interval_tip.active .plugin_interval_minute_tip:after {
    background-image: url("../../static/images/arrowdown_active.svg");
  }
  
  .plugin_interval_minute {
    position: relative;
  }
  
  .plugin_interval_minute_content {
    position: absolute;
    font-size: 12px;
    color: #ffffff;
    left: 0;
    line-height: 36px;
    background-color: #292E39;
    width: 80px;
    z-index: 2;
    top: 30px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }
  
  .plugin_interval_minute_content li {
    padding: 0 10px;
    cursor: pointer;
  }
  
  .plugin_interval_minute_content li:hover,
  .plugin_interval_minute_content li.active {
    background-color: #333946;
  }
  
  .hex-chart {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .hex-chart.fullscreen {
    background-color: #1e222a !important
  }
  
  .hex-chart.fullscreen .hex-chart-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
  
  .hex-chart-plugin {
    font-size: 12px;
    position: relative;
    z-index: 2;
    border-bottom: 1px solid @cl_292E39;
    background-color: @cl_content;
    margin-bottom: 5px;
    .plugin_set_button {
      float: left;
      width: 28px;
      height: 30px;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: 14px;
      background-position: center;
      margin-left: 10px;
      cursor: pointer;
    }
    .set_button {
      background-image: url("../../static/images/klin_set.svg");
    }
    .set_button:hover {
      background-image: url("../../static/images/klin_set_active.svg");
    }
    .index_button {
      background-image: url("../../static/images/klin_zhibiao.svg");
    }
    .index_button:hover {
      background-image: url("../../static/images/klin_zhibiao_active.svg");
    }
    .plugin_major_button {
      float: left;
      display: inline-block;
      width: 36px;
      height: 30px;
      border-right: 1px solid #292E39;
      border-left: 1px solid #292E39;
      background-size: 16px;
      background-repeat: no-repeat;
      background-image: url("../../static/images/klin_zhuanye.svg");
      background-position: center;
      cursor: pointer;
    }
    .plugin_major_button:hover {
      background-image: url("../../static/images/klin_zhuanye_active.svg");
    }
  }
  
  .chart-content {
    position: relative;
    width: 100%;
    flex: 1;
  }
  
  .hex-chart-content {
    background: @cl_content;
    height: 100%;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
  
  .hex-chart-content.active {
    z-index: 1;
  }
  
  .hex-chart-plugin .plugin_interval {
    color: @cl_8790A1;
  }
  
  .hex-chart-plugin .plugin_interval .plugin_interval_tip {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    padding: 0 10px;
    float: left;
  }
  
  .hex-chart-plugin .plugin_full {
    background-image: url('../../static/images/full.svg');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    float: right;
    width: 36px;
    height: 30px;
    cursor: pointer;
  }
  
  .fullscreen .plugin_full {
    background-image: url('../../static/images/full_active.svg');
  }
  
  .hex-chart-plugin .plugin_chart_nav {
    color: #C5C3DD;
    display: inline-block;
    position: relative;
    float: left;
    .trading, .depth {
      float: left;
      background-size: 16px 16px;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
      width: 36px;
      height: 30px;
    }
    .trading {
      background-image: url("../../static/images/klin.svg");
    }
    .trading.active {
      background-image: url("../../static/images/klin_active.svg");
    }
    .depth {
      background-image: url("../../static/images/depth.svg");
    }
    .depth.active {
      background-image: url("../../static/images/depth_active.svg");
    }
  }
  
  .hex-chart-plugin .plugin_chart_nav span {
    text-align: center;
    padding: 0 10px;
    display: inline-block;
    cursor: pointer;
    height: 30px;
  }
  
  .hex-chart-plugin .plugin_chart_nav span.active {
    background-color: @cl_292E39;
    color: @cl_8790A1;
  }
</style>

