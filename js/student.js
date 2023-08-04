// 학생정보 틀
class Student {

  constructor(ssn, name, korean, english, math) {
    this.ssn = ssn;
    this.name = name;
    this.korean = parseInt(korean);
    this.english = parseInt(english);
    this.math = parseInt(math);
  }

  static schoolName = 'EZEN 초등학교';

  // 생성자 함수(객체)의 메소드를 Student의 프로토타입 객체에 할당
  getSum() {
    return this.korean + this.english + this.math;
  }

  getAverage() {
    return (this.getSum() / 3).toFixed(2);
  }

  // Object 프로토타입객체의 toString() 오버라이딩
  toString() {
    return `${this.ssn} ${this.name} ${this.korean} ${this.english} ${this.math} ${this.getSum()} ${this.getAverage()}`;
  }
}

export {Student};