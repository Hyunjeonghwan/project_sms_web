import { Student } from "./student.js";
import { StudentRepository } from "./student-repository.js";
import { EventHandler } from "./event-handler.js";

let studentRepository = new StudentRepository();

// 테스트를 위한 더미데이터
studentRepository.addStudent(new Student('10','현정환',70,30,90));
studentRepository.addStudent(new Student('11','김정환',10,95,100));
studentRepository.addStudent(new Student('12','박정환',60,20,70));
studentRepository.addStudent(new Student('13','신정환',15,30,50));
studentRepository.addStudent(new Student('14','나정환',10,60,10));


let eventHandler = new EventHandler();
eventHandler.eventRegist();

export {studentRepository};