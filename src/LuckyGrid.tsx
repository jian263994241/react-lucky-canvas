import * as React from 'react';
import { LuckyGrid } from 'lucky-canvas';
import { getPx, idxx } from './utils';

type Font = {
  text: string; // 字体内容 （可以使用 \n 用来换行）
  top?: string | number; // 距离顶部的高度 （格式为：20 | '20px' | '20%'，默认为 0）
  fontColor?: string; //字体颜色
  fontSize?: string; //字体大小(px) （可继承 defaultStyle 字体样式，默认为 '18px'）
  fontStyle?: string; //字体样式 （可继承 defaultStyle 字体样式，默认为 'sans-serif'）
  fontWeight?: string; //字体粗细 （可继承 defaultStyle 字体粗细，默认为 '400'）
  lineHeight?: string; //字体行高 （默认使用字体样式中的字体大小）
  wordWrap?: boolean; //文字自动换行 （默认为 true 开启，关闭时可以使用 \n 换行）
  lengthLimit?: string | number;
};

type Img = {
  src: string; //图片路径
  activeSrc?: string; //图片路径 （当中奖标记处于当前格子时, 将替换显示图片）
  top?: string | number; //距离顶部的高度 （格式为：20 | '20px' | '20%'，默认为 0）
  width?: string; //图片宽度 （关于图片宽高有四种可能）
  height?: string; //图片高度 （关于图片宽高有四种可能）
};

/**
 * blocks用来绘制矩形（宽度和高度不可配置）第一个矩形的宽高等于<luckyGrid />的宽高，
 * 但可以通过padding属性挤出边框的样式
 */
type Block = {
  borderRadius?: string | number; //圆角半径 默认为 0, 配置范围为 0 ~ Infinity）
  background?: string; //背景颜色 （可填写16进制颜色哈希值或 rgba）
  padding?: string; //内边距 （与 css 中 padding 使用方式一样）
  paddingTop?: string | number; //上边距 （优先级大于 padding）
  paddingBottom?: string | number; //下边距 （优先级大于 padding）
  paddingLeft?: string | number; //左边距 （优先级大于 padding）
  paddingRight?: string | number; //右边距 （优先级大于 padding）
};

/**
 * 奖品列表是一个数组，item里面有两个必须的参数：x、y 来控制这个格子的显示坐标
 */
type Prize = {
  x: number; // 相对坐标x （如果是标准的 3*3 宫格，那 x 的范围是 0 ~ 2）
  y: number; // 相对坐标y （如果是标准的 3*3 宫格，那 y 的范围是 0 ~ 2）
  name?: string;
  id?: string | number;
  col?: number; // 横向合并格子 （用来横向合并单元格，默认为 1）
  row?: number; //纵向合并格子 （用来纵向合并单元格，默认为 1）
  borderRadius?: number; //格子圆角 （可继承 defaultStyle 圆角，默认为 20）
  shadow?: string; //格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
  background?: string; //格子背景色 （可继承 defaultStyle 背景色，默认为 'rgba(0,0,0,0)'）
  fonts?: Font[]; //文字列表
  imgs?: Img[]; //图片列表 (新增)
};

/**
 * 实际上奖品格子的属性与按钮格子的属性相差无几, 因为对于奖品和按钮来说, 他们都属于格子
 */
type Button = {
  x: number; // 相对坐标x （如果是标准的 3*3 宫格，那 x 的范围是 0 ~ 2）
  y: number; //相对坐标y （如果是标准的 3*3 宫格，那 y 的范围是 0 ~ 2）
  col?: number; //横向合并格子 （用来横向合并单元格，默认为 1）
  row?: number; //纵向合并格子 （用来纵向合并单元格，默认为 1）
  borderRadius?: number; //格子圆角 （可继承 defaultStyle 圆角，默认为 20）
  shadow?: string; //格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
  background?: string; //格子背景色 （可继承 defaultStyle 背景色，默认为 '#fff'）
  fonts?: Font[];
  imgs?: Img[];
};

/**
 * defaultConfig是对抽奖插件进行整体的配置
 */
type DefaultConfig = {
  gutter?: number; //格子之间的间距 （默认等于 5）
  speed?: number; //旋转速度峰值 （默认为 20，建议配置范围 10 ~ 30）
  accelerationTime?: number; //开始旋转时间 （单位为毫秒，默认等于 2500 毫秒）
  decelerationTime?: number; //缓慢停止时间 （单位为毫秒，默认等于 2500 毫秒）
};

/**
 * 如果你觉得写一堆重复的数据很烦的话，那你可以在这里进行统一的管理，
 * 其中包括奖品和抽奖按钮，在没有配置的情况下都会继承这里的属性
 */
