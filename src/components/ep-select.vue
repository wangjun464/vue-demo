<template>
  <div class="select-root-view">
    <input ref="myinput" type="text" @click="isOpen=!isOpen" />
    <ul v-show="isOpen">
        <li @click="isOpen=false;doSelect(key)"
            v-for="(value,key) in list"
            :key="key">
            {{key}}-{{value}}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:["value","list"],
    data(){
        return{
            isOpen:false,
        };
    },
    methods:{
        doSelect(key){
            this.$emit('input',key);
            this.$refs.myinput.value=key+"-"+this.list[key];
        },
    },
};
</script>

<style lang="scss" scoped>

.select-root-view{
    display: inline-block;
    position: relative;
    &>input{
        cursor: pointer;
        background-image: url("../assets/select.png");
        background-size: auto 70%;
        background-repeat: no-repeat;
        background-position: right center;
    }
    &>ul{
        position:absolute;
        width: 100%;
        background: #e9eff1;
        z-index: 1;
        &>li{
            padding: 10%;
            cursor: pointer;
            &:hover{
                background-color: rgb(168, 170, 45);
            }
        }
    }
}

</style>
