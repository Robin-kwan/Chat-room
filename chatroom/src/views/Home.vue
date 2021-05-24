<template>
  <div style="height: 100vh;">
    <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
      <div>
        <p style="font-size: 3em; font-weight: 600;"> Chat Room </p>
        <div style="justify-content: space-between; align-items: center;">
          <div v-for="n in 3" :key="n" class="box" @click="goRoom(n)">
            <p style="font-weight: 600; font-size: 24px;"> Room {{n}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods:{
    goRoom(num){
      this.$router.push("/"+num);
    }
  }
};
</script>

<style scoped>
.box{
  background-color: #fff;
  min-width: 280px; 
  text-align: center; 
  padding: 8px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  margin: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;
}
.box:focus,
.box:hover{
  transform: translateY(-0.25em) translateX(0.25em);
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 3em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  /* color: #fff; */
}
</style>
