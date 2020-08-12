<template>
  <div>
    <input readonly ref="myinput" type="text" :value="value" @input="doit()" />
    <div ref="mycalendar" class="calendar-view">
      <!-- 日历组件切换视图 -->
    </div>
  </div>
</template>
<script>
import $date from "../services/$date";
import $$ from "image2d";

export default {
  props: ["value"],
  data() {
    return {
      //选择的日期
      selectYear: -1,
      selectMonth: -1,
      selectDay: -1,
      //记录日期是否开了
      isOpen: false,
      //今天
      todayYear: -1,
      todayMonth: -1,
      todayDay: -1,
    };
  },
  methods: {
    doit() {
      this.$emit("input", this.$refs.myinput.value);
    },
    selectDayView(year, month) {
      // 头部分
      let template = `
                <div class="header">
                <div class="left">&lt;</div>
                <div class="title">
                ${year}年${month}月
                </div>
                <div class="right">&gt;</div>
                </div>
            `;
      template += "<div class='container day-view'><ul>";
      ["日", "一", "二", "三", "四", "五", "六"].forEach(function (val) {
        template += "<li class='none item'>" + val + "</li>";
      });

      // 前置灰色
      $date.getPreDayArray(year, month).forEach(function (val) {
        template += "<li class='none item gray'>" + val + "</li>";
      });

      // 内容主体部分
      let days = $date.getMonthDays(year, month);
      for (var i = 1; i <= days; i++) {
        var clazz = "click item";
        if (
          year == this.selectYear &&
          month == this.selectMonth &&
          i == this.selectDay
        ) {
          clazz += " selected";
        }
        if (
          year == this.todayYear &&
          month == this.todayMonth &&
          i == this.todayYear
        ) {
          clazz += " today";
        }
        template += `
          <li class='${clazz}' 
               val='${i}'> ${i} 
          </li>\n
          `;
      }
      // 后置灰色
      $date.getNextDayArray(year, month).forEach(function (val) {
        template += "<li class='none item gray'>" + val + "</li>";
      });
      template += "</ul></div>";
      this.$refs.mycalendar.innerHTML = template;

      $$(".left", this.$refs.mycalendar).bind("click", () => {
        if (month == 1) {
          month = 12;
          year -= 1;
        } else {
          month -= 1;
        }
        this.selectDayView(year, month);
      });

      $$(".title", this.$refs.mycalendar).bind("click", () => {
        this.selectMonthView(year);
      });

      $$(".right", this.$refs.mycalendar).bind("click", () => {
        if (month == 12) {
          year -= -1;
          month = 1;
        } else {
          month = parseInt(month) + 1;
        }
        this.selectDayView(year, month);
      });

      $$(".click",this.$refs.mycalendar).bind("click",(event)=>{
          let day=event.target.getAttribute("val");
          this.selectYear=year;
          this.selectMonth=month;
          this.selectDay=day;
        //   this.value=year+""+month+""+day;
          this.$refs.myinput.value=`${year}${month}${day}`;
          this.doit();
          this.$refs.mycalendar.innerHTML="";
          this.isOpen=false;
      });
    },


    selectMonthView(year) {
        // 头部分
    let template =
        '<div class="header">' +
        '   <div class="left">&lt;</div>' +
        '   <div class="title">' + year + '年</div>' +
        '   <div class="right">&gt;</div>' +
        '</div>';

    template += "<div class='container month-view'><ul>";

    // 内容部分
    for (var i = 1; i <= 12; i++) {
        var clazz = 'click item';
        if (year == this.selectYear && i == this.selectMonth) {
            clazz += " selected";
        }
        template += "<li class='" + clazz + "' val='" + i + "'>" + i + "</li>";
    }

    template += "</ul></div>";

    this.$refs.mycalendar.innerHTML=template;

    $$('.left',this.$refs.mycalendar).bind("click",()=>{
        this.selectMonthView(year-1);
    });

    $$('.right',this.$refs.mycalendar).bind("click",()=>{
        this.selectMonthView(year - -1);
    });

    $$('.title',this.$refs.mycalendar).bind("click",()=>{
        this.selectYearView(year);
    });

    $$(".click",this.$refs.mycalendar).bind("click",(event)=>{
          this.selectDayView(year,event.target.getAttribute("val"));
      });

    },


    selectYearView(year) {
        let decYears = $date.getDecYears(year);

        // 头部分
        let template =
            '<div class="header">' +
            '   <div class="left">&lt;</div>' +
            '   <div class="title">' + decYears[0] + ' - ' + decYears[9] + '</div>' +
            '   <div class="right">&gt;</div>' +
        '</div>';

        template += "<div class='container year-view'><ul>";

        template += "<li class='none item gray'>" + (decYears[0] - 1) + "</li>";
        for (var i = 0; i < decYears.length; i++) {
            var clazz = 'click item';
            if (decYears[i] == this.selectYear) {
                clazz += " selected";
            }
            template += "<li class='" + clazz + "' val='" + decYears[i] + "'>" + decYears[i] + "</li>";
        }
        template += "<li class='none item gray'>" + (decYears[9] + 1) + "</li>";

        template += "</ul></div>";

        this.$refs.mycalendar.innerHTML=template;

        $$('.left',this.$refs.mycalendar).bind("click",()=>{
            this.selectYearView(year-10);
        });

        $$('.right',this.$refs.mycalendar).bind("click",()=>{
            this.selectYearView(year - -10);
        });

        $$(".click",this.$refs.mycalendar).bind("click",(event)=>{
          this.selectMonthView(event.target.getAttribute("val"));
        });

    },
  },
  mounted() {
    // let dd=this.value;
    this.selectYear = this.value.substr(0, 4);
    this.selectMonth = this.value.substr(4, 2);
    this.selectDay = this.value.substr(6, 2);

    const today = new Date();
    this.todayYear = today.getFullYear();
    this.todayMonth = today.getMonth() + 1;
    this.todayDay = today.getDate();

    $$(this.$refs.myinput).bind("click", () => {
      // alert(1);
      if (this.isOpen) {
        //关闭
        this.$refs.mycalendar.innerHTML="";
        this.isOpen=false;
      } else {
        //打开
        this.selectDayView(this.selectYear, this.selectMonth);
        this.isOpen=true;
      }
    });
  },
};
</script>
<style lang="scss">
/**
----------------------------------------
 日历组件样式
----------------------------------------
*/

.calendar-view {
  width: 210px;
  user-select: none;
  background-color: rgb(233, 239, 241);
  line-height: 1.8em;
  text-align: center;
  box-shadow: 1px 2px 3px #79798d;
}

/* 头部 */

.calendar-view > .header > div {
  display: inline-block;
  cursor: pointer;
}

.calendar-view > .header > div.title {
  width: 165px;
}

/* 内容 */
.calendar-view > .container.day-view > ul > li {
  width: 29px;
}

.calendar-view > .container.month-view > ul > li,
.calendar-view > .container.year-view > ul > li {
  width: 52px;
  line-height: 2.4em;
}

.calendar-view > .container > ul > li {
  display: inline-block;
}

.calendar-view > .container > ul > li.click {
  cursor: pointer;
}
.calendar-view > .container > ul > li.none {
  cursor: no-drop;
}

.calendar-view > .container > ul > li.gray {
  color: gray;
}

.calendar-view > .container > ul > li.click.today {
  background-color: rgb(251, 214, 2);
}

.calendar-view > .container > ul > li.click.selected {
  background-color: rgb(21, 199, 243);
}

.calendar-view > .container > ul > li:hover {
  background-color: rgb(185, 233, 245);
}
</style>