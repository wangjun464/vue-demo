<template>
    <form novalidate v-submit='doSubmit()'>
        <div class="row">
            <label>姓名是{{personName}}</label>
            <ep-input v-model="personName"></ep-input>
        </div>
        <div class="row">
            <label>出生年月是{{birthDate}}</label>
            <ep-calender v-model="birthDate"></ep-calender>
        </div>
        <div class="row">
            <label>国籍</label>
            <ep-select></ep-select>
        </div>
        <div class="row">
            <label>是否是自贸区</label>
            <ep-radio></ep-radio>
        </div>
        <div class="btn-list">
            <input type="button" @click="doReset()" value="重置" class="btn btn-reset"/>
            <input type="submit" value="提交" class="btn btn-submit"/>
        </div>
    </form>
</template>
<script>
export default {
    data(){
        return {
            personName:'阿猫',
            birthDate:"19981001"
        };
    },
    methods:{
        doSubmit(){
            console.warn("提交了");
        },
        doReset(){
            console.warn("重置了");
        }
    }
}
</script>