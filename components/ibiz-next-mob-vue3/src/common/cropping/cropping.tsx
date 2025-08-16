/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { createUUID } from 'qx-util';
import './cropping.scss';

export const IBizCropping = defineComponent({
  name: 'IBizCropping',
  props: {
    // 传递一个文件对象进来
    img: {
      type: Object as PropType<IData>,
    },
    // 未传递img时，使用传递的url获取图片
    url: {
      type: String,
    },
    // 截取区域宽度
    cropareaWidth: {
      type: Number,
      default: 300,
    },
    // 截取区域高度
    cropareaHeight: {
      type: Number,
      default: 200,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('cropping');
    // 缩放比例
    const scaleNumber = ref(1);
    // 是否允许移动
    const allowMove = ref(false);
    // 图片Ref
    const imgRef = ref();
    // 图片移动位置
    const imgMovePosition: Ref<IData> = ref({
      x: 0, // 鼠标X轴移动距离
      y: 0, // 鼠标Y轴移动距离
      tx: 0, // 图片X轴已有偏移量
      ty: 0, // 图片Y轴已有偏移量
    });

    // 上一次缩放时两指的距离
    let lastDistance = 0; // 最后一次距离
    // 剪切框容器
    const cropContainerRef = ref();
    // 截取区域元素id
    const uuid = createUUID();
    // 计算截取图片的url
    const cropImgUrl = computed(() => {
      if (props.img?.raw) {
        return URL.createObjectURL(props.img.raw);
      }
      if (props.url) {
        return props.url;
      }
      return '';
    });

    // 计算图片边缘与截取区域相交的边距宽度，用来限制图片拖动时在X轴上允许拖动的范围
    const spaceWidth = computed(() => {
      let tempwidth = 0;
      if (imgRef.value) {
        const { width } = imgRef.value.getBoundingClientRect();
        tempwidth = (width - props.cropareaWidth) / 2;
      }
      return tempwidth;
    });

    // 计算图片边缘与截取区域相交的边距高度，用来限制图片拖动时在Y轴上允许拖动的范围
    const spaceHeight = computed(() => {
      let tempheight = 0;
      if (imgRef.value) {
        const { height } = imgRef.value.getBoundingClientRect();
        tempheight = (height - props.cropareaHeight) / 2;
      }
      return tempheight;
    });

    // 缩小
    const onReduce = () => {
      if (scaleNumber.value > 1) {
        scaleNumber.value = (scaleNumber.value * 10 - 1) / 10;
      }
    };

    // 放大
    const onAdd = () => {
      if (scaleNumber.value < 3) {
        scaleNumber.value = (scaleNumber.value * 10 + 1) / 10;
      }
    };

    // 获取两点之间距离
    const getDistance = (start: IData, end: IData) => {
      return Math.hypot(end.pageX - start.pageX, end.pageY - start.pageY);
    };

    // 图片偏移样式
    const style = computed(() => {
      const imgStyle: IData = {
        maxWidth: `${props.cropareaWidth}px`,
        maxHeight: `${props.cropareaHeight}px`,
        objectFit: 'contain',
        transform: `translate(calc(${imgMovePosition.value.tx}px - 50%),calc(${imgMovePosition.value.ty}px - 50%)) scale(${scaleNumber.value})`,
      };
      return imgStyle;
    });

    // 取消
    const onCancel = () => {
      emit('change', '');
    };

    // 确认
    const onConfirm = async () => {
      let cropDataUrl = '';
      const croparea = document.getElementById(uuid);
      if (croparea && imgRef.value) {
        // 根据截取区域和图片的相对位置，计算截取位置的起始位置
        const { left: cropLeft, top: cropTop } =
          croparea.getBoundingClientRect();
        const { left: imgLeft, top: imgTop } =
          imgRef.value.getBoundingClientRect();

        const distanceX = imgLeft - cropLeft;
        const distanceY = imgTop - cropTop;

        const cropcanvas = await ibiz.util.html2canvas.getCanvas(imgRef.value, {
          x: -distanceX, // 指定截取区域的左上角 x 坐标
          y: -distanceY, // 指定截取区域的左上角 y 坐标
          width: props.cropareaWidth, // 指定截取区域的宽度
          height: props.cropareaHeight, // 指定截取区域的高度
        });
        cropDataUrl = cropcanvas.toDataURL('image/png');
      }
      // 确认，截取裁剪框的内容
      emit('change', cropDataUrl);
    };

    // 截取容器宽度
    const cropContainer = computed(() => {
      let tempWidth = 200;
      let tempHeight = 200;
      if (cropContainerRef.value) {
        const { width, height } =
          cropContainerRef.value.getBoundingClientRect();
        tempWidth = width / 2;
        tempHeight = height / 2;
      }
      return {
        width: tempWidth,
        height: tempHeight,
      };
    });

    // 触摸屏幕
    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const touches = event.touches;
      if (touches.length === 2) {
        // 缩放
        lastDistance = getDistance(touches[0], touches[1]);
      } else if (touches.length === 1) {
        const touch = event.touches[0];
        const x = touch.pageX;
        const y = touch.pageY;
        imgMovePosition.value.x = x;
        imgMovePosition.value.y = y;
        allowMove.value = true;
      }
    };

    // 开始移动/缩放
    const onTouchMove = (event: TouchEvent) => {
      if (!allowMove.value || !imgRef.value) {
        return;
      }
      const touches = event.touches;
      if (touches.length === 2) {
        // 缩放
        const space = getDistance(touches[0], touches[1]);
        if (space > lastDistance + 10) {
          // 放大
          lastDistance = space;
          onAdd();
        } else if (space < lastDistance - 10) {
          // 缩小
          lastDistance = space;
          onReduce();
        }
        return;
      }
      // 移动
      const touch = event.touches[0];

      const x = touch.pageX;
      const y = touch.pageY;

      const spaceX = x - imgMovePosition.value.x + imgMovePosition.value.tx;
      const spaceY = y - imgMovePosition.value.y + imgMovePosition.value.ty;
      const { width, height } = cropContainer.value;

      if (
        spaceX <= spaceWidth.value + width * (scaleNumber.value - 1) &&
        spaceX >= -spaceWidth.value - width * (scaleNumber.value - 1)
      ) {
        imgMovePosition.value.tx = spaceX;
      }
      if (
        spaceY >= -spaceHeight.value - height * (scaleNumber.value - 1) &&
        spaceY <= spaceHeight.value + height * (scaleNumber.value - 1)
      ) {
        imgMovePosition.value.ty = spaceY;
      }

      imgMovePosition.value.x = x;
      imgMovePosition.value.y = y;
    };
    // 移动结束
    const onTouchEnd = (_event: TouchEvent) => {
      allowMove.value = false;
      // 结束之后要归位
      const spaceX = imgMovePosition.value.tx;
      const spaceY = imgMovePosition.value.ty;

      if (
        spaceX >=
        spaceWidth.value + (props.cropareaWidth / 2) * (scaleNumber.value - 1)
      ) {
        imgMovePosition.value.tx =
          spaceWidth.value +
          (props.cropareaWidth / 2) * (scaleNumber.value - 1);
      }
      if (
        spaceX <=
        -spaceWidth.value - (props.cropareaWidth / 2) * (scaleNumber.value - 1)
      ) {
        imgMovePosition.value.tx =
          -spaceWidth.value -
          (props.cropareaWidth / 2) * (scaleNumber.value - 1);
      }
      if (
        spaceY <=
        -spaceHeight.value -
          (props.cropareaHeight / 2) * (scaleNumber.value - 1)
      ) {
        imgMovePosition.value.ty =
          -spaceHeight.value -
          (props.cropareaHeight / 2) * (scaleNumber.value - 1);
      }
      if (
        spaceY >=
        spaceHeight.value + (props.cropareaHeight / 2) * (scaleNumber.value - 1)
      ) {
        imgMovePosition.value.ty =
          spaceHeight.value +
          (props.cropareaHeight / 2) * (scaleNumber.value - 1);
      }
    };

    return {
      ns,
      cropImgUrl,
      scaleNumber,
      style,
      uuid,
      imgRef,
      cropContainerRef,
      onReduce,
      onAdd,
      onCancel,
      onConfirm,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      imgMovePosition,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('content')}>
          <div class={this.ns.em('content', 'crop')} ref='cropContainerRef'>
            <div
              id={this.uuid}
              class={this.ns.em('content', 'croparea')}
              style={{
                height: `${this.cropareaHeight}px`,
                width: `${this.cropareaWidth}px`,
              }}
              onTouchstart={this.onTouchStart}
              onTouchmove={this.onTouchMove}
              onTouchend={this.onTouchEnd}
            ></div>
            <img
              style={this.style}
              ref='imgRef'
              class={this.ns.em('content', 'img')}
              src={this.cropImgUrl}
              alt=''
            />
          </div>
        </div>
        <div class={this.ns.e('footer')}>
          <div class={this.ns.em('footer', 'cancel')} onClick={this.onCancel}>
            {ibiz.i18n.t('editor.common.cancel')}
          </div>
          <div class={this.ns.em('footer', 'confirm')} onClick={this.onConfirm}>
            {ibiz.i18n.t('editor.common.confirm')}
          </div>
        </div>
      </div>
    );
  },
});
