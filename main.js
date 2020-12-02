/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

const readlineSync = require('readline-sync');
const fs = require('fs');
let contacts = [];

function main() {
  loadData();
  showMenu();
}
main();

function showMenu() {
  console.log('==============          MENU          =============');
  console.log('============== 1.Nhap du lieu contact =============');
  console.log('============== 2.Sua du lieu contact  =============');
  console.log('============== 3.Xoa contact          =============');
  console.log('============== 4.Tim kiem contact     =============');

  let option = readlineSync.question('Nhap lua chon: ');
  console.log("------ ");

  switch (option) {
    case '1':
      inputContact();
      showMenu();
      save();
      break;
    case '2':
      showContact();
      updateContact(contacts);
      showMenu();
      save();
      break;
    case '3':
      showContact();
      deleteContact(contacts);
      showMenu();
      save();
      break;
    case '4':
      showContact();
      console.log(searchContact(contacts));
      showMenu();
      break;
    default:
      console.log('Wrong option');
      break;
  }
}

function loadData() {
  let fileContent = fs.readFileSync('./data.json');
  contacts = JSON.parse(fileContent);
}

function inputContact() {
  let name = readlineSync.question('Nhap Name: ');
  let phoneNum = readlineSync.question('nhap Phone Number: ');
  let contact = {
    name: name,
    phoneNum: phoneNum
  };
  contacts.push(contact);
  console.log('---------------');
}

function updateContact(arr) {
  let place = readlineSync.question('Vi tri muon sua: ');
  for (let i = 0; i < arr.length; i++) {
    if (i === (place - 1)) {
      let newName = readlineSync.question('Thay doi ten thanh: ');
      arr[i].name = newName;
      let newNumber = readlineSync.question('Thay doi so thanh: ');
      arr[i].phoneNum = newNumber;
      return arr;
    }
  }
}

function deleteContact(arr) {
  let place = readlineSync.question('Vi tri muon xoa ');
  for (let i = 0; i < arr.length; i++) {
    if (i === (place - 1)) {
      let remove = arr.splice(i, 1);
      return remove;
    }
  }
}

function searchContact(arr) {
  let find = readlineSync.question("Nhap thong tin can tim:  ");
  let value = arr.filter(item => item.name.toLowerCase().indexOf(find.toLowerCase()) > -1);
  for (let i of value) {
    return i;
  }

}

function showContact() {
  console.log("Contact: ");
  for (let contact of contacts) {
    console.log(contacts.indexOf(contact) + 1, contact.name, contact.phoneNum);
  }
}

function save() {
  let save = JSON.stringify(contacts);
  fs.writeFileSync('./data.json', save, { encoding: 'utf8' });
}



