// 유효성 검증
class Validator {

/**
 * 
 * @param {String} 문자열값 
 * @returns 
 */

  static hasText(value){
    if (value == undefined || value.length === 0) {
      return false;
    }
    return true;
  }

  static hasNum(value){
    if (value < 0 || value > 100) {
      return false;
    }
    return true;
  }

}

export {Validator};