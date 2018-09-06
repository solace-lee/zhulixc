<template>
  <div class="box">
    <h1>收货地址</h1>
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result :search-result="searchResult" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaList,
      searchResult: []
    };
  },

  methods: {
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style scoped lang="less">
.box {
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  h1 {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 50px;
    background-color: #000;
    color: #fff;
  }

}

.van-button--primary{
    color: #fff;
    background-color: #cd2a34;
    border: 1px solid #cd2a34;
}
</style>