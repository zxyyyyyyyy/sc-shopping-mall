<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名面包屑 -->
            <li class="with-x" v-if="searchParams.categoryname">
              {{ searchParams.categoryname
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台属性面包屑 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">
              {{ item.split(":")[1] }}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo ="trademarkInfo" @attrInfo = "attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a >综合
                    <span v-show="isOne" class="iconfont "  :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a >价格
                    <span v-show="isTwo" class="iconfont "  :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 进行路由跳转的时候：一定要带params参数:商品的id -->
                    <router-link :to="`/detail/${goods.id}`"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo = "searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo = "getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters ,mapState} from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1id: "",
        category2id: "",
        category3id: "",
        categoryname: "",
        keyword: "",
        // 排序(初始状态：综合|降序)
        order: "1:desc",
        // 分页器：代表当前是第几页
        pageNo: 1,
        // 分页器：代表每一页展示数据个数
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    // getter里面没有分模块，都在一起，所以取得时候用数组
    ...mapGetters(["goodsList"]),
    ...mapState({
      total:state=>state.search.searchList.total,
    }),
    isOne(){
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo(){
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc(){
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc(){
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    // 派发请求获取搜索页数据
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
      this.searchParams.category1id = "";
      this.searchParams.category2id = "";
      this.searchParams.category3id = "";
    },
    // 移出分类名面包屑
    removeCategoryName() {
      this.searchParams.categoryname = "";
      this.getData();
      // 地址栏也需要修改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      // 严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 移出关键字面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      // 进行路由的跳转，自己跳自己，清除params参数
      if (this.$route.query) {
        this.$router.push({ name:"search", query: this.$route.query });
      }
    },
    // 自定义事件回调
    trademarkInfo(trademark){
      // trademark参数要求："ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 移出品牌名面包屑
    removeTradeMark(){
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性回调函数
    attrInfo(attrs,item){
      let props = `${attrs.attrId}:${item}:${attrs.attrName}`;
      if(this.searchParams.props.indexOf(props)==-1){
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    // 移出面包属性面包屑
    removeProps(index){
      this.searchParams.props.splice(index,1);
      this.getData();
    },
    // 排序点击回调
    changeOrder(flag){
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = '';
      if(flag == originFlag){
        newOrder = `${originFlag}:${originSort == "desc"?"asc":"desc"}`;
      }else{
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义事件：获取子组件的分页器当前页页码
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
    // 
    

  },
  watch: {
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>