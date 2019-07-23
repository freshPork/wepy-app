/**
 * @Author mileS.
 * @Date 2018/11/2.
 * @Description: 三角形密码.
 */

var lifeNumber = {};

/**
 * 生成生命密码
 * @param birthday
 * @return
 */
function generateLifeNumber(birthday) {
  countFirstLevel(birthday, lifeNumber);
  countSecondLevel();
  countThirdLevel();
  countFourthLevel();
  countLeft();
  countRight();
  countTop();
  getUnionCodeList();
  return lifeNumber;
}
/**
 * 计算第一层：年月日
 * @param birthday
 * @param lifeNumber
 * @return
 */
function countFirstLevel(birthday) {
  lifeNumber.e = parseInt(birthday.substring(0, 1));
  lifeNumber.f = parseInt(birthday.substring(1, 2));
  lifeNumber.g = parseInt(birthday.substring(2, 3));
  lifeNumber.h = parseInt(birthday.substring(3, 4));
  lifeNumber.c = parseInt(birthday.substring(4, 5));
  lifeNumber.d = parseInt(birthday.substring(5, 6));
  lifeNumber.a = parseInt(birthday.substring(6, 7));
  lifeNumber.b = parseInt(birthday.substring(7, 8));
};

/**
 * 计算第二层
 * @param lifeNumber
 * @return
 */
function countSecondLevel() {
  lifeNumber.k = plusNum(lifeNumber.e, lifeNumber.f);
  lifeNumber.l = plusNum(lifeNumber.g, lifeNumber.h);
  if (lifeNumber.l == 0) {
    //如果左星位数字为0，则置为5
    lifeNumber.l = 5;
  }
  lifeNumber.i = plusNum(lifeNumber.a, lifeNumber.b);
  lifeNumber.j = plusNum(lifeNumber.c, lifeNumber.d);
}

/**
 * 计算第三层
 * @param lifeNumber
 * @return
 */
function countThirdLevel() {
  lifeNumber.m = plusNum(lifeNumber.i, lifeNumber.j);
  lifeNumber.n = plusNum(lifeNumber.k, lifeNumber.l);
}

/**
 * 计算第四层
 * @param lifeNumber
 * @return
 */
function countFourthLevel() {
  lifeNumber.o = plusNum(lifeNumber.m, lifeNumber.n);
}

/**
 * 计算三角形左侧
 * @param lifeNumber
 * @return
 */
function countLeft() {
  lifeNumber.x = plusNum(lifeNumber.i, lifeNumber.m);
  lifeNumber.w = plusNum(lifeNumber.j, lifeNumber.m);
  lifeNumber.s = plusNum(lifeNumber.x, lifeNumber.w);
}

/**
 * 计算三角形右侧
 * @param lifeNumber
 * @return
 */
function countRight() {
  lifeNumber.v = plusNum(lifeNumber.k, lifeNumber.n);
  lifeNumber.u = plusNum(lifeNumber.l, lifeNumber.n);
  lifeNumber.t = plusNum(lifeNumber.v, lifeNumber.u)
}

/**
 * 计算三角形上方
 * @param lifeNumber
 * @return
 */
function countTop() {
  lifeNumber.p = plusNum(lifeNumber.m, lifeNumber.o);
  lifeNumber.q = plusNum(lifeNumber.n, lifeNumber.o);
  lifeNumber.r = plusNum(lifeNumber.q, lifeNumber.p);
}

/**
 * 获取全部联合码
 * @param lifeNumber
 * @return
*/
function getUnionCodeList() {
  var union =
    {
      "ijm": transfromUnicode(lifeNumber.i, lifeNumber.j, lifeNumber.m),
      "kln": transfromUnicode(lifeNumber.k, lifeNumber.l, lifeNumber.n),
      "mno": transfromUnicode(lifeNumber.m, lifeNumber.n, lifeNumber.o),
      "imx": transfromUnicode(lifeNumber.i, lifeNumber.m, lifeNumber.x),
      "jmw": transfromUnicode(lifeNumber.j, lifeNumber.m, lifeNumber.w),
      "xws": transfromUnicode(lifeNumber.x, lifeNumber.w, lifeNumber.s),
      "knv": transfromUnicode(lifeNumber.k, lifeNumber.n, lifeNumber.v),
      "lnu": transfromUnicode(lifeNumber.l, lifeNumber.n, lifeNumber.u),
      "vut": transfromUnicode(lifeNumber.v, lifeNumber.u, lifeNumber.t),
      "mop": transfromUnicode(lifeNumber.m, lifeNumber.o, lifeNumber.p),
      "noq": transfromUnicode(lifeNumber.n, lifeNumber.o, lifeNumber.q),
      "qpr": transfromUnicode(lifeNumber.q, lifeNumber.p, lifeNumber.r)
    };
  Object.assign(lifeNumber, union);
  lifeNumber.union = union;
}

/**
 * 组合联合码
 * @param lifeNumber
 * @return
 */
function transfromUnicode(x, y, z) {
  return x.toString() + y.toString() + z.toString();
}


/**
 * 密码累加计算
 * @param numOne
 * @param numTwo
 * @return
 */
function plusNum(numOne, numTwo) {
  var plus = numOne + numTwo;
  //plus不会大于19
  if (plus > 9) {
    return plusNum(Math.floor(plus / 10), plus % 10);
  }
  else {
    return plus == 0 ? 5 : plus;
  }
}

export default generateLifeNumber;
