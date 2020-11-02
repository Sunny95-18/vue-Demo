<template>
  <div class="div">
    <Card :bordered="false" dis-hover>
        <p style="margin:0 auto">点击下方按钮，上传证书进行验证</p>
        </br></br>
      <Upload action="" style="margin:0 auto">
        <Button icon="ios-cloud-upload-outline">上传证书验证</Button>
      </Upload>



    </Card>
  </div>
</template>
<script>
export default {};
</script>

<style>
.div {
  margin: 0 auto;
  width: 500px;
  height: 650px;
}
</style>