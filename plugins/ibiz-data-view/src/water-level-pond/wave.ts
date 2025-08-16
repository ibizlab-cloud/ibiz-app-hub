export class Wave {
  public points: IData[] = [];

  public startX: number = 0;

  public canvasWidth: number = 0;

  public canvasHeight: number = 0;

  public waveWidth: number = 0;

  public waveHeight: number = 0;

  public xOffset: number = 0;

  public speed: number = 0;

  public color: string = '';

  constructor({
    canvasWidth, // 轴长
    canvasHeight, // 轴高
    waveWidth = 0.055, // 波浪宽度,数越小越宽
    waveHeight = 6, // 波浪高度,数越大越高
    xOffset = 0,
    speed = 4,
    color = '#DBB77A', // 波浪颜色
  }: IData = {}) {
    this.points = [];
    this.startX = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.waveWidth = waveWidth / 100;
    this.waveHeight = waveHeight;
    this.xOffset = xOffset;
    this.speed = speed;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const points = this.points;
    ctx.beginPath();
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      ctx.lineTo(point[0], point[1]);
    }
    ctx.lineTo(this.canvasWidth, this.canvasHeight);
    ctx.lineTo(this.startX, this.canvasHeight);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update({ nowRange }: IData = {}) {
    this.points = [];
    const {
      startX,
      waveHeight,
      waveWidth,
      canvasWidth,
      canvasHeight,
      xOffset,
    } = this;
    for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
      const y = Math.sin((startX + x) * waveWidth + xOffset);
      const dY = canvasHeight * (1 - nowRange / 100);
      this.points.push([x, dY + y * waveHeight]);
    }
    this.xOffset += this.speed / 100;
  }
}

export default Wave;