type DefaultStyle = {
  borderRadius?: string | number; //格子圆角 （默认等于 20）
  fontColor?: string; //字体颜色
  fontSize?: string; //字体大小(px) （默认为 '18px'）
  fontStyle?: string; //字体样式 （默认为 'sans-serif'）
  fontWeight?: string; //字体粗细 （默认为 '400'）
  textAlign?: string; //文字和图片的对其方式 （目前只能居中!）
  background?: string; //格子的背景颜色 （默认是 '#fff' 白色）
  shadow?: string; //格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
  wordWrap?: boolean; //文字自动换行 （默认为 true 开启，关闭时可以使用 \n 换行）
  lengthLimit?: string | number; //换行宽度限制 （格式为：90 | '90px' | '90%'，默认为 '90%'）
};

/**
 * 中奖标记样式
 */
type ActiveStyle = {
  fontColor?: string; //字体颜色
  fontSize?: string; //字体大小(px)
  fontStyle?: string; //字体样式
  fontWeight?: string; //字体粗细
  background?: string; //格子的背景颜色 （默认是 '#ffce98' 橘黄色）
  shadow?: string; //格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
};

export interface LuckyGridProps {
  /**
   * root div style
   */
  style?: React.CSSProperties;
  /**
   * root div classname
   */
  className?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 宽度
   */
  width: number | string;
  /**
   * 可选高度, 如果不设置,取值width
   */
  height?: number | string;
  /**
   * 背景 - blocks
   * @link https://100px.net/docs/grid/blocks.html
   */
  blocks?: Block[];
  /**
   * 奖品 - prizes
   * @link https://100px.net/docs/grid/prizes.html
   */
  prizes?: Prize[];
  /**
   * 抽奖按钮 - buttons
   * @link https://100px.net/docs/grid/buttons.html
   */
  buttons?: Button[];
  /**
   * 默认配置 - defaultConfig
   * @link https://100px.net/docs/grid/defaultConfig.html
   */
  defaultConfig?: DefaultConfig;
  /**
   * 默认样式 - defaultStyle
   * @link https://100px.net/docs/grid/defaultStyle.html
   */
  defaultStyle?: DefaultStyle;
  /**
   * 中奖标记样式 - activeStyle
   * @link https://100px.net/docs/grid/activeStyle.html
   */
  activeStyle?: ActiveStyle;
  /**
   * 格子布局 - rows & cols
   * 设置布局有几行 （默认为 3）
   */
  rows?: number;
  /**
   * 格子布局 - rows & cols
   * 设置布局有几列 （默认为 3）
   */
  cols?: number;
  /**
   * 回调 & 方法 start
   * @link https://100px.net/docs/grid/methods.html
   */
  onStart?: () => void; //开始回调
  /**
   * 回调 & 方法 end
   * @link https://100px.net/docs/grid/methods.html
   */
  onEnd?: (prize: Prize) => void; //结束回调
}

const ReactLuckyGrid = React.forwardRef<LuckyGrid, LuckyGridProps>(
  (props, ref) => {
    const {
      width = 300,
      height = width,
      id: idProp,
      activeStyle = {},
      blocks = [],
      buttons = [],
      rows = 3,
      cols = 3,
      prizes = [],
      defaultStyle = {},
      defaultConfig = {},
      onStart,
      onEnd,
      ...rest
    } = props;

    const { current: id } = React.useRef(idProp || 'lucky_' + idxx());
    const [luckyCanvas, setLuckyCanvas] = React.useState<LuckyGrid>();

    React.useEffect(() => {
      if (id && !luckyCanvas) {
        setLuckyCanvas(
          new LuckyGrid(
            { el: `#${id}`, width: getPx(width), height: getPx(height) },
            {}
          )
        );
      }
    }, [id]);

    React.useEffect(() => {
      const options = {
        activeStyle,
        blocks,
        buttons,
        cols,
        defaultConfig,
        defaultStyle,
        onEnd,
        onStart,
        prizes,
        rows,
      };

      if (luckyCanvas) {
        luckyCanvas.activeStyle = options.activeStyle;
        luckyCanvas.blocks = options.blocks;
        luckyCanvas.buttons = options.buttons;
        luckyCanvas.cols = options.cols;
        luckyCanvas.defaultConfig = options.defaultConfig;
        luckyCanvas.defaultStyle = options.defaultStyle;
        luckyCanvas.endCallback = options.onEnd;
        luckyCanvas.prizes = options.prizes;
        luckyCanvas.rows = options.rows;
        luckyCanvas.startCallback = options.onStart;
      }
    }, [
      luckyCanvas,
      activeStyle,
      blocks,
      buttons,
      cols,
      defaultConfig,
      defaultStyle,
      onEnd,
      onStart,
      prizes,
      rows,
    ]);

    React.useImperativeHandle(
      ref,
      () => {
        return luckyCanvas as LuckyGrid;
      },
      [luckyCanvas]
    );

    return <div {...rest} id={id}></div>;
  }
);

export default ReactLuckyGrid;
