import { IImageViewer } from "../type";
/**
 * 节流
 */
import { useThrottleFn } from "@vueuse/core";
/**
 * 获取单例
 */
// import getSingle from "@/utils/single/getSingle";
/**
 * 动画间隔
 */
const ANIMATION_INTERVAL = 100;
/**
 * 转换为动画帧
 */
const ANIMATION_FRAMES_NUMBER = 60 * (ANIMATION_INTERVAL / 1000);

interface Status {
  onAnimation: Boolean;
  isStarted: Boolean;
}

export class MainAnimation {
  status: Status;
  taskQueue: any[];

  public constructor(public imageViewer?: IImageViewer) {
    this.init(imageViewer);
    // console.log(this.status)

    // this.status.onAnimation = true
    // this.status.onAnimation = true
    // setTimeout(() => {
    //   this.taskQueue.push(2);
    // }, 2000);

    // this.taskQueue.push(1);
    // console.log(this.taskQueue)
  }

  private init(imageViewer: IImageViewer) {
    this.imageViewer = imageViewer;
    this.status = new Proxy(
      { onAnimation: false, isStarted: false },
      {
        set: (
          target: Status,
          p: string | symbol,
          value: any,
          receiver: any
        ) => {
          // console.log(target,p,value,receiver)
          Reflect.set(target, p, value, receiver);
          if (p === "onAnimation" && value === false) {
            // console.log(target)
            // console.log(`animation is changed to ${value}`)
            // console.log(this.taskQueue)
            this.run();
          }
          return true;
        },
      }
    );
    this.taskQueue = new Proxy([], {
      set: (target: any[], p: string | symbol, value: any, receiver: any) => {
        if (p === "length") {
          //   console.log(target, p, value, receiver)
          //   console.log(value);
          const change = value - target.length;
          //   console.log(change)
          if (change === -1) {
            /**
             * shift或push进去第一个
             */
            this.status.onAnimation = false;
          } else if (change === 0 && value === 1) {
              console.log(123)
            if (!this.status.onAnimation) {
              this.status.onAnimation = false;
            }
          }
          //   else {
          //       /**
          //        * 非初始push
          //        */
          //     this.status.onAnimation = true;
          //   }
        }
        return Reflect.set(target, p, value, receiver);
      },
    });
  }

  private run() {
    /**
     * 1、判断是否有动画进行
     */
    if (this.status.onAnimation || this.taskQueue.length === 0) return;
    /**
     *
     */
    console.log("执行下一个动画");
    this.status.onAnimation = true;

    const startAnimation = () => {
      let i = 0;
      const animation = () => {
        i++;
        if (i > ANIMATION_FRAMES_NUMBER) {
          //   this.status.onAnimation = false;
          //   console.log(123)

          this.taskQueue.shift();
          console.log(this.taskQueue)
        } else {
          //   console.log(i)
          const runFrame = () => {
            // console.log(123);
          };

          runFrame();
          window.requestAnimationFrame(animation);
        }
      };
      window.requestAnimationFrame(animation);
    };
    startAnimation();
  }

  // private
}

export const setAnimation = () => {
  let single;
  //   console.log(12334)

  return useThrottleFn((e) => {
    const mainAnimation: MainAnimation =
      single || (single = new MainAnimation());
    mainAnimation.taskQueue.push(1);
    //   mainAnimation.taskQueue.push(3)
    //   console.log(mainAnimation.taskQueue)
    //   mainAnimation.taskQueue.shift()
    //   console.log(mainAnimation.taskQueue)
    // console.log(123)
  }, ANIMATION_INTERVAL);
};

export default setAnimation;
