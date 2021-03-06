import * as React from 'react';
import { LuckyWheel } from 'lucky-canvas';
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
  top?: string | number; //距离顶部的高度 （格式为：20 | '20px' | '20%'，默认为 0）
  width?: string; //图片宽度 （关于图片宽高有四种可能）
  height?: string; //图片高度 （关于图片宽高有四种可能）
  rotate?: boolean; //是否跟随旋转 （默认为 false）
};

/**
 * blocks用来绘制矩形（宽度和高度不可配置）第一个矩形的宽高等于<luckyGrid />的宽高，
 * 但可以通过padding属性挤出边框的样式
 */
type Block = {
  background?: string; //背景颜色 （可填写16进制颜色哈希值或 rgba）
  padding?: string; //内边距 （与 css 中 padding 使用方式一样）
  imgs?: Img[]; //图片列表 (新增)
};

/**
 * 奖品列表是一个数组，item里面有两个必须的参数：x、y 来控制这个格子的显示坐标
 */
type Prize = {
  name?: string;
  id?: string | number;
  background?: string; //格子背景色 （可继承 defaultStyle 背景色，默认为 'rgba(0,0,0,0)'）
  fonts?: Font[]; //文字列表
  imgs?: Img[]; //图标
};

/**
 * 实际上奖品格子的属性与按钮格子的属性相差无几, 因为对于奖品和按钮来说, 他们都属于格子
 */
type Button = {
  radius?: string; //按钮半径
  pointer?: boolean; //是否显示指针 （默认为 false）
  background?: string; //格子背景色 （可继承 defaultStyle 背景色，默认为 '#fff'）
  fonts?: Font[];
  imgs?: Img[];
};

/**
 * defaultConfig是对抽奖插件进行整体的配置
 */
type DefaultConfig = {
  gutter?: string | number; // 扇形之间的缝隙 （默认等于 0）
  stopRange?: number; // 扇形区域的停止范围 （默认为 0.8, 建议范围 0 ~ 0.9, 如果设置 1 可能会停在奖品边缘!）
  offsetDegree?: number; // 转盘的偏移角度 （默认为 0 度）
  speed?: number; // 旋转速度峰值 （默认为 20，建议配置范围 10 ~ 30）
  speedFunction?: string; // 缓动函数 （当前版本固定为 quadratic 二次方加速，后期会提供更多可选函数）
  accelerationTime?: number; // 开始旋转时间 （单位为毫秒，默认等于 2500 毫秒）
  decelerationTime?: number; //缓慢停止时间 （单位为毫秒，默认等于 2500 毫秒）
};

/**
 * 如果你觉得写一堆重复的数据很烦的话，那你可以在这里进行统一的管理，
 * 其中包括奖品和抽奖按钮，在没有配置的情况下都会继承这里的属性
 */
type DefaultStyle = {
  fontColor?: string; // 字体颜色 （默认是 '#000' 黑色）
  fontSize?: string; // 字体大小(px) （默认是 '18px'）
  fontStyle?: string; // 字体样式 （默认是 'sans-serif'）
  fontWeight?: string; // 字体粗细 （默认为 '400'）
  lineHeight?: string; // 字体行高 （默认等于字体大小）
  textAlign?: string; //文字和图片的对其方式 （目前只能居中!）
  background?: string; //奖品区域背景颜色 （默认是 '#fff' 白色）
  wordWrap?: boolean; // 文字自动换行 （默认为 true 开启，关闭时可以使用 \n 换行）
  lengthLimit?: string | number; // 换行宽度限制 （格式为：90 | '90px' | '90%'，默认为 '90%'）
};

/**
 * Props
 */
export interface LuckyWheelProps {
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
   * @link https://100px.net/docs/wheel/blocks.html
   */
  blocks?: Block[];
  /**
   * 奖品 - prizes
   * @link https://100px.net/docs/wheel/prizes.html
   */
  prizes?: Prize[];
  /**
   * 抽奖按钮 - buttons
   * @link https://100px.net/docs/wheel/buttons.html
   */
  buttons?: Button[];
  /**
   * 默认配置 - defaultConfig
   * @link https://100px.net/docs/wheel/defaultConfig.html
   */
  defaultConfig?: DefaultConfig;
  /**
   * 默认样式 - defaultStyle
   * @link https://100px.net/docs/wheel/defaultStyle.html
   */
  defaultStyle?: DefaultStyle;
  /**
   * 回调 & 方法 start
   * @link https://100px.net/docs/wheel/methods.html
   */
  onStart?: () => void; //开始回调
  /**
   * 回调 & 方法 end
   * @link https://100px.net/docs/wheel/methods.html
   */
  onEnd?: (prize: Prize) => void; //结束回调
}

const ReactLuckyWheel = React.forwardRef<LuckyWheel, LuckyWheelProps>(
  (props, ref) => {
    const {
      width = 300,
      height = width,
      id: idProp,
      blocks,
      buttons,
      prizes = [],
      defaultStyle = {},
      defaultConfig = {},
      onStart,
      onEnd,
      ...rest
    } = props;

    const { current: id } = React.useRef(idProp || 'lucky_' + idxx());
    const [luckyCanvas, setLuckyCanvas] = React.useState<LuckyWheel>();

    React.useEffect(() => {
      setLuckyCanvas(
        new LuckyWheel(
          { el: `#${id}`, width: getPx(width), height: getPx(height) },
          {}
        )
      );
    }, [id]);

    React.useEffect(() => {
      const options = {
        blocks,
        buttons,
        defaultConfig,
        defaultStyle,
        onEnd,
        onStart,
        prizes,
      };

      if (luckyCanvas) {
        luckyCanvas.blocks = options.blocks;
        luckyCanvas.buttons = options.buttons;
        luckyCanvas.defaultConfig = options.defaultConfig;
        luckyCanvas.defaultStyle = options.defaultStyle;
        luckyCanvas.endCallback = options.onEnd;
        luckyCanvas.prizes = options.prizes;
        luckyCanvas.startCallback = options.onStart;
      }
    }, [
      luckyCanvas,
      blocks,
      buttons,
      defaultConfig,
      defaultStyle,
      id,
      onEnd,
      onStart,
      prizes,
    ]);

    React.useImperativeHandle(
      ref,
      () => {
        return luckyCanvas as LuckyWheel;
      },
      [luckyCanvas]
    );

    return <div {...rest} id={id}></div>;
  }
);

export default ReactLuckyWheel;
