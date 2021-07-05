<template>
  <div class="container">
    <div class="tabs">
      <div class="tab-item active">选项1</div>
      <div class="tab-item">选项2</div>
    </div>
    <div class="wrap-button">
      <div class="button button_color">按钮</div>
      <div class="button button_border">按钮</div>
    </div>
    <div class="input-label">
      请选择主题颜色<input
        class="input-color"
        type="color"
        v-model="themeColor"
        @change="changeColor('--THEME-COLOR',themeColor)"
      />
      请选择按钮颜色<input
        class="input-color"
        type="color"
        v-model="buttonColor"
        @change="changeColor('--BUTTON-COLOR',buttonColor)"
      />
      请选择文字颜色<input
        class="input-color"
        type="color"
        v-model="textColor"
        @change="changeColor('--TEXT-COLOR',textColor)"
      />
      自定义变量名<input type="text" class="indefine" @blur="setName()" />
      <input
        class="input-color"
        type="color"
        v-model="color"
        @change="setColor(color)"
      />
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      themeColor: '',
      buttonColor: '',
      textColor: '',
      color: ''
    };
  },
  methods: {
    changeColor(type, value) {
      document.documentElement.style.setProperty(type, value);
    },

    setName() {
      var input = document.getElementsByClassName("indefine")[0].value;
      return input;
    },

    setColor(val) {
      let input = this.setName();
      document.documentElement.style.setProperty(input, val);

      let content = input + ":" + "'" + val + "'";
      console.log(content)
      // 将值写入normal.css文件中
    },
    
  },
};
</script>

<style lang="scss">
    body {
        background: var(--THEME-COLOR);
    }

    .container {
        width: 100%;
        height: 100%;
        background: var(--THEME-COLOR);
    }

    .tabs {
        width: 300px;
        display: flex;
        flex-direction: row;
        margin-left: 15px;
    }

    .tab-item {
        flex: 1;
        padding: 15px 0;
        color: #666;
        text-align: center;
        background: #fff;
        border-bottom: 4px solid #fff;
        cursor: pointer;
    }

    .active {
        border-bottom-color: var(--THEME-COLOR);
        color: var(--TEXT-COLOR);
    }

    .wrap-button {
        padding: 20px 15px;
    }

    .button {
        text-align: center;
        padding: 10px 0;
        border-radius: 4px;
        cursor: pointer;
        margin: 10px 0;
    }

    .button_color {
        width: 300px;
        color: #fff;
        background: var(--BUTTON-COLOR);
        border: 1px solid var(--THEME-COLOR);
    }

    .button_border {
        width: 300px;
        color: var(--BUTTON-COLOR);
        background: #fff;
        border: 1px solid var(--THEME-COLOR);
    }

    .input-label {
        width: 200px;
        height: 200px;
        background-color: var(--THEME-COLOR);
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: center;
        float: right;
        right: 0;
        top: 0;
        position: absolute;
    }

    .input-color {
        margin: 10px 0 10px 10px;
    }
</style>
