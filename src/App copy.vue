<template>
  <div class="flex flex-row h-screen gap-4">
    <!-- 侧边搜索与导航 -->
    <div class="basis-1/4">
      <div class="flex flex-col h-screen">
        <!-- 搜索框 -->
        <div class="basis-1/12">
          <input type="text" placeholder="Search Tools" 
                 class="input input-bordered input-sm w-full max-w-xs">
        </div>

        <!-- all tools -->
        <div class="basis-1/12">
          <button class="btn w-full btn-sm gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            All Tools
          </button>
        </div>

        <div class="divider"></div>

        <!-- 导航栏 -->
        <div class="basis-10/12">
          <div class="card w-full h-full bg-neutral text-neutral-content">
            <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <div class="collapse-title text-sm font-medium">
                Focus me to see content
              </div>
              <div class="collapse-content"> 
                <p>tabindex="0" attribute is necessary to make the div focusable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="basis-3/4">
      <div class="card w-full h-full bg-neutral text-neutral-content">
        主体区域
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
