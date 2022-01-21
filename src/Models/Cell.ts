import { ICell } from "./ICell";

export class Cell implements ICell {
  private readonly id: number;
  private readonly value: string;
  private readonly centerComment: string;
  private readonly cornerComments: string[];
  private color: string;

  constructor(value: string, centerComment: string, cornerComments: string[], color?: string, id?: number) {
    this.id = id ?? Math.random();
    this.value = this.parseString(value);
    this.centerComment = this.parseCenterComment(this.parseString(centerComment));
    this.cornerComments = this.parseCornerComments(this.parseStringArray(cornerComments));
    this.color = color ?? "bg-gray-50";
  }

  public getId(): number {
    return this.id;
  }

  public getValue(): string {
    return this.value;
  }

  public getCenterComment(): string {
    return this.centerComment;
  }

  public getCornerComments(): string[] {
    return this.cornerComments;
  }

  public getColor(): string {
    return this.color.toString();
  }

  public setColor(color:string) {
    this.color = color;
  }

  private parseCornerComments(cornerComments: string[]): string[] {
    let usedComments = new Set<string>();
    let newComments: string[] = [];
    cornerComments.forEach(function (comment) {
      let value = usedComments.has(comment) ? "" : comment;
      newComments.push(value);
      usedComments.add(comment);
    });
    return newComments;
  }

  private parseCenterComment(centerComment: string): string {
    return centerComment
      .split("")
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join("");
  }

  private parseString(str: string): string {
    if (typeof(str) === "string") {
      str = str.replace('0', '');
      str = str.replace(/\D/g, '');
    }
    return str;
  }

  private parseStringArray(cornerComments: string[]): string[] {
    let newComments: string[] = [];
    cornerComments.forEach((comment) => {
      newComments.push(this.parseString(comment));
    })
    return newComments;
  }
}
