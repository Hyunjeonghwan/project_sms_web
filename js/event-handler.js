import { Student } from "./student.js";
import { studentRepository } from "./app.js";
import { Validator } from "./validator.js";

// 이벤트 처리를 객체화
class EventHandler {
  constructor() { }

  // 이벤트 소스에 이벤트핸들러 등록
  eventRegist() {
    document.querySelector('#addBtn').addEventListener('click', event => {
      this.addStudent(event);
      this.findAllStudent(event);
    });

    document.querySelector('#delBtn').addEventListener('click', event => {
      this.removeBySsn(event);
      this.findAllStudent(event);
    })

    document.querySelector('#searchBtn').addEventListener('click', event => {
      this.findBySsn(event);
    });

    document.querySelector('#sortSelect').addEventListener('change', event => {
      this.sort(event);
    });

    this.findAllStudent(event);

  }

  // 학생 등록
  addStudent(event) {
    const ssn = document.inputForm.ssn.value;
    const name = document.inputForm.name.value;
    const korean = document.inputForm.korean.value;
    const english = document.inputForm.english.value;
    const math = document.inputForm.math.value;

    if (!Validator.hasText(ssn)) {
      alert('학번을 입력하세요.');
      return;
    }else if(!Validator.hasText(name)){
      alert('이름을 입력하세요.');
      return;
    }else if(!Validator.hasNum(korean)){
      alert('0 이상 100 이하의 점수를 입력하세요.');
      return;
    }else if(!Validator.hasNum(english)){
      alert('0 이상 100 이하의 점수를 입력하세요.');
      return;
    }else if(!Validator.hasNum(math)){
      alert('0 이상 100 이하의 점수를 입력하세요.');
      return;
    }


    const existingStudent = studentRepository.findBySsn(ssn);
    if(existingStudent){
      alert('이미 등록된 학번입니다.');
      return;
    }

    const student = new Student(ssn, name, korean, english, math);

    studentRepository.addStudent(student);
    // WebStorage에 저장
    this.saveStudents();

    alert('등록 완료');

    const allList = studentRepository.getStudents();
    console.dir(allList);

    document.inputForm.reset();
  }

  saveStudents(){
    localStorage.list = JSON.stringify(this.findAllStudent());
  }

   // 학번이름삭제
   removeBySsn(event) {
    const ssn = document.inputForm.ssn.value;
    const name = document.inputForm.name.value;
  
    if (!Validator.hasText(ssn) && !Validator.hasText(name)) {
      alert('학번 또는 이름을 입력하세요.');
      return;
    }
  
    let deletedStudents = [];
  
    if (Validator.hasText(ssn)) {
      const deletedStudent = studentRepository.removeBySsn(ssn);
      if (deletedStudent) {
        deletedStudents.push(deletedStudent);
      }
    }
  
    if (Validator.hasText(name)) {
      const studentsToRemove = studentRepository.findByName(name);
      studentsToRemove.forEach(student => {
        const deletedStudent = studentRepository.removeBySsn(student.ssn);
        if (deletedStudent) {
          deletedStudents.push(deletedStudent);
        }
      });
    }
  
    if (deletedStudents.length > 0) {
      alert('삭제 완료');
    } else {
      alert('존재하지 않는 학번 또는 이름입니다.');
    }
  
    const allList = studentRepository.getStudents();
    console.dir(allList);

    document.inputForm.reset();
  }





  // 학번과 이름으로 검색
  findBySsn(event) {

    const selectElement = document.querySelector('#select');
    const searchInput = document.inputForm2.search.value;
    const searchOption = selectElement.value;

    let findStudent;
    if (searchOption === 'ssn') {
      findStudent = studentRepository.findBySsn(searchInput);

      if(!findStudent){
        alert('존재하지 않는 학번입니다.');
        return;
      }

      const table = document.querySelector('#studentTable');
      table.innerHTML = '';
      const row = document.createElement('tr');
      row.innerHTML = `<td>${findStudent.ssn}</td>
      <td>${findStudent.name}</td>
      <td>${findStudent.korean}</td>
      <td>${findStudent.english}</td>
      <td>${findStudent.math}</td>
      <td>${findStudent.getSum()}</td>
      <td>${findStudent.getAverage()}</td>
      <td>${this.getRank(studentRepository.getStudents(), findStudent)}</td>`;
      table.appendChild(row);

    } else if (searchOption === 'name') {
      findStudent = studentRepository.findByName(searchInput);

      if(!findStudent){
        alert('존재하지 않는 이름입니다.');
        return;
      }

      this.displaySearchResults(findStudent);
    }
    document.inputForm2.reset();

  }

  // 기본(학번 오름차순), 성적순(내림차순), 이름순(오름차순) 정렬
  sort(event) {
    const selectElement = document.querySelector('#sortSelect');
    const searchOption = selectElement.value;
  
    let sortedList;
    if (searchOption === 'ssn') {
      sortedList = studentRepository.getStudents().sort((a, b) => b.getSum() - a.getSum());
    } else if (searchOption === 'name') {
      sortedList = studentRepository.getStudents().sort((a, b) => a.name.localeCompare(b.name));
    } else{
      sortedList = studentRepository.getStudents().sort((a, b) => a.ssn - b.ssn);
    }
  
    this.displaySearchResults(sortedList);
  }
  
  // 테이블에 출력
  displaySearchResults(results) {
    const table = document.querySelector('#studentTable');

    // 기존 테이블 내용 초기화
    table.innerHTML = '';

    // 검색 결과 학생 정보 행 추가
    results.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${student.ssn}</td>
      <td>${student.name}</td>
      <td>${student.korean}</td>
      <td>${student.english}</td>
      <td>${student.math}</td>
      <td>${student.getSum()}</td>
      <td>${student.getAverage()}</td>
      <td>${this.getRank(results, student)}</td>`;
      table.appendChild(row);
    });
  }

  // 전체 학생 목록
  findAllStudent(event) {
    // 학생 목록을 가져와서 테이블에 표시합니다.
    const allList = studentRepository.getStudents();
    this.displaySearchResults(allList);
    return allList;
  }

  // RANK 출력
  getRank(students, currentStudent) {
    const sortedStudents = students.slice().sort((a, b) => b.getSum() - a.getSum());
    const rank = sortedStudents.findIndex((student) => student === currentStudent) + 1;
    return rank;
  }

}

export { EventHandler };