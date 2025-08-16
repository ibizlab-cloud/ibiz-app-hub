import { Ref, defineComponent, ref, watch, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './carousel.scss';

export const IBizCarouselComponent = defineComponent({
  name: 'IBizCarouselComponent',
  props: {
    carouselData: {
      type: Array<
        {
          id?: string;
          name?: string;
          imgUrl?: string;
          linkPath?: string;
          cssClass?: string;
        }[]
      >,
      required: true,
    },
    isAuto: {
      type: Boolean,
      default: true,
    },
    timeSpan: {
      type: Number,
      default: 3000,
    },
    showMode: {
      type: String as PropType<'DEFAULT' | 'CARD'>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('carousel-component');

    const swipeData: Ref<IData[]> = ref([]);

    // 值响应式变更
    watch(
      () => props.carouselData,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          swipeData.value = newVal;
        }
      },
      { immediate: true },
    );

    return {
      ns,
      swipeData,
    };
  },
  render() {
    const renderPic = (item: IData) => {
      if (item.cssClass) {
        if (item.cssClass.indexOf('fa-') !== -1) {
          return <i class={[item.cssClass]} />;
        }
        return <ion-icon name={item.cssClass}></ion-icon>;
      }
      if (item.imgUrl) {
        return <img src={item.imgUrl} alt={item.name} />;
      }
    };

    return (
      <div>
        {this.showMode === 'CARD' ? (
          <IBizCarousel-card
            swipeData={this.swipeData}
            isAuto={this.isAuto}
            timeSpan={this.timeSpan}
          ></IBizCarousel-card>
        ) : (
          <el-carousel
            class={this.ns.b()}
            autoplay={this.isAuto}
            interval={this.timeSpan}
          >
            {this.swipeData.map(item => {
              return (
                <el-carousel-item key={item.id}>
                  {item.linkPath ? (
                    <a href={item.linkPath}>{renderPic(item)}</a>
                  ) : (
                    renderPic(item)
                  )}
                </el-carousel-item>
              );
            })}
          </el-carousel>
        )}
      </div>
    );
  },
});
