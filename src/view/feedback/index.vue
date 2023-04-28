<template>
  <div id="feedback">
      <van-nav-bar title="意见反馈" left-arrow @click-left="onClickLeft" />
      <div class="content">
        <van-form ref="form" label-width="100%">
          <van-field required label="（必选）请选择你想反馈的问题点" :rules="[{ required: true, message: '请选择',trigger:'onBlur' }]">
            <template #input>
              <van-radio-group v-model="formData.questionType" checked-color="#1A9D98">
                <van-radio :name="item.id" v-for="item in columns" :key="item.id">{{ item.name }}</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="请补充详细问题和意见" >
            <template #input>
              <van-field
                v-model="formData.detailedComments"
                placeholder="请补充详细问题和意见"
                autosize
                rows="2"
                type="textarea"
                maxlength="300"
                show-word-limit
                clearable
              />
            </template>
          </van-field>
          <van-field required label="请提供联系人及联系方式">
            <template #input>
                <van-field clearable style="width:100%" :rules="[{ required: true, message: '',trigger:'onBlur' }]" v-model="formData.contact" placeholder="请填写联系人" maxlength="30" />
                <van-field type="number" clearable style="width:100%" :rules="[{ required: true , message: '',trigger:'onBlur' }]" v-model="formData.phone" placeholder="请填写手机号码" maxlength="11" />
            </template>
          </van-field>
          <van-button type="primary" @click="handleSubmit" class="van-btn">提交</van-button>
        </van-form>
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      show: true,
      showPicker: false,
      formData: {
        questionType: '',
        detailedComments: '',
        contact: '',
        phone: ''
      },
      columns: [{name: '商品假冒伪劣', id: 1}, {name: '溯源信息不真实', id: 2}, {name: '商品已过保质期', id: 3}, {name: '其他', id: 4}],
      feedBack: {}
    }
  },
  activated () {
    this.feedBack = this.$route.query || {}
  },
  methods: {
    descValidator (val) {
      return val.length >= 10
    },
    onClickLeft () {
      this.$emit('handleCancel')
      for (let item in this.formData) {
        this.formData[item] = ''
      }
      this.$refs.form.resetValidation()
      this.$router.back()
    },
    handleSubmit () {
      this.$refs.form.validate().then(() => {
        // 校验通过
        let params = {
          code: this.feedBack.code,
          productId: this.feedBack.productId,
          productType: this.feedBack.type,
          questionType: this.formData.questionType,
          contact: this.formData.contact,
          phone: this.formData.phone,
          detailedComments: this.formData.detailedComments,
          status: 0 // 待受理
        }
        this.$trace.submitFeedBack(params).then(res => {
          if (res.success) {
            Toast({
              message: '提交成功'
            })
            this.onClickLeft()
          } else {
            Toast({
              message: res.message
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#feedback{
  width: 100%;
  height: 100%;
  background: #e4e4e4;
  .content{
    .van-cell {
      display: flex;
      flex-direction: column;
      background: #e4e4e4;
      padding: 0;
    }
    /deep/ .van-cell__title{
      padding: 10px 20px;
    }
    /deep/ .van-cell__value{
      background: #fff;
      padding: 10px 20px;
    }
    /deep/ .van-field__control--custom {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    /deep/ .van-radio-group .van-radio {
      margin: 8px 0 ;
    }
  }
  .van-btn{
    width: calc(100% - 40px);
    margin: 20px;
  }
  /deep/ .van-cell--required::before {
    top: 12px;
  }
}
</style>
<style>
#feedback > .van-nav-bar > .van-nav-bar__content > .van-nav-bar__left > .van-icon {
  color: #999;
}
</style>
