<template>
  <form novalidate v-submit="doSubmit">
    <div class="row">
      <label>姓名</label>
      <ep-input v-model="params.personName"></ep-input>
    </div>
    <div class="row">
      <label>出生年月</label>
      <ep-calender v-model="params.birthDate"></ep-calender>
    </div>
    <div class="row">
      <label>国籍</label>
      <ep-select v-model="params.nation" :list="selectList.nations"></ep-select>
    </div>
    <div class="row">
      <label>是否是自贸区</label>
      <ep-radio v-model="params.isFTA"></ep-radio>
    </div>
    <div class="btn-list">
      <input type="button" @click="doReset()" value="重置" class="btn btn-reset" />
      <input type="button" value="提交" @click="doSubmit()" class="btn btn-submit" />
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      params: {
        personName: "阿猫",
        birthDate: "19981001",
        nation: "1",
        isFTA:false,
      },
      selectList: {
        nations: {
          1: "A国",
          2: "B国",
          3: "C国",
          4: "D国",
          5: "E国",
          6: "F国",
          7: "G国",
        },
      },
    };
  },
  methods: {
    doSubmit() {
      //表单提交方法
      this.$router.push({
        name: 'output',
        params: {
            paramsData:this.params
        }
      });
    },
    doReset() {
      console.warn("重置了");
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 295px;
  padding: 10px 0;
  div {
    &.row {
      & > label {
        width: 6em;
        display: inline-block;
        text-align: right;
      }
      line-height: 1.6em;
    }
    &.btn-list {
      text-align: center;
      margin-top: 14px;
      & > .btn {
        padding: 3px 10px;
        border-radius: 6px;
        color: white;
        &.btn-submit {
          background-color: rgb(25, 186, 235);
        }
        &.btn-reset {
          background-color: rgb(214, 210, 204);
        }
      }
    }
  }
}
</style>