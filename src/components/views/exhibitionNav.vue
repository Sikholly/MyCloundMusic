<template>
  <div id="exhibition-nav">
    <ul class="exhibition-list">
      <li class="highlight">个性推荐</li>
      <li>歌单</li>
      <li>排行榜</li>
      <li>歌手</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
#exhibition-nav {
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  z-index: 50;
  border-left: 1px solid #cecdcd;
}

.exhibition-list {
  display: flex;
}

.exhibition-list {
  list-style: none;
  margin-left: 10px;
}

.exhibition-list li {
  list-style: none;
  margin: 20px 20px 10px 20px;
  padding-bottom: 5px;
  cursor: pointer;
}
</style>